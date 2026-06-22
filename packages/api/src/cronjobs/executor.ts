/**
 * Cronjob executor — turns a CronJob document into a finished run record.
 *
 * Phase 1 supports two execution paths:
 *
 * 1. **Agent path** (when `cronjob.agent` is set):
 *    Loads the saved Agent, calls `initializeAgent` + `createRun` from
 *    `@librechat/api`, and streams the assistant's final message back
 *    via the agent event pipeline. This path reuses LibreChat's full
 *    agent runtime (skills, edges, model_parameters, MCP tools, etc.).
 *
 * 2. **Bare path** (when only `cronjob.provider` + `cronjob.model`):
 *    Synthesizes a minimal ephemeral agent with just the prompt,
 *    provider, model, and MCP tools listed on the cronjob. Goes through
 *    the same `createRun` pipeline so token accounting and tool
 *    resolution still work.
 *
 * Both paths:
 * - Run inside a queue (see `./queue.ts`) so simultaneous triggers
 *   don't stampede the LLM upstream.
 * - Are bounded by an `AbortSignal` so `run-now` from the panel can
 *   cancel an in-flight run.
 * - Record start/end status + duration on the cronjob's `runs` array
 *   and fire feedback (Discord webhook) when configured.
 *
 * Phase 1 does NOT support template rendering in `prompt` — the value
 * is sent verbatim. Phase 2 may add `{{ now }}` / `{{ date }}` style
 * helpers.
 */
import { logger } from '@librechat/data-schemas';
import type { AppConfig, IUser } from '@librechat/data-schemas';
import type { Agent } from 'librechat-data-provider';
import { HumanMessage } from '@librechat/agents';
import type { InitializedAgent } from '~/agents/initialize';
import type { ServerRequest } from '~/types';
import { createRun, initializeAgent } from '~/agents';
import { dispatchFeedback } from './feedback';
import { enqueueCronJob } from './queue';
import type { ICronJob } from '@librechat/data-schemas';

/**
 * Public surface of the executor. Imported by `./scheduler.ts` (for
 * scheduled fires) and `./handlers.ts` (for the `run-now` panel button).
 *
 * Designed to be called with the full methods bag from
 * `createMethods(mongoose)` — the caller (boot wiring in
 * `api/server/index.js`) is responsible for capturing the bound `db`
 * reference and passing it here so the executor never has to reach into
 * the legacy `~/models` singleton.
 */
export interface CronJobExecutorDeps {
  /** Methods from `createMethods(mongoose)` — getAgent / getUser / etc. */
  db: {
    getAgent: (filter: { id: string }) => Promise<Agent | null | undefined>;
    getUser: (filter: { _id: string }) => Promise<IUser | null | undefined>;
    recordCronRun: (input: {
      jobId: string;
      status: 'running' | 'success' | 'error';
      output?: string;
      error?: string;
      provider?: string;
      model?: string;
      startedAt: Date;
      finishedAt?: Date;
      durationMs?: number;
    }) => Promise<unknown>;
    setNextRunAt: (id: string, nextRunAt: Date | null) => Promise<unknown>;
  };
  /** Resolved app config (`req.config`). Required by `initializeAgent`. */
  appConfig: AppConfig;
  /**
   * Loaded on first execution and cached. The "system" user is the
   * author of cronjob output runs — we attribute balance debits /
   * transactions to it. Created lazily via `loadOrCreateSystemUser`.
   */
  loadSystemUser: () => Promise<IUser>;
}

/**
 * Minimal stub request that satisfies the bits of `req` that
 * `initializeAgent` / `createRun` read. We construct a fresh stub per
 * execution rather than holding a single long-lived request because the
 * agent runtime mutates `req.body` and other fields as the run
 * progresses.
 *
 * Fields populated:
 * - `user` — system user (created lazily on first run)
 * - `config` — app config (resolved at boot)
 * - `body` — minimal RequestBody with a fresh messageId + endpoint
 *
 * What is deliberately NOT stubbed:
 * - `req.app` / `req.res` — read-only paths that we don't touch
 * - Session — agents don't read `req.session` in the run path
 */
