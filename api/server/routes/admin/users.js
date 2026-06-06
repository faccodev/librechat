const express = require('express');
const {
  createAdminUsersHandlers,
  getWorkspaceConfig,
  validateWorkspaceSubdir,
  resolveWorkspacePath,
  ensureWorkspaceDir,
} = require('@librechat/api');
const { SystemCapabilities } = require('@librechat/data-schemas');
const { requireCapability } = require('~/server/middleware/roles/capabilities');
const { requireJwtAuth } = require('~/server/middleware');
const db = require('~/models');
const bcrypt = require('bcryptjs');

const router = express.Router();

const requireAdminAccess = requireCapability(SystemCapabilities.ACCESS_ADMIN);
const requireReadUsers = requireCapability(SystemCapabilities.READ_USERS);
const requireManageUsers = requireCapability(SystemCapabilities.MANAGE_USERS);

// Same pattern used in api/server/routes/admin/workspaces.js: getAppConfig is
// async (returns a Promise) and `.sync` is never defined on it, so reading
// the workspace config through it always produced an empty appConfig and
// reported `enabled: false`. loadCustomConfig is sync (uses js-yaml) — safe
// to call once at module load and cache.
const loadCustomConfig = require('~/server/services/Config/loadCustomConfig');
let cachedWorkspaceConfig;
let cachedAppConfig = {};
try {
  cachedAppConfig = loadCustomConfig() ?? {};
  cachedWorkspaceConfig = getWorkspaceConfig(cachedAppConfig);
} catch (err) {
  cachedWorkspaceConfig = { enabled: true, containerBasePath: '/workspaces', sizeLimitMB: 2048 };
}

const handlers = createAdminUsersHandlers({
  findUsers: db.findUsers,
  countUsers: db.countUsers,
  deleteUserById: db.deleteUserById,
  deleteConfig: db.deleteConfig,
  deleteAclEntries: db.deleteAclEntries,
});

router.use(requireJwtAuth, requireAdminAccess);

router.get('/', requireReadUsers, handlers.listUsers);
router.get('/search', requireReadUsers, handlers.searchUsers);
// router.delete('/:id', requireManageUsers, handlers.deleteUser);

// Admin-initiated user creation
router.post('/', requireManageUsers, async (req, res) => {
  try {
    const { email, password, name, username, role, workspaceSubdir } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const existingUsers = await db.findUsers({ email }, 'email', { limit: 1 });
    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUserData = {
      provider: 'local',
      email,
      username: username || undefined,
      name,
      avatar: null,
      role: role || 'USER',
      password: hashedPassword,
      emailVerified: true,
    };

    // If workspace subdir is provided, validate and create
    if (workspaceSubdir) {
      if (!cachedWorkspaceConfig.enabled) {
        return res.status(400).json({ error: 'Workspaces are currently disabled in configuration' });
      }

      const { valid, error } = validateWorkspaceSubdir(workspaceSubdir);
      if (!valid) {
        return res.status(400).json({ error: error ?? 'Invalid workspace subdirectory' });
      }

      const resolvedPath = resolveWorkspacePath(workspaceSubdir, cachedWorkspaceConfig);
      if (!resolvedPath) {
        return res.status(400).json({ error: 'Failed to resolve workspace path securely' });
      }

      await ensureWorkspaceDir(resolvedPath, cachedWorkspaceConfig.containerBasePath);
      newUserData.workspaceSubdir = workspaceSubdir;
    }

    const newUser = await db.createUser(
      newUserData,
      cachedAppConfig.balance,
      true,
      true,
    );

    const result = {
      id: newUser._id?.toString() ?? '',
      name: newUser.name ?? '',
      username: newUser.username ?? '',
      email: newUser.email ?? '',
      avatar: newUser.avatar ?? '',
      role: newUser.role ?? 'USER',
      provider: newUser.provider ?? 'local',
      createdAt: newUser.createdAt?.toISOString(),
      updatedAt: newUser.updatedAt?.toISOString(),
      workspaceSubdir: newUser.workspaceSubdir ?? null,
    };

    return res.status(201).json(result);
  } catch (error) {
    console.error('[adminUsers] createUser route error:', error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
});

// Admin-initiated user role update
router.put('/:id/role', requireManageUsers, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    const validRoles = ['USER', 'ADMIN'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const updatedUser = await db.updateUser(id, { role });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({
      id: updatedUser._id?.toString() ?? '',
      name: updatedUser.name ?? '',
      email: updatedUser.email ?? '',
      role: updatedUser.role ?? 'USER',
    });
  } catch (error) {
    console.error('[adminUsers] updateUserRole route error:', error);
    return res.status(500).json({ error: 'Failed to update user role' });
  }
});

module.exports = router;
