import { Schema } from 'mongoose';
import type { ICronJobDocument } from '~/types/cronjobs';

/**
 * CronJob — a globally-scoped scheduled task that runs an instruction
 * (optionally through a saved Agent) on a `node-cron` expression and
 * optionally posts the result to a Discord webhook.
 *
 * Authored by an admin user (no per-user ACL — single Docker / global
 * scope per product decision). The `tenantId` column is kept on the
 * schema for forward compatibility with multi-tenant deployments but is
 * always set to a sentinel value by the model layer in phase 1.
 *
 * The `runs` subdocument array is capped at MAX_RUNS_HISTORY to keep
 * the document bounded — a full history of every execution is fine
 * for a single-Docker install, but unbounded growth would eventually
 * blow past MongoDB's 16MB document limit.
 */
const MAX_RUNS_HISTORY = 50;

/** Human-friendly display label shown in the panel. Kebab-case preferred but not enforced. */
const CRONJOB_NAME_MAX_LENGTH = 64;

/** Short, one-line summary shown next to the name in lists. */
const CRONJOB_DESCRIPTION_MAX_LENGTH = 512;

/** The instruction sent to the agent. Treated as the user message verbatim. */
const CRONJOB_PROMPT_MAX_LENGTH = 32_000;

/** Discord webhook URLs cap around 512 chars; allow a small buffer. */
const CRONJOB_WEBHOOK_URL_MAX_LENGTH = 1024;

const cronJobSchema: Schema<ICronJobDocument> = new Schema(
  {
    /**
     * Stable identifier shown in the panel. Unique per `(author, tenantId)`
     * so two admins can independently create cronjobs with the same name.
     */
    name: {
      type: String,
      required: true,
      maxlength: [
        CRONJOB_NAME_MAX_LENGTH,
        `Name cannot exceed ${CRONJOB_NAME_MAX_LENGTH} characters`,
      ],
      trim: true,
      index: true,
    },
    description: {
      type: String,
      default: '',
      maxlength: [
        CRONJOB_DESCRIPTION_MAX_LENGTH,
        `Description cannot exceed ${CRONJOB_DESCRIPTION_MAX_LENGTH} characters`,
      ],
    },
    /**
     * `node-cron` expression. 5-field standard cron (minute hour
     * dom month dow). Validated at write time via the `validateCron`
     * method — invalid expressions throw on `save()`.
     */
    schedule: {
      type: String,
      required: true,
    },
    /** Timezone applied to `schedule`. Defaults to `UTC`. */
    timezone: {
      type: String,
      default: 'UTC',
    },
    /** When false, the scheduler skips this job but keeps it registered. */
    enabled: {
      type: Boolean,
      default: true,
      index: true,
    },
    /**
     * Optional saved Agent to execute. When set, the executor loads the
     * full agent document (tools, skills, edges, model_parameters) and
     * runs the instruction through `createRun`. When null, falls back
     * to `provider` + `model` below for a bare-bones completion.
     */
    agent: {
      type: Schema.Types.ObjectId,
      ref: 'Agent',
      default: null,
      index: true,
    },
    /** Fallback provider (used only when `agent` is null). */
    provider: {
      type: String,
      default: null,
    },
    /** Fallback model (used only when `agent` is null). */
    model: {
      type: String,
      default: null,
    },
    /**
     * Instruction / user message sent to the agent or bare model. Treated
     * verbatim — no template rendering in phase 1.
     */
    prompt: {
      type: String,
      required: true,
      maxlength: [
        CRONJOB_PROMPT_MAX_LENGTH,
        `Prompt cannot exceed ${CRONJOB_PROMPT_MAX_LENGTH} characters`,
      ],
    },
    /**
     * MCP server names that must be available to the agent for this run.
     * Phase 1 forwards these verbatim to the agent executor; future
     * phases may resolve to full tool definitions here.
     */
    tools: {
      type: [String],
      default: [],
    },
    /**
     * Optional feedback channels. Phase 1 supports Discord webhooks only;
     * Telegram lands in phase 2.
     *
     * `discordWebhookUrl` — POST destination. The executor wraps the
     * output in a simple `{ content: "..." }` payload (under Discord's
     * 2000-char limit; longer outputs are truncated with a `[truncated]`
     * marker).
     */
    feedback: {
      discordWebhookUrl: {
        type: String,
        default: null,
        maxlength: [
          CRONJOB_WEBHOOK_URL_MAX_LENGTH,
          `Webhook URL cannot exceed ${CRONJOB_WEBHOOK_URL_MAX_LENGTH} characters`,
        ],
      },
    },
    /**
     * Last execution metadata. Updated by the executor after each run
     * (success or failure). The full transcript is NOT stored here —
     * `runs[*]` holds per-run outputs.
     */
    lastRunAt: {
      type: Date,
      default: null,
    },
    lastRunStatus: {
      type: String,
      enum: ['success', 'error', null],
      default: null,
    },
    /** ISO timestamp of the next scheduled fire time, recomputed by the scheduler. */
    nextRunAt: {
      type: Date,
      default: null,
      index: true,
    },
    /** Bounded run history. Trimmed to MAX_RUNS_HISTORY in `recordRunResult`. */
    runs: {
      type: [
        {
          /** ISO timestamp when the run started. */
          startedAt: { type: Date, required: true },
          /** ISO timestamp when the run completed (success or error). */
          finishedAt: { type: Date, default: null },
          /** Final state. `running` is set transiently and cleared on completion. */
          status: {
            type: String,
            enum: ['running', 'success', 'error'],
            required: true,
          },
          /** Output text (truncated to 8KB to keep the doc bounded). */
          output: { type: String, default: '' },
          /** Error message when `status === 'error'`. */
          error: { type: String, default: null },
          /** Provider used for this run (may differ from `provider` after pool resolution). */
          provider: { type: String, default: null },
          /** Model used for this run. */
          model: { type: String, default: null },
          /** Wall-clock duration in milliseconds. */
          durationMs: { type: Number, default: null },
        },
      ],
      default: [],
    },
    /** Admin who created the cronjob. Used for `(author, name)` uniqueness only. */
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    /** Reserved for forward compatibility; phase 1 always sets the SYSTEM sentinel. */
    tenantId: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

cronJobSchema.index({ name: 1, author: 1, tenantId: 1 }, { unique: true });
cronJobSchema.index({ enabled: 1, nextRunAt: 1 });
cronJobSchema.index({ updatedAt: -1, _id: 1 });

/**
 * Maximum number of `runs` subdocuments retained on the document. Older
 * runs are evicted FIFO via `recordRunResult`. Surfaced as a constant so
 * the methods layer can trim without re-importing the schema.
 */
export const CRONJOB_RUNS_HISTORY_LIMIT = MAX_RUNS_HISTORY;

export default cronJobSchema;
