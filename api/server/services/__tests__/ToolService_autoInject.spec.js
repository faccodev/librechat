jest.mock('@librechat/data-schemas', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn(), debug: jest.fn() },
}));

jest.mock('~/server/utils/workspaceAwareTools', () => ({
  patchToolDescription: jest.fn(),
}));

jest.mock('~/server/services/Config/loadCustomConfig', () => () => ({}));

const mockGetMCPServerTools = jest.fn();
const mockGetCachedTools = jest.fn();
const mockGetEndpointsConfig = jest.fn();
const mockLoadToolDefinitions = jest.fn();
const mockGetUserMCPAuthMap = jest.fn();
const mockLoadToolsUtil = jest.fn();
const mockResolveConfigServers = jest.fn();
const mockUserCanUseMCPServers = jest.fn().mockResolvedValue(true);

jest.mock('~/server/services/Config', () => ({
  getMCPServerTools: (...args) => mockGetMCPServerTools(...args),
  getCachedTools: (...args) => mockGetCachedTools(...args),
  getEndpointsConfig: (...args) => mockGetEndpointsConfig(...args),
}));
jest.mock('@librechat/api', () => ({
  loadToolDefinitions: (...args) => mockLoadToolDefinitions(...args),
  getUserMCPAuthMap: (...args) => mockGetUserMCPAuthMap(...args),
  buildToolClassification: jest.fn().mockResolvedValue({
    toolRegistry: new Map(),
    toolDefinitions: [],
    additionalTools: [],
    hasDeferredTools: false,
  }),
  createEndpointsConfigService: () => ({
    getEndpointsConfig: (...args) => mockGetEndpointsConfig(...args),
    checkCapability: () => true,
  }),
}));
jest.mock('~/app/clients/tools/util', () => ({
  loadTools: (...args) => mockLoadToolsUtil(...args),
}));
jest.mock('~/app/clients/tools/util/fileSearch', () => ({
  primeFiles: jest.fn().mockResolvedValue({}),
}));
jest.mock('~/server/services/Files/Code/process', () => ({
  primeFiles: jest.fn().mockResolvedValue({}),
}));
jest.mock('~/server/services/Tools/search', () => ({
  createOnSearchResults: jest.fn(),
}));
jest.mock('~/server/services/Tools/mcp', () => ({
  reinitMCPServer: jest.fn(),
}));
jest.mock('~/server/services/Tools/credentials', () => ({
  loadAuthValues: jest.fn().mockResolvedValue({}),
}));
jest.mock('~/server/services/Files/process', () => ({
  processFileURL: jest.fn(),
  uploadImageBuffer: jest.fn(),
}));
jest.mock('../ActionService', () => ({
  loadActionSets: jest.fn().mockResolvedValue([]),
  decryptMetadata: jest.fn(),
  createActionTool: jest.fn(),
  domainParser: jest.fn(),
  legacyDomainEncode: jest.fn(),
}));
jest.mock('~/server/services/Threads', () => ({
  recordUsage: jest.fn(),
}));
jest.mock('~/models', () => ({
  findPluginAuthsByKeys: jest.fn(),
}));
jest.mock('~/config', () => ({
  getFlowStateManager: jest.fn(() => ({})),
  getMCPServersRegistry: jest.fn(() => ({
    getServerConfig: jest.fn().mockResolvedValue(undefined),
  })),
}));
jest.mock('~/server/services/MCP', () => ({
  resolveConfigServers: (...args) => mockResolveConfigServers(...args),
  resolveAllMcpConfigs: jest.fn().mockResolvedValue({}),
  createMCPPermissionContext: jest.fn(() => ({
    canUseServers: (user) => mockUserCanUseMCPServers(user),
  })),
  userCanUseMCPServers: mockUserCanUseMCPServers,
}));
jest.mock('~/cache', () => ({
  getLogStores: jest.fn(() => ({})),
}));

