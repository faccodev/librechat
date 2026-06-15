jest.mock('@librechat/data-schemas', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn(), debug: jest.fn() },
}));

jest.mock('~/server/utils/workspaceAwareTools', () => ({
  patchToolDescription: jest.fn(),
}));

jest.mock('~/server/services/Config/loadCustomConfig', () => () => ({}));

jest.mock('@librechat/api', () => ({
  getWorkspaceConfig: jest.fn().mockReturnValue({
    enabled: true,
    containerBasePath: '/workspaces',
    sizeLimitMB: 100,
  }),
  resolveWorkspacePath: jest.fn((subdir) =>
    subdir ? `/workspaces/${subdir}` : '/workspaces',
  ),
}));

const applyWorkspaceContextToTools = require('../../utils/applyWorkspaceContextToTools');
const { patchToolDescription } = require('~/server/utils/workspaceAwareTools');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('applyWorkspaceContextToTools', () => {
  it('returns the input array unchanged when it is not an array', () => {
    const req = { user: { workspaceSubdir: 'alice' } };
    expect(applyWorkspaceContextToTools(null, req)).toBeNull();
    expect(applyWorkspaceContextToTools(undefined, req)).toBeUndefined();
  });

  it('returns the input array unchanged when the request has no user', () => {
    const defs = [{ name: 'read_file', description: 'Read a file.' }];
    const result = applyWorkspaceContextToTools(defs, {});
    expect(result).toBe(defs);
    expect(patchToolDescription).not.toHaveBeenCalled();
  });

  it('skips tool definitions without a description', () => {
    const defs = [{ name: 'no_description' }, { name: 'has_description', description: 'Read a file.' }];
    applyWorkspaceContextToTools(defs, { user: { workspaceSubdir: 'alice' } });
    expect(patchToolDescription).toHaveBeenCalledTimes(1);
    expect(patchToolDescription).toHaveBeenCalledWith(
      defs[1],
      expect.objectContaining({
        user: { workspaceSubdir: 'alice' },
        workspacePath: '/workspaces/alice',
      }),
    );
  });

  it('passes the resolved workspace path to the patcher', () => {
    const defs = [{ name: 'read_file', description: 'Read a file.' }];
    applyWorkspaceContextToTools(defs, {
      user: { workspaceSubdir: 'Minha Pasta' },
      config: {},
    });
    expect(patchToolDescription).toHaveBeenCalledWith(
      expect.any(Object),
      expect.objectContaining({
        workspacePath: '/workspaces/Minha Pasta',
      }),
    );
  });

  it('falls back gracefully when the custom config cannot be loaded', () => {
    const api = require('@librechat/api');
    api.getWorkspaceConfig.mockImplementationOnce(() => {
      throw new Error('config not available');
    });
    const defs = [{ name: 'read_file', description: 'Read a file.' }];
    expect(() =>
      applyWorkspaceContextToTools(defs, { user: { workspaceSubdir: 'alice' } }),
    ).not.toThrow();
    expect(patchToolDescription).toHaveBeenCalledWith(
      defs[0],
      expect.objectContaining({ workspacePath: null }),
    );
  });

  it('isolates a failing tool patch from the rest of the array', () => {
    patchToolDescription.mockImplementation(() => {
      throw new Error('boom');
    });
    const defs = [
      { name: 'a', description: 'a' },
      { name: 'b', description: 'b' },
    ];
    expect(() =>
      applyWorkspaceContextToTools(defs, { user: { workspaceSubdir: 'alice' } }),
    ).not.toThrow();
    expect(patchToolDescription).toHaveBeenCalledTimes(2);
  });
});
