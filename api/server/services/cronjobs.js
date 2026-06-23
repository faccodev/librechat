/**
 * Shared helpers for the cronjob REST routes and the boot wiring in
 * `api/server/index.js`.
 *
 * `loadSystemUser` builds a stable "system" user (sentinel email
 * `__system__@cronjobs.local`) that cronjob runs are attributed to.
 * The user is the actor the executor passes to the agent runtime as
 * `req.user` / `user_id` — the rest of the agent stack (balance
 * debits, transaction logging, tool loaders) treats cronjob output
 * as belonging to this single system identity.
 *
 * The user is created lazily on the first call and cached in module
 * scope so concurrent `run-now` requests don't race two `User.create`
 * calls. A failed create is retried on the next call (we drop the
 * cached promise) so a transient Mongo blip during boot doesn't
 * permanently break the scheduler.
 */
const mongoose = require('mongoose');
const { logger } = require('@librechat/data-schemas');

const SYSTEM_EMAIL = '__system__@cronjobs.local';

let systemUserPromise = null;

function loadSystemUser() {
  if (!systemUserPromise) {
    systemUserPromise = (async () => {
      const User = mongoose.models.User;
      if (!User) {
        throw new Error(
          '[cronjobs] User model is not registered yet — call after connectDb()',
        );
      }
      const existing = await User.findOne({ email: SYSTEM_EMAIL }).lean();
      if (existing) {
        return existing;
      }
      try {
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
      } catch (err) {
        if (err && err.code === 11000) {
          const re = await User.findOne({ email: SYSTEM_EMAIL }).lean();
          if (re) {
            return re;
          }
        }
        // Drop the cached rejection so the next call retries.
        systemUserPromise = null;
        throw err;
      }
    })();
  }
  return systemUserPromise;
}

module.exports = { loadSystemUser, SYSTEM_EMAIL };