const { Constants, EModelEndpoint, AgentCapabilities } = require('librechat-data-provider');
const { loadAgentTools } = require('../ToolService');

const mcpDelimiter = Constants.mcp_delimiter;
const mcpAll = Constants.mcp_all;

function makeReq({ userId = 'user_123', workspaceSubdir, mcpServers = {} } = {}) {
  return {
    user: userId ? { id: userId, workspaceSubdir } : undefined,
    config: {
      mcpServers,
      endpoints: {
        [EModelEndpoint.agents]: {
          capabilities: [
            AgentCapabilities.tools,
            AgentCapabilities.actions,
            AgentCapabilities.web_search,
          ],
        },
      },
    },
  };
}

function makeAgent(tools = [], autoTools = false) {
  return { id: 'agent_1', tools, autoTools };
}

function makeEndpointConfig() {
  return {
    [EModelEndpoint.agents]: {
      capabilities: [
        AgentCapabilities.tools,
        AgentCapabilities.actions,
        AgentCapabilities.web_search,
      ],
    },
  };
}

beforeEach(() => {
  jest.clearAllMocks();
  mockGetMCPServerTools.mockResolvedValue(null);
  mockGetCachedTools.mockResolvedValue(null);
  mockGetEndpointsConfig.mockResolvedValue(makeEndpointConfig());
  mockLoadToolDefinitions.mockResolvedValue({
    toolDefinitions: [],
    toolRegistry: new Map(),
    hasDeferredTools: false,
  });
  mockLoadToolsUtil.mockResolvedValue({ loadedTools: [], toolContextMap: {} });
  mockGetUserMCPAuthMap.mockResolvedValue({});
  mockResolveConfigServers.mockResolvedValue({});
  mockUserCanUseMCPServers.mockResolvedValue(true);
});

