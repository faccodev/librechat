jest.mock('@librechat/data-schemas', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn(), debug: jest.fn() },
}));

const {
  isWorkspaceAwareServer,
  buildWorkspaceHint,
  patchToolDescription,
  patchToolDefinitions,
  WORKSPACE_AWARE_MCP_SERVERS,
} = require('./workspaceAwareTools');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('isWorkspaceAwareServer', () => {
  it.each(['workspace', 'transcribe'])('recognizes "%s" as workspace-aware', (name) => {
    expect(isWorkspaceAwareServer(name)).toBe(true);
  });

  it('recognizes the per-user ws_<userId> auto-spawned server', () => {
    expect(isWorkspaceAwareServer('ws_user-1')).toBe(true);
    expect(isWorkspaceAwareServer('ws_abc123')).toBe(true);
  });

  it.each(['puppeteer', 'browser', 'search', 'drive', 'everything', undefined, null, ''])(
    'does NOT augment "%s"',
    (name) => {
      expect(isWorkspaceAwareServer(name)).toBe(false);
    },
  );

  it('exposes the configured set', () => {
    expect(WORKSPACE_AWARE_MCP_SERVERS.has('workspace')).toBe(true);
    expect(WORKSPACE_AWARE_MCP_SERVERS.has('transcribe')).toBe(true);
    // `filesystem` was removed in the rename to `workspace` (PR 1). The
    // upstream `@modelcontextprotocol/server-filesystem` is being phased out
    // in PR 4; for now it should no longer be matched.
    expect(WORKSPACE_AWARE_MCP_SERVERS.has('filesystem')).toBe(false);
    expect(WORKSPACE_AWARE_MCP_SERVERS.has('code-runner')).toBe(false);
  });
});

describe('buildWorkspaceHint', () => {
  it('includes the resolved sandbox root when provided', () => {
    const hint = buildWorkspaceHint({
      workspaceSubdir: 'alice',
      workspacePath: '/workspaces/alice',
      serverName: 'workspace',
    });
    expect(hint).toContain('Sandbox root: /workspaces/alice');
    expect(hint).toContain('workspaceSubdir: "alice"');
    expect(hint).toContain('MCP server: workspace');
  });

  it('falls back to /workspaces/<subdir> when no resolved path is given', () => {
    const hint = buildWorkspaceHint({ workspaceSubdir: 'bob', serverName: 'workspace' });
    expect(hint).toContain('Sandbox root: /workspaces/bob');
    expect(hint).toContain('MCP server: workspace');
  });

  it('tells the agent to pass paths verbatim and not to escape Unicode', () => {
    const hint = buildWorkspaceHint({ workspaceSubdir: 'alice' });
    expect(hint).toMatch(/VERBATIM/);
    expect(hint).toContain('á');
    expect(hint).toContain('ç');
    expect(hint).toContain('文档');
    expect(hint).toContain('📁');
    expect(hint).toContain('NOT');
  });

  it('handles a null workspaceSubdir gracefully (user has no workspace configured)', () => {
    const hint = buildWorkspaceHint({ workspaceSubdir: null });
    expect(hint).toContain('workspaceSubdir: null');
    expect(hint).toContain('Sandbox root: /workspaces/');
  });
});

describe('patchToolDescription', () => {
  it('appends the hint to a tool with no existing context marker', () => {
    const tool = { description: 'Read a file at the given path.', schema: {} };
    patchToolDescription(tool, {
      user: { workspaceSubdir: 'alice' },
      workspacePath: '/workspaces/alice',
    });
    expect(tool.description).toMatch(/^Read a file at the given path\./);
    expect(tool.description).toContain('[Workspace context]');
    expect(tool.description).toContain('Sandbox root: /workspaces/alice');
  });

  it('is idempotent — does not double-append on a second call', () => {
    const tool = { description: 'Read a file.', schema: {} };
    const ctx = { user: { workspaceSubdir: 'alice' } };
    patchToolDescription(tool, ctx);
    const once = tool.description;
    patchToolDescription(tool, ctx);
    expect(tool.description).toBe(once);
  });

  it('leaves a tool without a description alone', () => {
    const tool = { schema: {} };
    patchToolDescription(tool, { user: { workspaceSubdir: 'alice' } });
    expect(tool.description).toBeUndefined();
  });

  it('returns the same object so callers can chain', () => {
    const tool = { description: 'x', schema: {} };
    const result = patchToolDescription(tool, { user: { workspaceSubdir: 'alice' } });
    expect(result).toBe(tool);
  });
});

describe('patchToolDefinitions', () => {
  it('patches every tool whose server is workspace-aware', () => {
    const tools = {
      workspace__read_file: { description: 'Read a file.', schema: {} },
      workspace__list_dir: { description: 'List directory.', schema: {} },
      workspace__run_code: { description: 'Run code.', schema: {} },
    };
    const serverNameFor = (name) => name.split('__')[0];
    patchToolDefinitions(
      tools,
      { user: { workspaceSubdir: 'alice' }, workspacePath: '/workspaces/alice' },
      serverNameFor,
    );
    expect(tools['workspace__read_file'].description).toContain('[Workspace context]');
    expect(tools['workspace__list_dir'].description).toContain('[Workspace context]');
    expect(tools['workspace__run_code'].description).toContain('[Workspace context]');
  });

  it('skips tools whose server is not in the workspace-aware set', () => {
    const tools = {
      puppeteer__screenshot: { description: 'Take a screenshot.', schema: {} },
      workspace__read_file: { description: 'Read a file.', schema: {} },
    };
    const serverNameFor = (name) => name.split('__')[0];
    patchToolDefinitions(tools, { user: { workspaceSubdir: 'alice' } }, serverNameFor);
    expect(tools['puppeteer__screenshot'].description).toBe('Take a screenshot.');
    expect(tools['workspace__read_file'].description).toContain('[Workspace context]');
  });

  it('handles a null tool map without throwing', () => {
    expect(patchToolDefinitions(null, {})).toBeNull();
    expect(patchToolDefinitions(undefined, {})).toBeUndefined();
  });
});
