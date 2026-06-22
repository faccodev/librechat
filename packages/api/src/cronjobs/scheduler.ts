/**
 * CronJob scheduler — owns the in-memory registry of `node-cron` tasks
 * and synchronizes it with the database.
 *
 * Lifecycle:
 * - `initScheduler(deps)` is called once at server boot after DB is
 *   connected. It loads all enabled jobs and registers a node-cron
 *   task for each.
 * - `addOrUpdateSchedule(job)` / `removeSchedule(id)` are called from
 *   the REST handlers when a job is created / updated / deleted /
 *   toggled, so the in-memory registry tracks the DB.
 * - On a node-cron fire, the callback enqueues the execution via
 *   `./queue.ts` and calls `./executor.ts`. The scheduler never blocks
 *   on the run — a slow LLM response won't delay the next trigger.
 *
 * Crash recovery: on boot, the in-memory registry is rebuilt from the
 * DB. Any jobs that fired during downtime are NOT backfilled — node-cron
 * does not support catch-up runs and we deliberately don't try. Jobs
 * with `* * * * *` schedules will simply resume firing on their next
 * minute boundary.
 *
 * Concurrency model: a single Node.js process owns the registry. If the
 * project ever scales horizontally, this layer needs leader election
 * (Redis lock or similar) so two pods don't double-fire.
 */
import cron from 'node-cron';
import parser from 'cron-parser';
import { logger } from '@librechat/data-schemas';
import { executeCronJob, type CronJobExecutorDeps } from './executor';

interface ScheduledTask {
  task: cron.ScheduledTask;
  nextRunAt: Date | null;
}

const registry = new Map<string, ScheduledTask>();
let executorDeps: CronJobExecutorDeps | null = null;

/**
 * Computes the next fire time of a cron expression via `cron-parser`.
 * Returns null when the expression is invalid (caller is responsible
 * for upstream validation — but we defend here too).
 */
function computeNextRunAt(
  schedule: string,
  timezone: string,
  now: Date = new Date(),
): Date | null {
  if (!cron.validate(schedule)) {
    return null;
  }
  try {
    const interval = parser.parseExpression(schedule, {
      currentDate: now,
      tz: timezone,
    });
    return interval.next().toDate();
  } catch (err) {
    logger.warn(`[cronjobs.scheduler] computeNextRunAt failed for "${schedule}":`, err);
    return null;
  }
}

/**
 * Synchronizes the in-memory registry with one cronjob document. Called
 * after every create / update / toggle. Idempotent: removes any prior
 * registration for the same id and re-adds when enabled.
 */
export async function addOrUpdateSchedule(job: {
  _id: { toString(): string } | string;
  enabled?: boolean | null;
  schedule: string;
  timezone?: string | null;
  name: string;
}): Promise<void> {
  if (!executorDeps) {
    logger.warn('[cronjobs.scheduler] addOrUpdateSchedule called before initScheduler');
    return;
  }
  const id = typeof job._id === 'string' ? job._id : job._id.toString();
  removeSchedule(id);
  if (!job.enabled) {
    logger.debug(`[cronjobs.scheduler] Skipping disabled job "${job.name}" (${id})`);
    return;
  }
  if (!cron.validate(job.schedule)) {
    logger.warn(
      `[cronjobs.scheduler] Skipping job "${job.name}" — invalid schedule "${job.schedule}"`,
    );
    return;
  }

  const scheduled = cron.schedule(
    job.schedule,
    () => {
      logger.debug(`[cronjobs.scheduler] Firing "${job.name}" (${id})`);
      // Fire-and-forget — the queue + executor handle failures and
      // errors are logged inside `runOnce`. We swallow the returned
      // promise so an unhandled rejection doesn't bring down the
      // node-cron worker.
      executeCronJob(id, executorDeps as CronJobExecutorDeps, { reason: 'schedule' }).catch(
        (err) => {
          logger.error(`[cronjobs.scheduler] Executor threw for "${job.name}":`, err);
        },
      );
    },
    {
      timezone: job.timezone ?? 'UTC',
    },
  );

  const nextRunAt = computeNextRunAt(job.schedule, job.timezone ?? 'UTC');
  registry.set(id, { task: scheduled, nextRunAt });
  logger.info(
    `[cronjobs.scheduler] Registered "${job.name}" (${id}) — next fire ${nextRunAt?.toISOString() ?? '?'}`,
  );
  // Best-effort persist of nextRunAt — never blocks scheduling.
  executorDeps.db
    .setNextRunAt(id, nextRunAt)
    .catch((err) =>
      logger.warn(`[cronjobs.scheduler] setNextRunAt failed for ${id}:`, err),
    );
}

/**
 * Tears down the registered task for the given id (if any). Called on
 * delete and on toggle-to-disabled.
 */
export function removeSchedule(id: string): void {
  const existing = registry.get(id);
  if (!existing) {
    return;
  }
  existing.task.stop();
  registry.delete(id);
  logger.debug(`[cronjobs.scheduler] Unregistered cronjob ${id}`);
}

/**
 * Boots the scheduler: wires the executor deps and loads all enabled
 * jobs from the database. Idempotent — safe to call multiple times in
 * dev hot-reload scenarios.
 */
export async function initScheduler(deps: CronJobExecutorDeps): Promise<void> {
  if (executorDeps) {
    logger.debug('[cronjobs.scheduler] Already initialized; skipping re-init');
    return;
  }
  executorDeps = deps;
  try {
    const { listCronJobs } = deps.db as unknown as {
      listCronJobs: (options?: { enabledOnly?: boolean; limit?: number }) => Promise<{
        jobs: Array<{
          _id: { toString(): string };
          enabled: boolean;
          schedule: string;
          timezone: string;
          name: string;
        }>;
      }>;
    };
    const { jobs } = await listCronJobs({ enabledOnly: true, limit: 500 });
    for (const job of jobs) {
      await addOrUpdateSchedule(job);
    }
    logger.info(`[cronjobs.scheduler] Loaded ${jobs.length} cronjob(s) at boot`);
  } catch (err) {
    logger.error('[cronjobs.scheduler] Failed to load jobs at boot:', err);
  }
}

/**
 * Tears down every registered task. Used by tests and graceful shutdown
 * paths so node-cron doesn't keep the event loop alive.
 */
export function shutdownScheduler(): void {
  for (const id of Array.from(registry.keys())) {
    removeSchedule(id);
  }
  executorDeps = null;
}

/**
 * Returns the next scheduled fire time for a job, or null when not
 * registered. Exposed for the REST handler that surfaces
 * `cronjob.nextRunAt` for the panel.
 */
export function peekNextRunAt(id: string): Date | null {
  return registry.get(id)?.nextRunAt ?? null;
}
