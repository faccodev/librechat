import fs from 'fs';
import path from 'path';
import { isValidObjectIdString, logger, WorkspacePathValidationError, getWorkspaceRoots } from '@librechat/data-schemas';

import type {
  ChatProjectMethods,
  ChatProjectSortBy,
  ChatProjectSortDirection,
  CreateChatProjectInput,
  UpdateChatProjectInput,
} from '@librechat/data-schemas';
import type { Request, Response } from 'express';

const PROJECT_NOT_FOUND = 'Project not found';
const CONVERSATION_NOT_FOUND = 'Conversation not found';

const PROJECT_SORT_FIELDS = new Set<ChatProjectSortBy>(['name', 'createdAt', 'lastConversationAt']);

interface ProjectUser {
  id: string;
  _id?: {
    toString(): string;
  };
}

interface ProjectRequest extends Request {
  user?: ProjectUser;
}

type ProjectHandlerDependencies = Pick<
  ChatProjectMethods,
  | 'listChatProjects'
  | 'createChatProject'
  | 'getChatProject'
  | 'updateChatProject'
  | 'deleteChatProject'
  | 'assignConversationToProject'
>;

const getUserId = (req: ProjectRequest): string => req.user?.id ?? req.user?._id?.toString() ?? '';

const queryString = (value: Request['query'][string]): string | undefined => {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return queryString(value[0]);
  }
  return undefined;
};

const normalizeString = (value: string | null | undefined): string =>
  typeof value === 'string' ? value.trim() : '';

const normalizeLimit = (value: Request['query'][string]): number => {
  const limit = parseInt(queryString(value) ?? '', 10);
  if (!Number.isFinite(limit)) {
    return 25;
  }
  return Math.min(Math.max(limit, 1), 100);
};

const normalizeSortBy = (value: Request['query'][string]): ChatProjectSortBy | undefined => {
  const sortBy = queryString(value);
  return PROJECT_SORT_FIELDS.has(sortBy as ChatProjectSortBy)
    ? (sortBy as ChatProjectSortBy)
    : undefined;
};

const normalizeSortDirection = (
  value: Request['query'][string],
): ChatProjectSortDirection | undefined => {
  const sortDirection = queryString(value);
  return sortDirection === 'asc' || sortDirection === 'desc' ? sortDirection : undefined;
};

const createProjectInput = (req: ProjectRequest): CreateChatProjectInput | null => {
  const name = normalizeString(req.body?.name);
  if (!name) {
    return null;
  }

  return {
    name,
    description: typeof req.body?.description === 'string' ? req.body.description : '',
    /** Accept `null`/`undefined` (no path) or a string. `sanitizeProjectInput`
     *  is the single source of truth for validation (layer 1 of AD-2);
     *  `sanitizeWorkspacePath` runs inside it and throws on bad input. */
    workspacePath:
      typeof req.body?.workspacePath === 'string' ? req.body.workspacePath : null,
  };
};

