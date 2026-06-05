const express = require('express');
const { createWorkspaceAdminHandlers, getWorkspaceConfig } = require('@librechat/api');
const { SystemCapabilities } = require('@librechat/data-schemas');
const { requireCapability } = require('~/server/middleware/roles/capabilities');
const { requireJwtAuth } = require('~/server/middleware');
const { getAppConfig } = require('~/server/services/Config');
const db = require('~/models');

const router = express.Router();
const requireAdminAccess = requireCapability(SystemCapabilities.ACCESS_ADMIN);
const requireReadUsers = requireCapability(SystemCapabilities.READ_USERS);
const requireManageUsers = requireCapability(SystemCapabilities.MANAGE_USERS);

const handlers = createWorkspaceAdminHandlers({
  findUsers: db.findUsers,
  updateUser: db.updateUser,
  getWorkspaceConfig: () => {
    const appConfig = getAppConfig.sync?.() ?? {};
    return getWorkspaceConfig(appConfig);
  },
});

router.use(requireJwtAuth, requireAdminAccess);
router.get('/:id/workspace', requireReadUsers, handlers.getWorkspace);
router.put('/:id/workspace', requireManageUsers, handlers.setWorkspace);

module.exports = router;
