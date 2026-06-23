/**
 * /api/cronjobs — global admin-only endpoints for scheduled AI tasks.
 *
 * Wires the REST handlers from `@librechat/api` (Phase 1 surface:
 * list / get / create / patch / toggle / remove / run-now). Backed by
 * the `CronJobMethods` injected from `~/models`, which is itself built
 * by `createMethods(mongoose)` from `@librechat/data-schemas`.
 *
 * Auth: every endpoint requires a valid JWT (via the global
 * `requireJwtAuth` middleware mounted in `api/server/index.js`) AND
 * the admin role (via `requireAdmin`). The cronjob feature is
 * intentionally global / single-Docker with no per-user ACL — every
 * admin sees and can edit every job.
 */
const express = require('express');
const { createCronJobHandlers } = require('@librechat/api');
const { SystemCapabilities } = require('@librechat/data-schemas');
const { requireCapability } = require('~/server/middleware/roles/capabilities');
const { requireJwtAuth } = require('~/server/middleware');
const configMiddleware = require('~/server/middleware/config/app');
const { loadSystemUser } = require('~/server/services/cronjobs');

const router = express.Router();
const requireAdminAccess = requireCapability(SystemCapabilities.ACCESS_ADMIN);

router.use(requireJwtAuth, requireAdminAccess, configMiddleware);

/**
 * Wraps a Promise so any rejected error lands in the global error
 * middleware instead of leaking out via floating rejections. The
 * individual handlers already translate `CronJobValidationError` and
 * 404s into proper responses — this is a belt-and-suspenders net.
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Resolves the live `appConfig` from the request context. The
 * `configMiddleware` mounted in `api/server/index.js` populates
 * `req.config` before route handlers run, so this never throws for
 * valid requests.
 */
function resolveAppConfig(req) {
  return req.config;
}

function buildHandlers(req) {
  const db = require('~/models');
  return createCronJobHandlers({
    db: {
      ...db,
    },
    appConfig: resolveAppConfig(req),
    loadSystemUser,
  });
}

router.get('/', asyncHandler(async (req, res) => {
  const handlers = buildHandlers(req);
  await handlers.list(req, res);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const handlers = buildHandlers(req);
  await handlers.get(req, res);
}));

router.post('/', asyncHandler(async (req, res) => {
  const handlers = buildHandlers(req);
  await handlers.create(req, res);
}));

router.patch('/:id', asyncHandler(async (req, res) => {
  const handlers = buildHandlers(req);
  await handlers.patch(req, res);
}));

router.post('/:id/toggle', asyncHandler(async (req, res) => {
  const handlers = buildHandlers(req);
  await handlers.toggle(req, res);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const handlers = buildHandlers(req);
  await handlers.remove(req, res);
}));

router.post('/:id/run', asyncHandler(async (req, res) => {
  const handlers = buildHandlers(req);
  await handlers.runNow(req, res);
}));

module.exports = router;