function buildStubRequest(systemUser: IUser, appConfig: AppConfig): ServerRequest {
  const messageId = `cron_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const stub = {
    user: systemUser,
    config: appConfig,
    body: {
      messageId,
      endpoint: systemUser.role ?? 'agent',
    },
  } as unknown as ServerRequest;
  return stub;
}

/**
 * Builds an ephemeral `Agent`-shaped object when the cronjob has no
 * saved agent. Mirrors the minimal fields the runtime actually reads.
 *
 * Why not extend the `Agent` model: the schema-level required fields
 * (`author`, etc.) are noisy for a transient runtime-only object, and
 * `initializeAgent` only reads a known subset. Constructing the bare
 * shape avoids polluting the Agent collection with throwaway rows.
 */
function buildEphemeralAgent(params: {
  provider: string;
  model: string;
  tools: string[];
  prompt: string;
}): Agent {
  return {
    id: `ephemeral_cron_${Date.now()}`,
    name: 'cronjob-ephemeral',
    provider: params.provider,
    model: params.model,
    instructions: '',
    tools: params.tools,
    model_parameters: { model: params.model },
    edges: [],
  } as unknown as Agent;
}

/**
 * Core execution entrypoint. Always enqueues to the in-process queue
 * so concurrent triggers don't bypass rate limits — even `run-now`
 * from the panel flows through here.
 */
export function executeCronJob(
  jobId: string,
  deps: CronJobExecutorDeps,
  options: { reason?: 'schedule' | 'manual' } = {},
): Promise<void> {
  return enqueueCronJob(() => runOnce(jobId, deps, options));
}

/**
 * Loads the cronjob document, resolves the agent (or builds an
 * ephemeral one), runs the instruction through the agent runtime, and
 * persists the run outcome. Idempotent against repeat triggers — the
 * queue serializes; abort signals drop the run before it persists a
 * second `success`.
 */
async function runOnce(
  jobId: string,
  deps: CronJobExecutorDeps,
  options: { reason?: 'schedule' | 'manual' } = {},
): Promise<void> {
  const startedAt = new Date();
  const systemUser = await deps.loadSystemUser();
  const job = await deps.db.getUser({ _id: jobId } as never).catch(() => null);
  // We re-fetch via the methods bag below to keep a single source of
  // truth for the cronjob doc shape.
  const mongoose = (await import('mongoose')).default;
  const cronDoc = (await mongoose.models.CronJob.findById(jobId).lean()) as ICronJob | null;
  if (!cronDoc) {
    logger.warn(`[cronjobs] Skipping run for unknown cronjob ${jobId}`);
    return;
  }
  if (!cronDoc.enabled && options.reason !== 'manual') {
    logger.debug(`[cronjobs] Skipping run for disabled cronjob ${cronDoc.name}`);
    return;
  }

  // Resolve execution target: saved agent > ephemeral (provider+model).
  let resolvedAgent: Agent;
  let resolvedTools: string[];
  if (cronDoc.agent) {
    const saved = await deps.db.getAgent({ id: String(cronDoc.agent) });
    if (!saved) {
      await failRun(deps, jobId, startedAt, `Agent ${cronDoc.agent} not found`);
      return;
    }
    resolvedAgent = saved;
    resolvedTools = Array.isArray(saved.tools) ? saved.tools : [];
  } else {
    if (!cronDoc.provider || !cronDoc.model) {
      await failRun(
        deps,
        jobId,
        startedAt,
        'Cronjob has no agent and no provider/model — cannot execute',
      );
      return;
    }
    resolvedAgent = buildEphemeralAgent({
      provider: cronDoc.provider,
      model: cronDoc.model,
      tools: cronDoc.tools ?? [],
      prompt: cronDoc.prompt,
    });
    resolvedTools = cronDoc.tools ?? [];
  }

  // Build a stub request and a one-shot messages array.
  const req = buildStubRequest(systemUser, deps.appConfig);
  const abortController = new AbortController();
  const messages = [new HumanMessage(cronDoc.prompt)];

  // Mark the run as in-flight immediately so a panel refresh shows it.
  await deps.db.recordCronRun({
    jobId,
    status: 'running',
    startedAt,
    output: '',
    provider: cronDoc.provider ?? resolvedAgent.provider ?? undefined,
    model: cronDoc.model ?? resolvedAgent.model ?? undefined,
  });

  let collectedOutput = '';
  try {
    const initialized: InitializedAgent = await initializeAgent({
      req,
      res: {} as never,
      agent: resolvedAgent,
      allowedProviders: new Set([resolvedAgent.provider]),
      isInitialAgent: true,
    });

    const run = await createRun({
      agents: [initialized],
      messages,
      signal: abortController.signal,
      user: systemUser,
      req,
      streaming: false,
      streamUsage: false,
      customHandlers: {
        on_message_delta: {
          handle: (_event: unknown, data: { content?: string }) => {
            if (typeof data?.content === 'string') {
              collectedOutput += data.content;
            }
          },
        },
        on_tool_execute: {
          handle: () => {
            /* tool calls during cronjobs are allowed; we just don't
               stream them to a UI. Errors propagate via on_tool_error. */
          },
        },
        on_chain_end: {
          handle: () => {
            /* marker — final state already captured by message deltas */
          },
        },
      },
    });

    await run.processStream(
      { messages },
      {
        runName: 'CronJobRun',
        configurable: {
          thread_id: `cronjob_${jobId}`,
          user_id: String(systemUser._id),
          user: systemUser,
          requestBody: {
            messageId: req.body?.messageId,
            conversationId: `cronjob_${jobId}`,
          },
        },
        signal: abortController.signal,
        version: 'v2',
      },
    );

    const finishedAt = new Date();
    const durationMs = finishedAt.getTime() - startedAt.getTime();
    const output = collectedOutput.trim() || '(no output produced)';
    await deps.db.recordCronRun({
      jobId,
      status: 'success',
      output,
      startedAt,
      finishedAt,
      durationMs,
      provider: cronDoc.provider ?? resolvedAgent.provider ?? undefined,
      model: cronDoc.model ?? resolvedAgent.model ?? undefined,
    });

    // Best-effort feedback — never throws.
    await dispatchFeedback({
      feedback: cronDoc.feedback ?? {},
      jobName: cronDoc.name,
      status: 'success',
      output,
      durationMs,
      provider: cronDoc.provider ?? resolvedAgent.provider ?? undefined,
      model: cronDoc.model ?? resolvedAgent.model ?? undefined,
    });
    logger.info(
      `[cronjobs] Run success for "${cronDoc.name}" (${durationMs}ms, ${output.length} chars)`,
    );
  } catch (err) {
    const finishedAt = new Date();
    const durationMs = finishedAt.getTime() - startedAt.getTime();
    const error = err instanceof Error ? err.message : String(err);
    await deps.db.recordCronRun({
      jobId,
      status: 'error',
      error,
      startedAt,
      finishedAt,
      durationMs,
      provider: cronDoc.provider ?? resolvedAgent.provider ?? undefined,
      model: cronDoc.model ?? resolvedAgent.model ?? undefined,
    });
    await dispatchFeedback({
      feedback: cronDoc.feedback ?? {},
      jobName: cronDoc.name,
      status: 'error',
      output: collectedOutput,
      error,
      durationMs,
      provider: cronDoc.provider ?? resolvedAgent.provider ?? undefined,
      model: cronDoc.model ?? resolvedAgent.model ?? undefined,
    });
    logger.error(`[cronjobs] Run failed for "${cronDoc.name}":`, err);
  }
}

/**
 * Records a hard-fail (no agent, missing config) and notifies Discord
 * if configured. Distinct from the catch-block fail path because no
 * run was actually attempted — we record a synthetic error run so the
 * panel still shows why nothing happened.
 */
async function failRun(
  deps: CronJobExecutorDeps,
  jobId: string,
  startedAt: Date,
  errorMessage: string,
): Promise<void> {
  const finishedAt = new Date();
  await deps.db.recordCronRun({
    jobId,
    status: 'error',
    error: errorMessage,
    startedAt,
    finishedAt,
    durationMs: finishedAt.getTime() - startedAt.getTime(),
  });
  logger.warn(`[cronjobs] ${errorMessage} (job ${jobId})`);
}
