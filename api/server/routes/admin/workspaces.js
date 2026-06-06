const express = require('express');
const { createWorkspaceAdminHandlers, getWorkspaceConfig } = require('@librechat/api');
const { SystemCapabilities } = require('@librechat/data-schemas');
const { requireCapability } = require('~/server/middleware/roles/capabilities');
const { requireJwtAuth } = require('~/server/middleware');
const loadCustomConfig = require('~/server/services/Config/loadCustomConfig');
const db = require('~/models');

const router = express.Router();
const requireAdminAccess = requireCapability(SystemCapabilities.ACCESS_ADMIN);
const requireReadUsers = requireCapability(SystemCapabilities.READ_USERS);
const requireManageUsers = requireCapability(SystemCapabilities.MANAGE_USERS);

// Cached at module load (librechat.yaml is bind-mounted and only re-read on
// server restart, so a per-process cache is safe). The previous version
// called `getAppConfig.sync?.()` which is always undefined — getAppConfig is
// async — so the route always saw an empty appConfig and reported
// `enabled: false` even when librechat.yaml had `workspaces.enabled: true`.
let cachedWorkspaceConfig;
try {
  const appConfig = loadCustomConfig() ?? {};
  cachedWorkspaceConfig = getWorkspaceConfig(appConfig);
} catch (err) {
  cachedWorkspaceConfig = { enabled: false, containerBasePath: '/workspaces', sizeLimitMB: 2048 };
}

const handlers = createWorkspaceAdminHandlers({
  findUsers: db.findUsers,
  updateUser: db.updateUser,
  getWorkspaceConfig: () => cachedWorkspaceConfig,
});

router.use(requireJwtAuth, requireAdminAccess);
router.get('/:id/workspace', requireReadUsers, handlers.getWorkspace);
router.put('/:id/workspace', requireManageUsers, handlers.setWorkspace);

module.exports = router;
