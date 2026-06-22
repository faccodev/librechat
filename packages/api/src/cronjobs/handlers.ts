/**
 * REST handlers for /api/cronjobs.
 *
 * Wiring: `api/server/routes/cronjobs.js` mounts these onto an Express
 * router and injects the methods bag (`db`) plus app config. We keep
 * the handler factory in TS so the test surface lives in
 * `packages/api` alongside the executor / scheduler.
 *
 * Auth: handlers are mounted behind `requireJwtAuth` and
 * `requireAdmin` in the route file (single-Docker / global scope per
 * product decision — no per-user ACL).
 *
 * Response shape: all endpoints return JSON. Validation failures throw
 * `CronJobValidationError` from the methods layer; the route catches
 * that and translates it to 400 with the structured issues array.
 */
import { logger } from '@librechat/data-schemas';
import { CronJobValidationError } from '@librechat/data-schemas';
import type { Request, Response } from 'express';
import type { AppConfig, IUser } from '@librechat/data-schemas';
import { executeCronJob, type CronJobExecutorDeps } from './executor';
import {
  addOrUpdateSchedule,
  peekNextRunAt,
  removeSchedule,
} from './scheduler';

/**
 * Subset of the methods bag the handlers need. Cast at the route layer
 * so the executor deps line up cleanly with what the scheduler passes.
 */
export interface CronJobHandlersDeps {
  db: CronJobExecutorDeps['db'] & {
    createCronJob: (input: unknown) => Promise<unknown>;
    getCronJobById: (id: string) => Promise<unknown>;
    listCronJobs: (options?: unknown) => Promise<{ jobs: unknown[] }>;
    updateCronJob: (id: string, patch: unknown) => Promise<unknown>;
    toggleCronJob: (id: string, enabled: boolean) => Promise<unknown>;
    deleteCronJob: (id: string) => Promise<boolean>;
  };
  appConfig: AppConfig;
  loadSystemUser: () => Promise<IUser>;
}

/**
 * Builds the Express handler set. The route file imports `createCronJobHandlers`
 * and mounts each returned function on the appropriate path.
 */
export function createCronJobHandlers(deps: CronJobHandlersDeps) {
  /**
   * Translates a `CronJobValidationError` into a 400 with the per-field
   * issues array. Anything else bubbles to the route's generic error
   * handler (which currently emits 500 — the executor logs the cause).
   */
  function handleError(res: Response, err: unknown): Response {
    if (err instanceof CronJobValidationError) {
      return res.status(400).json({ error: err.message, issues: err.issues });
    }
    logger.error('[cronjobs.handlers] Unhandled error:', err);
    const message = err instanceof Error ? err.message : 'Internal server error';
    return res.status(500).json({ error: message });
  }

  async function list(req: Request, res: Response): Promise<Response> {
    try {
      const enabledOnly = req.query.enabled === 'true';
      const { jobs } = await deps.db.listCronJobs({
        enabledOnly,
        limit: 200,
      } as never);
      // Hydrate nextRunAt from the in-memory registry for the panel.
      const enriched = (jobs as Array<{ _id: { toString(): string } }>).map((job) => ({
        ...job,
        nextRunAt: peekNextRunAt(job._id.toString()) ?? null,
      }));
      return res.json({ jobs: enriched });
    } catch (err) {
      return handleError(res, err);
    }
  }

  async function get(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const job = await deps.db.getCronJobById(id);
      if (!job) {
        return res.status(404).json({ error: 'CronJob not found' });
      }
      return res.json({
        job: {
          ...job,
          nextRunAt: peekNextRunAt(id) ?? null,
        },
      });
    } catch (err) {
      return handleError(res, err);
    }
  }

  async function create(req: Request, res: Response): Promise<Response> {
    try {
      const user = req.user as IUser | undefined;
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const body = (req.body ?? {}) as Record<string, unknown>;
      const job = await deps.db.createCronJob({
        ...body,
        author: user._id,
        authorName: user.name ?? user.username ?? user.email ?? 'admin',
        tenantId: body.tenantId as string | undefined,
      });
      await addOrUpdateSchedule(job as never);
      return res.status(201).json({ job });
    } catch (err) {
      return handleError(res, err);
    }
  }

  async function patch(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const patch = req.body ?? {};
      const updated = await deps.db.updateCronJob(id, patch);
      if (!updated) {
        return res.status(404).json({ error: 'CronJob not found' });
      }
      await addOrUpdateSchedule(updated as never);
      return res.json({ job: updated });
    } catch (err) {
      return handleError(res, err);
    }
  }

  async function toggle(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const enabled = Boolean(req.body?.enabled);
      const updated = await deps.db.toggleCronJob(id, enabled);
      if (!updated) {
        return res.status(404).json({ error: 'CronJob not found' });
      }
      if (enabled) {
        await addOrUpdateSchedule(updated as never);
      } else {
        removeSchedule(id);
      }
      return res.json({ job: updated });
    } catch (err) {
      return handleError(res, err);
    }
  }

  async function remove(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      removeSchedule(id);
      const ok = await deps.db.deleteCronJob(id);
      if (!ok) {
        return res.status(404).json({ error: 'CronJob not found' });
      }
      return res.json({ ok: true });
    } catch (err) {
      return handleError(res, err);
    }
  }

  async function runNow(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const job = await deps.db.getCronJobById(id);
      if (!job) {
        return res.status(404).json({ error: 'CronJob not found' });
      }
      const executorDeps: CronJobExecutorDeps = {
        db: deps.db as unknown as CronJobExecutorDeps['db'],
        appConfig: deps.appConfig,
        loadSystemUser: deps.loadSystemUser,
      };
      // Detached — return 202 with the job's current `lastRunStatus`
      // hint so the panel can show "Running..." while the executor
      // continues in the background.
      executeCronJob(id, executorDeps, { reason: 'manual' }).catch((err) =>
        logger.error(`[cronjobs.handlers] Manual run failed for ${id}:`, err),
      );
      return res.status(202).json({ ok: true });
    } catch (err) {
      return handleError(res, err);
    }
  }

  return { list, get, create, patch, toggle, remove, runNow };
}