export function createProjectHandlers(deps: ProjectHandlerDependencies) {
  async function listProjects(req: ProjectRequest, res: Response) {
    try {
      const result = await deps.listChatProjects(getUserId(req), {
        cursor: queryString(req.query.cursor),
        limit: normalizeLimit(req.query.limit),
        sortBy: normalizeSortBy(req.query.sortBy),
        sortDirection: normalizeSortDirection(req.query.sortDirection),
        search: queryString(req.query.search),
      });
      return res.status(200).json(result);
    } catch (error) {
      logger.error('[projects] Error listing projects', error);
      return res.status(500).json({ error: 'Error listing projects' });
    }
  }

  async function createProject(req: ProjectRequest, res: Response) {
    const input = createProjectInput(req);
    if (!input) {
      return res.status(400).json({ error: 'name is required' });
    }

    try {
      const project = await deps.createChatProject(getUserId(req), input);
      return res.status(201).json(project);
    } catch (error) {
      if (error instanceof WorkspacePathValidationError) {
        /** Layer 1 of AD-2: surface validation messages from
         *  `sanitizeWorkspacePath` to the client so the user knows
         *  the path is out of `WORKSPACE_ROOTS`, points outside a
         *  root, etc. — the admin can't fix what the API hides. */
        return res.status(400).json({ error: error.message });
      }
      logger.error('[projects] Error creating project', error);
      return res.status(500).json({ error: 'Error creating project' });
    }
  }

  async function assignConversationToProject(req: ProjectRequest, res: Response) {
    const { conversationId } = req.params;
    const projectId = req.body?.projectId ?? null;

    if (projectId !== null && typeof projectId !== 'string') {
      return res.status(400).json({ error: 'projectId must be a string or null' });
    }

    try {
      const result = await deps.assignConversationToProject(
        getUserId(req),
        conversationId,
        projectId,
      );
      if (!result) {
        return res.status(404).json({ error: CONVERSATION_NOT_FOUND });
      }
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error && error.message === PROJECT_NOT_FOUND) {
        return res.status(404).json({ error: PROJECT_NOT_FOUND });
      }
      logger.error('[projects] Error assigning conversation to project', error);
      return res.status(500).json({ error: 'Error assigning conversation to project' });
    }
  }

  async function getProject(req: ProjectRequest, res: Response) {
    const { projectId } = req.params;
    if (!isValidObjectIdString(projectId)) {
      return res.status(404).json({ error: PROJECT_NOT_FOUND });
    }

    try {
      const project = await deps.getChatProject(getUserId(req), projectId);
      if (!project) {
        return res.status(404).json({ error: PROJECT_NOT_FOUND });
      }
      return res.status(200).json(project);
    } catch (error) {
      logger.error('[projects] Error getting project', error);
      return res.status(500).json({ error: 'Error getting project' });
    }
  }

  async function updateProject(req: ProjectRequest, res: Response) {
    const { projectId } = req.params;
    if (!isValidObjectIdString(projectId)) {
      return res.status(404).json({ error: PROJECT_NOT_FOUND });
    }

    const input: UpdateChatProjectInput = {};
    if (req.body?.name !== undefined) {
      const name = normalizeString(req.body.name);
      if (!name) {
        return res.status(400).json({ error: 'name is required' });
      }
      input.name = name;
    }
    if (req.body?.description !== undefined) {
      input.description = typeof req.body.description === 'string' ? req.body.description : '';
    }
    if (req.body?.workspacePath !== undefined) {
      /** `null` or empty string clears the path. `sanitizeProjectInput`
       *  normalises empty → `null` so the DB stores an explicit `null`
       *  rather than a whitespace-only string. Validation lives in
       *  `sanitizeWorkspacePath` (layer 1 of AD-2). */
      input.workspacePath =
        typeof req.body.workspacePath === 'string' ? req.body.workspacePath : null;
    }

    try {
      const project = await deps.updateChatProject(getUserId(req), projectId, input);
      if (!project) {
        return res.status(404).json({ error: PROJECT_NOT_FOUND });
      }
      return res.status(200).json(project);
    } catch (error) {
      if (error instanceof WorkspacePathValidationError) {
        return res.status(400).json({ error: error.message });
      }
      logger.error('[projects] Error updating project', error);
      return res.status(500).json({ error: 'Error updating project' });
    }
  }

  async function deleteProject(req: ProjectRequest, res: Response) {
    const { projectId } = req.params;
    if (!isValidObjectIdString(projectId)) {
      return res.status(404).json({ error: PROJECT_NOT_FOUND });
    }

    try {
      const result = await deps.deleteChatProject(getUserId(req), projectId);
      if (!result.deletedCount) {
        return res.status(404).json({ error: PROJECT_NOT_FOUND });
      }
      return res.status(200).json(result);
    } catch (error) {
      logger.error('[projects] Error deleting project', error);
      return res.status(500).json({ error: 'Error deleting project' });
    }
  }

  async function listAvailableWorkspaces(req: ProjectRequest, res: Response) {
    try {
      const roots = getWorkspaceRoots();
      const browsePath = queryString(req.query['path']);

      // If a specific path was requested, validate it is under a known root
      // and list its children (enables file-browser navigation).
      if (browsePath) {
        const normalized = path.normalize(browsePath).replace(/\\/g, '/');
        const isUnderRoot = roots.some((root) => {
          const normalizedRoot = path.normalize(root).replace(/\\/g, '/');
          return normalized === normalizedRoot || normalized.startsWith(normalizedRoot + '/');
        });

        if (!isUnderRoot) {
          return res.status(403).json({ error: 'Path is outside allowed workspace roots' });
        }

        let entries: fs.Dirent[];
        try {
          entries = await fs.promises.readdir(normalized, { withFileTypes: true });
        } catch (err) {
          return res.status(404).json({ error: `Cannot read directory: ${(err as Error).message}` });
        }

        const workspaces = entries
          .filter((e) => e.isDirectory())
          .map((e) => ({
            path: `${normalized}/${e.name}`,
            label: e.name,
          }));

        return res.status(200).json({ workspaces, currentPath: normalized });
      }

      // Default: return one level of subdirectories under each root
      const workspaces: { path: string; label: string }[] = [];
      for (const root of roots) {
        try {
          const entries = await fs.promises.readdir(root, { withFileTypes: true });
          for (const entry of entries) {
            if (entry.isDirectory()) {
              const fullPath = path.join(root, entry.name);
              const normalizedPath = fullPath.replace(/\\/g, '/');
              workspaces.push({
                path: normalizedPath,
                label: entry.name,
              });
            }
          }
        } catch (err) {
          logger.warn(`[projects] Failed to read workspace root "${root}": ${(err as Error).message}`);
        }
      }

      return res.status(200).json({ workspaces });
    } catch (error) {
      logger.error('[projects] Error listing available workspaces', error);
      return res.status(500).json({ error: 'Error listing available workspaces' });
    }
  }

  return {
    listProjects,
    createProject,
    assignConversationToProject,
    getProject,
    updateProject,
    deleteProject,
    listAvailableWorkspaces,
  };
}
