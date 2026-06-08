const express = require('express');
const bcrypt = require('bcryptjs');
const { createSetBalanceConfig, forceRefreshCloudFrontAuthCookies, changePassword } = require('@librechat/api');
const {
  resetPasswordRequestController,
  resetPasswordController,
  registrationController,
  graphTokenController,
  refreshController,
} = require('~/server/controllers/AuthController');
const {
  regenerateBackupCodes,
  disable2FA,
  confirm2FA,
  enable2FA,
  verify2FA,
} = require('~/server/controllers/TwoFactorController');
const { verify2FAWithTempToken } = require('~/server/controllers/auth/TwoFactorAuthController');
const { logoutController } = require('~/server/controllers/auth/LogoutController');
const { loginController } = require('~/server/controllers/auth/LoginController');
const db = require('~/models');
const { findBalanceByUser, upsertBalanceFields } = db;
const { getAppConfig } = require('~/server/services/Config');
const logger = require('~/config/winston');
const middleware = require('~/server/middleware');

const setBalanceConfig = createSetBalanceConfig({
  getAppConfig,
  findBalanceByUser,
  upsertBalanceFields,
});

const router = express.Router();
const getCloudFrontAuthCookieRefreshResult = (req, res) => {
  const warmedResult = req.cloudFrontAuthCookieRefreshResult;
  if (warmedResult && (warmedResult.attempted || !warmedResult.enabled)) {
    return warmedResult;
  }

  return forceRefreshCloudFrontAuthCookies(req, res, req.user);
};

const ldapAuth = !!process.env.LDAP_URL && !!process.env.LDAP_USER_SEARCH_BASE;
//Local
router.post('/logout', middleware.requireJwtAuth, logoutController);
router.post(
  '/login',
  middleware.logHeaders,
  middleware.loginLimiter,
  middleware.checkBan,
  ldapAuth ? middleware.requireLdapAuth : middleware.requireLocalAuth,
  setBalanceConfig,
  loginController,
);
router.post('/refresh', refreshController);
router.post('/cloudfront/refresh', middleware.requireJwtAuth, (req, res) => {
  const result = getCloudFrontAuthCookieRefreshResult(req, res);
  if (!result.enabled) {
    return res.sendStatus(404);
  }

  const status = result.refreshed ? 200 : 500;
  return res.status(status).json({
    ok: result.refreshed,
    expiresInSec: result.expiresInSec,
    refreshAfterSec: result.refreshAfterSec,
  });
});
router.post(
  '/register',
  middleware.registerLimiter,
  middleware.checkBan,
  middleware.checkInviteUser,
  middleware.validateRegistration,
  registrationController,
);
router.post(
  '/requestPasswordReset',
  middleware.resetPasswordLimiter,
  middleware.checkBan,
  middleware.validatePasswordReset,
  resetPasswordRequestController,
);
router.post(
  '/resetPassword',
  middleware.checkBan,
  middleware.validatePasswordReset,
  resetPasswordController,
);

router.post('/2fa/enable', middleware.requireJwtAuth, enable2FA);
router.post('/2fa/verify', middleware.requireJwtAuth, verify2FA);
router.post('/2fa/verify-temp', middleware.checkBan, verify2FAWithTempToken);
router.post('/2fa/confirm', middleware.requireJwtAuth, confirm2FA);
router.post('/2fa/disable', middleware.requireJwtAuth, disable2FA);
router.post('/2fa/backup/regenerate', middleware.requireJwtAuth, regenerateBackupCodes);

router.get('/graph-token', middleware.requireJwtAuth, graphTokenController);

// Self-service password change for local accounts.
// OAuth/SSO users do not have a stored password in LibreChat and must use
// the provider's own reset flow.
router.post(
  '/password',
  middleware.requireJwtAuth,
  middleware.checkBan,
  async (req, res) => {
    const { currentPassword, newPassword } = req.body ?? {};
    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
      return res
        .status(400)
        .json({ error: 'Both currentPassword and newPassword are required' });
    }
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: 'New password must be at least 8 characters' });
    }

    const userId = req.user?._id?.toString() ?? req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
      const result = await changePassword(userId, currentPassword, newPassword, {
        findUserById: async (id) => db.getUserById(id, '+password'),
        updateUserPassword: async (id, hash) => db.updateUser(id, { password: hash }),
        compare: async (candidate, hash) => bcrypt.compare(candidate, hash),
        hash: async (plaintext) => bcrypt.hash(plaintext, 10),
      });

      if (result.ok) {
        return res.status(200).json({ ok: true });
      }

      switch (result.code) {
        case 'invalid_current_password':
          return res.status(400).json({ error: 'Current password is incorrect' });
        case 'no_password':
        case 'not_local':
          return res
            .status(400)
            .json({ error: 'Password changes are only available for local accounts' });
        case 'user_not_found':
        default:
          return res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      logger.error('[auth] /password change failed:', err);
      return res.status(500).json({ error: 'Failed to change password' });
    }
  },
);

module.exports = router;
