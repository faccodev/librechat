import fs from 'fs';
import path from 'path';
import {
  validateWorkspaceSubdir,
  isPathSafe,
  resolveWorkspacePath,
  ensureWorkspaceDir,
} from './service';
import type { WorkspaceConfig } from './config';

jest.mock('fs', () => {
  const actualFs = jest.requireActual('fs');
  return {
    ...actualFs,
    promises: {
      ...actualFs.promises,
      mkdir: jest.fn().mockResolvedValue(undefined),
    },
  };
});

describe('Workspace Service', () => {
  describe('validateWorkspaceSubdir', () => {
    it('should reject empty or null subdirectories', () => {
      expect(validateWorkspaceSubdir('')).toEqual({
        valid: false,
        error: 'Workspace subdirectory cannot be empty',
      });
    });

    it('should reject extremely long subdirectories', () => {
      const longSubdir = 'a'.repeat(513);
      expect(validateWorkspaceSubdir(longSubdir)).toEqual({
        valid: false,
        error: 'Workspace subdirectory exceeds 512 characters',
      });
    });

    it('should reject relative path traversal components', () => {
      expect(validateWorkspaceSubdir('..')).toEqual({
        valid: false,
        error: 'Path traversal or relative components are not allowed',
      });
      expect(validateWorkspaceSubdir('alice/../bob')).toEqual({
        valid: false,
        error: 'Path traversal or relative components are not allowed',
      });
      expect(validateWorkspaceSubdir('alice/.')).toEqual({
        valid: false,
        error: 'Path traversal or relative components are not allowed',
      });
    });

    it('should reject invalid characters', () => {
      expect(validateWorkspaceSubdir('alice:workspace')).toEqual({
        valid: false,
        error: 'Subdirectory contains invalid characters. Only alphanumeric, -, _, and / are allowed',
      });
      expect(validateWorkspaceSubdir('alice*bob')).toEqual({
        valid: false,
        error: 'Subdirectory contains invalid characters. Only alphanumeric, -, _, and / are allowed',
      });
    });

    it('should reject leading or trailing slashes', () => {
      expect(validateWorkspaceSubdir('/alice')).toEqual({
        valid: false,
        error: 'Subdirectory cannot start or end with a slash',
      });
      expect(validateWorkspaceSubdir('alice/')).toEqual({
        valid: false,
        error: 'Subdirectory cannot start or end with a slash',
      });
    });

    it('should accept valid subdirectories and nested paths', () => {
      expect(validateWorkspaceSubdir('alice')).toEqual({ valid: true });
      expect(validateWorkspaceSubdir('clients/bob-123_test')).toEqual({ valid: true });
    });
  });

  describe('isPathSafe', () => {
    const basePath = '/workspaces';

    it('should return true for paths inside the base directory', () => {
      expect(isPathSafe('/workspaces/alice', basePath)).toBe(true);
      expect(isPathSafe('/workspaces/clients/bob', basePath)).toBe(true);
    });

    it('should return false for paths outside the base directory', () => {
      expect(isPathSafe('/etc/passwd', basePath)).toBe(false);
      expect(isPathSafe('/workspaces/../etc', basePath)).toBe(false);
      expect(isPathSafe('/workspacess', basePath)).toBe(false);
    });
  });

  describe('resolveWorkspacePath', () => {
    const config: WorkspaceConfig = {
      enabled: true,
      containerBasePath: '/workspaces',
      sizeLimitMB: 100,
    };

    it('should return null if disabled', () => {
      const disabledConfig = { ...config, enabled: false };
      expect(resolveWorkspacePath('alice', disabledConfig)).toBeNull();
    });

    it('should return null for empty subdir', () => {
      expect(resolveWorkspacePath('', config)).toBeNull();
      expect(resolveWorkspacePath(null, config)).toBeNull();
    });

    it('should return null for invalid subdir', () => {
      expect(resolveWorkspacePath('../alice', config)).toBeNull();
    });

    it('should resolve valid path', () => {
      const resolved = resolveWorkspacePath('alice', config);
      expect(resolved).toBe(path.resolve('/workspaces/alice'));
    });
  });

  describe('ensureWorkspaceDir', () => {
    const basePath = '/workspaces';

    it('should create directories for safe paths', async () => {
      const safePath = path.resolve('/workspaces/alice');
      await expect(ensureWorkspaceDir(safePath, basePath)).resolves.not.toThrow();
      expect(fs.promises.mkdir).toHaveBeenCalledWith(safePath, { recursive: true });
    });

    it('should throw error for unsafe paths', async () => {
      const unsafePath = path.resolve('/etc/passwd');
      await expect(ensureWorkspaceDir(unsafePath, basePath)).rejects.toThrow(
        'Unsafe workspace path attempt',
      );
    });
  });
});
