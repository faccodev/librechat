import type { Document, Types } from 'mongoose';

/**
 * CronJob — a globally-scoped scheduled task that runs an instruction
 * (optionally through a saved Agent) on a `node-cron` expression and
 * optionally posts the result to a Discord webhook.
 *
 * Phase 1 model — see schema comment for design notes and field-level
 * rationale.
 */
export interface ICronJobFeedback {
  /** Discord incoming webhook URL. Phase 1 only. */
  discordWebhookUrl?: string | null;
}

export type CronJobRunStatus = 'running' | 'success' | 'error';
export type CronJobLastStatus = 'success' | 'error';

export interface ICronJobRun {
  startedAt: Date;
  finishedAt?: Date | null;
  status: CronJobRunStatus;
  /** Final assistant message text. Truncated to ~8KB to keep the doc bounded. */
  output: string;
  error?: string | null;
  provider?: string | null;
  model?: string | null;
  durationMs?: number | null;
}

export interface ICronJob {
  name: string;
  description?: string;
  /** 5-field standard cron expression (minute hour dom month dow). */
  schedule: string;
  timezone: string;
  enabled: boolean;
  /** Optional saved Agent — when set, executor uses the full agent context. */
  agent?: Types.ObjectId | null;
  /** Fallback provider when `agent` is null. */
  provider?: string | null;
  /** Fallback model when `agent` is null. */
  model?: string | null;
  /** The instruction / user message sent to the agent or model. */
  prompt: string;
  /** MCP server names forwarded to the executor for this run. */
  tools: string[];
  /** Optional feedback channels. Phase 1: Discord webhook only. */
  feedback: ICronJobFeedback;
  lastRunAt?: Date | null;
  lastRunStatus?: CronJobLastStatus | null;
  nextRunAt?: Date | null;
  runs: ICronJobRun[];
  author: Types.ObjectId;
  authorName: string;
  tenantId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * `ICronJobDocument` extends Mongoose's `Document`, which carries a
 * `model()` accessor that conflicts with our `model: string` schema
 * field. We omit the `model` from the ICronJob side and re-add it
 * as a plain string via intersection so TypeScript's structural
 * assignability doesn't trip on the Document method.
 *
 * Runtime: the schema path is `model`; the Mongoose `.model()`
 * method is still callable for the discriminator use case (cast
 * `doc as any` if you need to call it).
 */
export type ICronJobDocument = Omit<ICronJob, 'model'> &
  Omit<Document, 'model'> & {
    model?: string | null;
  };

/**
 * Input shape accepted by `createCronJob`. `runs`, `lastRunAt`, etc. are
 * server-managed and never accepted from callers.
 */
export interface CreateCronJobInput {
  name: string;
  description?: string;
  schedule: string;
  timezone?: string;
  enabled?: boolean;
  agent?: Types.ObjectId | string | null;
  provider?: string | null;
  model?: string | null;
  prompt: string;
  tools?: string[];
  feedback?: ICronJobFeedback;
  author: Types.ObjectId | string;
  authorName: string;
  tenantId?: string;
}

export interface UpdateCronJobInput {
  name?: string;
  description?: string;
  schedule?: string;
  timezone?: string;
  enabled?: boolean;
  agent?: Types.ObjectId | string | null;
  provider?: string | null;
  model?: string | null;
  prompt?: string;
  tools?: string[];
  feedback?: ICronJobFeedback;
}

/**
 * Per-run output the executor writes via `recordRunResult`. The model
 * layer trims the `runs` array to the schema-defined cap.
 */
export interface RecordCronRunInput {
  jobId: Types.ObjectId | string;
  status: CronJobRunStatus;
  output?: string;
  error?: string;
  provider?: string;
  model?: string;
  startedAt: Date;
  finishedAt?: Date;
  durationMs?: number;
}
