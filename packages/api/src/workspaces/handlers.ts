import type { FilterQuery } from 'mongoose';
import type { Response } from 'express';
import { logger } from '@librechat/data-schemas';
import type { IUser } from '@librechat/data-schemas';
import type { ServerRequest } from '~/types/http';
import type { WorkspaceConfig } from './config';
import { validateWorkspaceSubdir, resolveWorkspacePath, ensureWorkspaceDir } from './service';

export interface WorkspaceAdminDeps {
  findUsers: (
    searchCriteria: FilterQuery<IUser>,
    fieldsToSelect?: string | string[] | null,
    options?: { limit?: number; offset?: number; sort?: Record<string, 1 | -1> },
  ) => Promise<IUser[]>;
  updateUser: (userId: string, data: Partial<IUser>) => Promise<IUser | null>;
  getWorkspaceConfig: () => WorkspaceConfig;
}

export function createWorkspaceAdminHandlers(deps: WorkspaceAdminDeps) {
  const { findUsers, updateUser, getWorkspaceConfig } = deps;

  /**
   * GET /api/admin/users/:id/workspace
   */
  async function getWorkspace(req: ServerRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };
      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const users = await findUsers({ _id: id });
      const user = users[0];
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const config = getWorkspaceConfig();
      const workspaceSubdir = user.workspaceSubdir ?? null;
      const resolvedPath = resolveWorkspacePath(workspaceSubdir, config);

      return res.status(200).json({
        userId: user.id,
        workspaceSubdir,
        resolvedPath,
        enabled: config.enabled,
      });
    } catch (error) {
      logger.error('[Workspace Admin Handlers] getWorkspace error:', error);
      return res.status(500).json({ error: 'Failed to retrieve workspace information' });
    }
  }

  /**
   * PUT /api/admin/users/:id/workspace
   */
  async function setWorkspace(req: ServerRequest, res: Response) {
    try {
      const { id } = req.params as { id: string };
      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const { workspaceSubdir } = req.body as { workspaceSubdir: string | null };

      const config = getWorkspaceConfig();
      if (!config.enabled && workspaceSubdir !== null) {
        return res.status(400).json({ error: 'Workspaces are currently disabled in configuration' });
      }

      const users = await findUsers({ _id: id });
      const user = users[0];
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let resolvedPath: string | null = null;
      if (workspaceSubdir !== null) {
        const { valid, error } = validateWorkspaceSubdir(workspaceSubdir);
        if (!valid) {
          return res.status(400).json({ error: error ?? 'Invalid workspace subdirectory' });
        }

        resolvedPath = resolveWorkspacePath(workspaceSubdir, config);
        if (!resolvedPath) {
          return res.status(400).json({ error: 'Failed to resolve workspace path securely' });
        }

        // Create the directory if it doesn't exist yet
        await ensureWorkspaceDir(resolvedPath, config.containerBasePath);
      }

      // Update the user record in database
      const updatedUser = await updateUser(id, { workspaceSubdir });
      if (!updatedUser) {
        return res.status(500).json({ error: 'Failed to update user workspace subdirectory' });
      }

      return res.status(200).json({
        userId: id,
        workspaceSubdir: updatedUser.workspaceSubdir ?? null,
        resolvedPath,
      });
    } catch (error) {
      logger.error('[Workspace Admin Handlers] setWorkspace error:', error);
      return res.status(500).json({ error: 'Failed to update user workspace subdirectory' });
    }
  }

  return {
    getWorkspace,
    setWorkspace,
  };
}
