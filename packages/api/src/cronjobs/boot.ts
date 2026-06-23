/**
 * Boot helper for the cronjob subsystem.
 *
 * Wires the in-memory scheduler to the database methods bag, the
 * resolved app config, and the system user loader. Called once at
 * server boot after `connectDb()` succeeds — see
 * `api/server/index.js`.
 *
 * Idempotent: re-calling has no effect (`initScheduler` short-circuits
 * if it has already been wired).
 *
 * Shutdown is registered automatically via `registerShutdownTask` so
 * the SIGTERM/SIGINT handlers in `setupGracefulShutdown` stop the
 * `node-cron` workers and drain the in-process queue. We deliberately
 * DON'T add this to the same task list as File / MCP cleanup — it has
 * a short, bounded lifespan (just `cron.stop()` on each task).
 */
import { logger } from '@librechat/data-schemas';
import { registerShutdownTask } from '~/app/shutdown';
import type { AppConfig, IUser } from '@librechat/data-schemas';
import type { Agent } from 'librechat-data-provider';
import type { CronJobExecutorDeps } from './executor';
import { initScheduler, shutdownScheduler } from './scheduler';

export interface CronJobBootDeps {
  /** Methods from `createMethods(mongoose)` — must include the cronjob methods. */
  db: CronJobExecutorDeps['db'];
  /** Resolved app config (`req.config`). Required by `initializeAgent`. */
  appConfig: AppConfig;
  /** Lazily creates + caches the system user that cronjob runs are attributed to. */
  loadSystemUser: () => Promise<IUser>;
}

/**
 * Wires the cronjob scheduler to the provided dependencies and
 * registers a shutdown task. Returns once the scheduler has loaded
 * all enabled jobs from the database (or failed to do so — failures
 * are logged but never thrown, so a broken scheduler can't keep the
 * server from booting).
 */
export async function bootCronJobs(deps: CronJobBootDeps): Promise<void> {
  const schedulerDeps: CronJobExecutorDeps = {
    db: deps.db,
    appConfig: deps.appConfig,
    loadSystemUser: deps.loadSystemUser,
  };
  try {
    await initScheduler(schedulerDeps);
  } catch (err) {
    logger.error('[cronjobs.boot] initScheduler failed:', err);
  }
  registerShutdownTask('cronjobs-scheduler', () => {
    try {
      shutdownScheduler();
    } catch (err) {
      logger.error('[cronjobs.boot] shutdownScheduler failed:', err);
    }
  });
}

/**
 * Convenience type for the `db` subset. Lets callers declare the
 * dependency without pulling in the full methods bag.
 */
export type CronJobDbDeps = CronJobExecutorDeps['db'];

/**
 * Helper to narrow the `db` argument that the `models` module passes
 * around. We only type-check the methods we actually call from
 * `executor.ts` / `scheduler.ts` / `handlers.ts`. Mongoose's
 * `Model<>` and other internals stay out of this surface.
 */
export function assertCronJobDb(db: unknown): CronJobDbDeps {
  if (typeof db !== 'object' || db === null) {
    throw new Error('[cronjobs.boot] db must be an object');
  }
  const candidate = db as Record<string, unknown>;
  const required = [
    'getAgent',
    'getUser',
    'recordCronRun',
    'setNextRunAt',
    'listCronJobs',
    'getCronJobById',
    'createCronJob',
    'updateCronJob',
    'toggleCronJob',
    'deleteCronJob',
  ];
  for (const key of required) {
    if (typeof candidate[key] !== 'function') {
      throw new Error(`[cronjobs.boot] db is missing required method: ${key}`);
    }
  }
  return candidate as unknown as CronJobDbDeps;
}

/**
 * Re-export the Agent type for callers that need to pass `db.getAgent`
 * results through. Avoids forcing them to import from `librechat-data-provider`.
 */
export type { Agent };