describe('loadAgentTools â€” auto-inject MCP servers', () => {
  it('does not crash when no MCP servers are configured', async () => {
    const req = makeReq();
    const agent = makeAgent(['placeholder_tool'], true);
    const result = await loadAgentTools({
      req,
      res: {},
      agent,
      streamId: 's1',
    });
    expect(result).toBeDefined();
  });

  it('skips servers without autoInject=true', async () => {
    mockGetMCPServerTools.mockResolvedValue({
      regular__foo: { type: 'function', function: { name: 'regular__foo' } },
    });
    const req = makeReq({
      mcpServers: {
        regular: { type: 'streamable-http', url: 'http://regular:9000/mcp' },
      },
    });
    const agent = makeAgent(['placeholder_tool'], true);
    await loadAgentTools({ req, res: {}, agent, streamId: 's1', definitionsOnly: false });
    expect(mockGetMCPServerTools).not.toHaveBeenCalled();
  });

  it('injects cached tools from a server with autoInject=true', async () => {
    mockGetMCPServerTools.mockImplementation(async (userId, serverName) => {
      if (serverName === 'browser') {
        return {
          [`browser_navigate${mcpDelimiter}browser`]: {
            type: 'function',
            function: { name: `browser_navigate${mcpDelimiter}browser` },
          },
        };
      }
      return null;
    });
    const req = makeReq({
      mcpServers: {
        browser: { type: 'streamable-http', url: 'http://browser:8931/mcp', autoInject: true },
        search: { type: 'streamable-http', url: 'http://search:8933/mcp', autoInject: true },
      },
    });
    const agent = makeAgent(['placeholder_tool'], true);
    await loadAgentTools({
      req,
      res: {},
      agent,
      streamId: 's1',
      definitionsOnly: false,
    });
    expect(mockGetMCPServerTools).toHaveBeenCalledWith(req.user.id, 'browser');
    expect(mockGetMCPServerTools).toHaveBeenCalledWith(req.user.id, 'search');
    expect(mockLoadToolsUtil).toHaveBeenCalledTimes(1);
    const toolsArg = mockLoadToolsUtil.mock.calls[0][0].tools;
    expect(toolsArg).toContain(`browser_navigate${mcpDelimiter}browser`);
    // search had no cached tools, so the placeholder is used as fallback
    expect(toolsArg).toContain(`${mcpAll}${mcpDelimiter}search`);
  });

  it('honors per-server skip: workspace requires workspaceSubdir', async () => {
    mockGetMCPServerTools.mockResolvedValue({
      [`run_code${mcpDelimiter}workspace`]: {
        type: 'function',
        function: { name: `run_code${mcpDelimiter}workspace` },
      },
    });
    const req = makeReq({
      workspaceSubdir: undefined,
      mcpServers: {
        workspace: { type: 'streamable-http', url: 'http://workspace:8932/sse', autoInject: true },
      },
    });
    const agent = makeAgent(['placeholder_tool'], true);
    await loadAgentTools({ req, res: {}, agent, streamId: 's1', definitionsOnly: false });
    expect(mockGetMCPServerTools).not.toHaveBeenCalledWith(req.user.id, 'workspace');
  });

  it('injects workspace when user has workspaceSubdir', async () => {
    mockGetMCPServerTools.mockResolvedValue({
      [`run_code${mcpDelimiter}workspace`]: {
        type: 'function',
        function: { name: `run_code${mcpDelimiter}workspace` },
      },
    });
    const req = makeReq({
      workspaceSubdir: 'alice',
      mcpServers: {
        workspace: { type: 'streamable-http', url: 'http://workspace:8932/sse', autoInject: true },
      },
    });
    const agent = makeAgent(['placeholder_tool'], true);
    const result = await loadAgentTools({
      req,
      res: {},
      agent,
      streamId: 's1',
      definitionsOnly: false,
    });
    expect(result).toBeDefined();
    expect(mockGetMCPServerTools).toHaveBeenCalledWith(req.user.id, 'workspace');
    const toolsArg = mockLoadToolsUtil.mock.calls[0][0].tools;
    expect(toolsArg).toContain(`run_code${mcpDelimiter}workspace`);
  });

  it('skips auto-inject when canUseMCP is false', async () => {
    mockUserCanUseMCPServers.mockResolvedValue(false);
    const req = makeReq({
      mcpServers: {
        browser: { type: 'streamable-http', url: 'http://browser:8931/mcp', autoInject: true },
      },
    });
    const agent = makeAgent(['placeholder_tool'], true);
    await loadAgentTools({ req, res: {}, agent, streamId: 's1', definitionsOnly: false });
    expect(mockGetMCPServerTools).not.toHaveBeenCalled();
  });

  it('skips auto-inject when tools capability is disabled', async () => {
    mockGetEndpointsConfig.mockResolvedValueOnce({
      [EModelEndpoint.agents]: { capabilities: [] }, // no tools cap
    });
    const req = makeReq({
      mcpServers: {
        browser: { type: 'streamable-http', url: 'http://browser:8931/mcp', autoInject: true },
      },
    });
    const agent = makeAgent(['placeholder_tool'], true);
    await loadAgentTools({ req, res: {}, agent, streamId: 's1', definitionsOnly: false });
    expect(mockGetMCPServerTools).not.toHaveBeenCalled();
  });

  it('does not double-inject when agent already has the tool', async () => {
    mockGetMCPServerTools.mockResolvedValue({
      [`browser_navigate${mcpDelimiter}browser`]: {
        type: 'function',
        function: { name: `browser_navigate${mcpDelimiter}browser` },
      },
    });
    const req = makeReq({
      mcpServers: {
        browser: { type: 'streamable-http', url: 'http://browser:8931/mcp', autoInject: true },
      },
    });
    const agent = makeAgent([`browser_navigate${mcpDelimiter}browser`]);
    await loadAgentTools({ req, res: {}, agent, streamId: 's1', definitionsOnly: false });
    // getMCPServerTools is short-circuited because the tool is already in agent.tools
    expect(mockGetMCPServerTools).not.toHaveBeenCalled();
  });
});
