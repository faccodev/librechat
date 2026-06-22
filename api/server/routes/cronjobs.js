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
const { logger } = require('@librechat/data-schemas');
const { requireJwtAuth } = require('~/server/middleware');
const configMiddleware = require('~/server/middleware/config/app');

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
 * Builds the system user once and caches it. The "system" user is the
 * attributed actor for cronjob runs — its id is what gets passed as
 * `user_id` to the agent runtime so tool loaders and balance trackers
 * see a stable identity.
 *
 * Created lazily on the first `run-now` so a fresh install can boot
 * without a system user existing yet. The user is upserted by email
 * sentinel `__system__@cronjobs.local` and re-used across restarts.
 */
let systemUserPromise = null;
function loadSystemUser() {
  if (!systemUserPromise) {
    systemUserPromise = (async () => {
      const mongoose = require('mongoose');
      const User = mongoose.models.User;
      const SYSTEM_EMAIL = '__system__@cronjobs.local';
      let user = await User.findOne({ email: SYSTEM_EMAIL }).lean();
      if (user) {
        return user;
      }
      const created = await User.create({
        email: SYSTEM_EMAIL,
        username: 'cronjob-system',
        name: 'CronJob System',
        role: 'ADMIN',
        provider: 'local',
        emailVerified: true,
      });
      logger.info('[cronjobs] Created system user for cronjob attribution');
      return created.toObject();
    })();
  }
  return systemUserPromise;
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
