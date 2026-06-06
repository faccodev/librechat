import type { Response } from 'express';
import type { ServerRequest } from '~/types/http';
import { createWorkspaceAdminHandlers } from './handlers';
import type { WorkspaceAdminDeps } from './handlers';
import type { WorkspaceConfig } from './config';
import type { IUser } from '@librechat/data-schemas';

// Mock the dependencies/services that handlers call
jest.mock('./service', () => ({
  validateWorkspaceSubdir: jest.fn((subdir: string) => {
    if (subdir === 'invalid') {
      return { valid: false, error: 'Invalid workspace subdirectory' };
    }
    return { valid: true };
  }),
  resolveWorkspacePath: jest.fn((subdir: string | null | undefined, config: WorkspaceConfig) => {
    if (subdir === 'unsafe') {
      return null;
    }
    if (subdir) {
      return `${config.containerBasePath}/${subdir}`;
    }
    return config.enabled ? config.containerBasePath : null;
  }),
  ensureWorkspaceDir: jest.fn().mockResolvedValue(undefined),
}));

describe('Workspace Admin Handlers', () => {
  let mockDeps: jest.Mocked<WorkspaceAdminDeps>;
  let mockReq: any;
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    mockRes = {
      status: statusMock,
    };

    mockDeps = {
      findUsers: jest.fn(),
      updateUser: jest.fn(),
      getWorkspaceConfig: jest.fn().mockReturnValue({
        enabled: true,
        containerBasePath: '/workspaces',
        sizeLimitMB: 100,
      }),
    };
  });

  describe('getWorkspace', () => {
    it('should return 400 if user ID is missing', async () => {
      mockReq = { params: {} };
      const handlers = createWorkspaceAdminHandlers(mockDeps);
      await handlers.getWorkspace(mockReq as ServerRequest, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'User ID is required' });
    });

    it('should return 404 if user is not found', async () => {
      mockReq = { params: { id: 'nonexistent' } };
      mockDeps.findUsers.mockResolvedValue([]);
      const handlers = createWorkspaceAdminHandlers(mockDeps);
      await handlers.getWorkspace(mockReq as ServerRequest, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return workspace details for a valid user', async () => {
      mockReq = { params: { id: 'user123' } };
      const mockUser = {
        id: 'user123',
        workspaceSubdir: 'alice',
      } as unknown as IUser;
      mockDeps.findUsers.mockResolvedValue([mockUser]);

      const handlers = createWorkspaceAdminHandlers(mockDeps);
      await handlers.getWorkspace(mockReq as ServerRequest, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        userId: 'user123',
        workspaceSubdir: 'alice',
        resolvedPath: '/workspaces/alice',
        enabled: true,
      });
    });

    it('should return root path for a user with no subdir when workspaces enabled', async () => {
      mockReq = { params: { id: 'user123' } };
      const mockUser = {
        id: 'user123',
        workspaceSubdir: null,
      } as unknown as IUser;
      mockDeps.findUsers.mockResolvedValue([mockUser]);

      const handlers = createWorkspaceAdminHandlers(mockDeps);
      await handlers.getWorkspace(mockReq as ServerRequest, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        userId: 'user123',
        workspaceSubdir: null,
        resolvedPath: '/workspaces',
        enabled: true,
      });
    });
  });

  describe('setWorkspace', () => {
    it('should return 400 if user ID is missing', async () => {
      mockReq = { params: {}, body: { workspaceSubdir: 'alice' } };
      const handlers = createWorkspaceAdminHandlers(mockDeps);
      await handlers.setWorkspace(mockReq as ServerRequest, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'User ID is required' });
    });

    it('should return 400 if workspaces are disabled and input subdir is not null', async () => {
      mockReq = { params: { id: 'user123' }, body: { workspaceSubdir: 'alice' } };
      mockDeps.getWorkspaceConfig.mockReturnValue({
        enabled: false,
        containerBasePath: '/workspaces',
        sizeLimitMB: 100,
      });

      const handlers = createWorkspaceAdminHandlers(mockDeps);
      await handlers.setWorkspace(mockReq as ServerRequest, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({
        error: 'Workspaces are currently disabled in configuration',
      });
    });

    it('should return 404 if user is not found', async () => {
      mockReq = { params: { id: 'nonexistent' }, body: { workspaceSubdir: 'alice' } };
      mockDeps.findUsers.mockResolvedValue([]);
      const handlers = createWorkspaceAdminHandlers(mockDeps);
      await handlers.setWorkspace(mockReq as ServerRequest, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return 400 if subdir is invalid', async () => {
      mockReq = { params: { id: 'user123' }, body: { workspaceSubdir: 'invalid' } };
      const mockUser = { id: 'user123' } as unknown as IUser;
      mockDeps.findUsers.mockResolvedValue([mockUser]);

      const handlers = createWorkspaceAdminHandlers(mockDeps);
      await handlers.setWorkspace(mockReq as ServerRequest, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Invalid workspace subdirectory' });
    });

    it('should update user workspace subdir to null successfully', async () => {
      mockReq = { params: { id: 'user123' }, body: { workspaceSubdir: null } };
      const mockUser = { id: 'user123', workspaceSubdir: 'alice' } as unknown as IUser;
      mockDeps.findUsers.mockResolvedValue([mockUser]);
      mockDeps.updateUser.mockResolvedValue({ id: 'user123', workspaceSubdir: null } as unknown as IUser);

      const handlers = createWorkspaceAdminHandlers(mockDeps);
      await handlers.setWorkspace(mockReq as ServerRequest, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        userId: 'user123',
        workspaceSubdir: null,
        resolvedPath: null,
      });
      expect(mockDeps.updateUser).toHaveBeenCalledWith('user123', { workspaceSubdir: null });
    });

    it('should create directory and update workspace subdir for valid inputs', async () => {
      mockReq = { params: { id: 'user123' }, body: { workspaceSubdir: 'alice' } };
      const mockUser = { id: 'user123' } as unknown as IUser;
      mockDeps.findUsers.mockResolvedValue([mockUser]);
      mockDeps.updateUser.mockResolvedValue({ id: 'user123', workspaceSubdir: 'alice' } as unknown as IUser);

      const handlers = createWorkspaceAdminHandlers(mockDeps);
      await handlers.setWorkspace(mockReq as ServerRequest, mockRes as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        userId: 'user123',
        workspaceSubdir: 'alice',
        resolvedPath: '/workspaces/alice',
      });
      expect(mockDeps.updateUser).toHaveBeenCalledWith('user123', { workspaceSubdir: 'alice' });
    });
  });
});
