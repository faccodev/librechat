import { WorkspacePathValidationError } from '@librechat/data-schemas';
import { createProjectHandlers } from './handlers';
import type { ChatProjectMethods } from '@librechat/data-schemas';

type HandlerReq = Parameters<
  ReturnType<typeof createProjectHandlers>['createProject']
>[0];
type HandlerRes = Parameters<
  ReturnType<typeof createProjectHandlers>['createProject']
>[1];

const buildReq = (
  body: Record<string, unknown>,
  userId = 'user-1',
  params: Record<string, string> = {},
): HandlerReq =>
  ({
    user: { id: userId },
    body,
    params,
  }) as unknown as HandlerReq;

const buildRes = (): HandlerRes & { body: unknown; statusCode: number } => {
  const res = {
    statusCode: 200,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
  };
  return res as unknown as HandlerRes & { body: unknown; statusCode: number };
};

const buildDeps = (overrides: Partial<ChatProjectMethods> = {}): ChatProjectMethods =>
  ({
    listChatProjects: jest.fn(),
    createChatProject: jest.fn(),
    getChatProject: jest.fn(),
    updateChatProject: jest.fn(),
    deleteChatProject: jest.fn(),
    assignConversationToProject: jest.fn(),
    ...overrides,
  }) as unknown as ChatProjectMethods;

describe('createProjectHandlers — workspacePath', () => {
  describe('createProject', () => {
    it('forwards a valid workspacePath through to the methods layer', async () => {
      const created = { _id: 'p1', name: 'demo', workspacePath: '/workspaces/demo' };
      const deps = buildDeps({
        createChatProject: jest.fn().mockResolvedValue(created),
      });
      const handlers = createProjectHandlers(deps);
      const req = buildReq({ name: 'demo', workspacePath: '/workspaces/demo' });
      const res = buildRes();

      await handlers.createProject(req, res);

      expect(deps.createChatProject).toHaveBeenCalledWith('user-1', {
        name: 'demo',
        description: '',
        workspacePath: '/workspaces/demo',
      });
      expect(res.statusCode).toBe(201);
    });

    it('treats missing workspacePath as null (no path)', async () => {
      const created = { _id: 'p1', name: 'demo' };
      const deps = buildDeps({
        createChatProject: jest.fn().mockResolvedValue(created),
      });
      const handlers = createProjectHandlers(deps);
      const req = buildReq({ name: 'demo' });
      const res = buildRes();

      await handlers.createProject(req, res);

      expect(deps.createChatProject).toHaveBeenCalledWith('user-1', {
        name: 'demo',
        description: '',
        workspacePath: null,
      });
    });

    it('returns 400 with the validation message when sanitizeProjectInput rejects the path', async () => {
      const deps = buildDeps({
        createChatProject: jest
          .fn()
          .mockRejectedValue(
            new WorkspacePathValidationError(
              'workspacePath must be inside one of WORKSPACE_ROOTS: /workspaces',
            ),
          ),
      });
      const handlers = createProjectHandlers(deps);
      const req = buildReq({ name: 'demo', workspacePath: '/etc/passwd' });
      const res = buildRes();

      await handlers.createProject(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error:
          'workspacePath must be inside one of WORKSPACE_ROOTS: /workspaces',
      });
    });

    it('returns 500 for non-validation errors (so DB outages are visible)', async () => {
      const deps = buildDeps({
        createChatProject: jest.fn().mockRejectedValue(new Error('mongo down')),
      });
      const handlers = createProjectHandlers(deps);
      const req = buildReq({ name: 'demo', workspacePath: '/workspaces/demo' });
      const res = buildRes();

      await handlers.createProject(req, res);

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Error creating project' });
    });
  });

  describe('updateProject', () => {
    const projectId = '64f0000000000000000000aa';

    it('forwards a valid workspacePath to updateChatProject', async () => {
      const updated = { _id: projectId, name: 'demo', workspacePath: '/workspaces/new' };
      const deps = buildDeps({
        updateChatProject: jest.fn().mockResolvedValue(updated),
      });
      const handlers = createProjectHandlers(deps);
      const req = buildReq({ workspacePath: '/workspaces/new' }, 'user-1', { projectId });
      const res = buildRes();

      await handlers.updateProject(req, res);

      expect(deps.updateChatProject).toHaveBeenCalledWith('user-1', projectId, {
        workspacePath: '/workspaces/new',
      });
      expect(res.statusCode).toBe(200);
    });

    it('forwards null to clear the path', async () => {
      const updated = { _id: projectId, name: 'demo', workspacePath: null };
      const deps = buildDeps({
        updateChatProject: jest.fn().mockResolvedValue(updated),
      });
      const handlers = createProjectHandlers(deps);
      const req = buildReq({ workspacePath: null }, 'user-1', { projectId });
      const res = buildRes();

      await handlers.updateProject(req, res);

      expect(deps.updateChatProject).toHaveBeenCalledWith('user-1', projectId, {
        workspacePath: null,
      });
    });

    it('omits workspacePath from the update when the field is not in the body', async () => {
      const updated = { _id: projectId, name: 'demo' };
      const deps = buildDeps({
        updateChatProject: jest.fn().mockResolvedValue(updated),
      });
      const handlers = createProjectHandlers(deps);
      const req = buildReq({ description: 'updated' }, 'user-1', { projectId });
      const res = buildRes();

      await handlers.updateProject(req, res);

      expect(deps.updateChatProject).toHaveBeenCalledWith('user-1', projectId, {
        description: 'updated',
      });
    });

    it('returns 400 when the new path fails sanitizeWorkspacePath', async () => {
      const deps = buildDeps({
        updateChatProject: jest
          .fn()
          .mockRejectedValue(
            new WorkspacePathValidationError(
              'workspacePath escapes WORKSPACE_ROOTS (../)',
            ),
          ),
      });
      const handlers = createProjectHandlers(deps);
      const req = buildReq({ workspacePath: '/workspaces/../etc' }, 'user-1', { projectId });
      const res = buildRes();

      await handlers.updateProject(req, res);

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        error: 'workspacePath escapes WORKSPACE_ROOTS (../)',
      });
    });
  });
});
