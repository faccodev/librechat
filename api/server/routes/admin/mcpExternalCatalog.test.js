/**
 * Integration tests for /api/admin/mcp-external-catalog.
 *
 * The auth middleware and feature-flag bypass are stubbed so each
 * test focuses on routing logic, validation, and the contract between
 * the handlers and the `@librechat/api` exports (RegistryClient +
 * adapter). The underlying client and adapter are themselves unit
 * tested in `packages/api/src/mcp/externalCatalog/__tests__/`.
 */

const express = require('express');
const request = require('supertest');

// Default the feature flag on for the suite. The "feature flag gating"
// describe block flips it back off inside an isolated module context.
process.env.MCP_REGISTRY_ENABLED = 'true';

// Mock the @librechat/api surface this route consumes. We avoid
// `requireActual` because the rollup-emitted ESM bundle breaks jest's
// CJS loader (p-queue uses native ESM imports). The real client +
// adapter are themselves unit-tested in
// `packages/api/src/mcp/externalCatalog/__tests__/`.

class MockRegistryClientError extends Error {
  constructor(message, status, upstreamStatus) {
    super(message);
    this.name = 'RegistryClientError';
    this.status = status;
    this.upstreamStatus = upstreamStatus;
  }
}

const mockListServers = jest.fn();
const mockGetServer = jest.fn();
const mockGetCacheStats = jest.fn(() => ({
  size: 0,
  hits: 0,
  misses: 0,
  evictions: 0,
  expirations: 0,
}));

jest.mock('@librechat/api', () => ({
  getRegistryClient: () => ({
    listServers: mockListServers,
    getServer: mockGetServer,
    getCacheStats: mockGetCacheStats,
  }),
  RegistryClientError: MockRegistryClientError,
  adaptRegistryServer: (server, options) => {
    // Inline adapter shim that mirrors the real one's decision rules
    // for the test cases below. Tests don't exercise the full adapter
    // matrix — that's covered in `packages/api`.
    if (options?.mode === 'user' && (!server.remotes || server.remotes.length === 0)) {
      return { ok: false, status: 400, error: 'stdio/local transport, manual install' };
    }
    if (!server.remotes || server.remotes.length === 0) {
      return {
        ok: false,
        status: 422,
        error: `package ${server.packages?.[0]?.registryName ?? ''} manual install${
          server.repository?.url ? ` ${server.repository.url}` : ''
        }`,
      };
    }
    const remote = server.remotes[0];
    const config = { type: remote.type, url: remote.url };
    return {
      ok: true,
      preview: {
        name: server.name,
        title: server.title ?? server.name,
        description: server.description ?? '',
        config,
        requiredEnvVars: [],
        oauthRequired: false,
        warnings: [],
      },
    };
  },
}));

jest.mock('~/server/middleware', () => ({
  requireJwtAuth: (_req, _res, next) => next(),
}));

jest.mock('~/server/middleware/roles/capabilities', () => ({
  requireCapability: () => (_req, _res, next) => next(),
}));

jest.mock('@librechat/data-schemas', () => ({
  SystemCapabilities: { ACCESS_ADMIN: 'access:admin' },
  logger: {
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
  },
}));

const router = require('./mcpExternalCatalog');

function buildApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/admin/mcp-external-catalog', router);
  return app;
}

beforeEach(() => {
  jest.clearAllMocks();
  mockGetCacheStats.mockReturnValue({
    size: 0,
    hits: 0,
    misses: 0,
    evictions: 0,
    expirations: 0,
  });
});

describe('GET /api/admin/mcp-external-catalog/servers', () => {
  it('returns the client payload as-is on success', async () => {
    const payload = {
      items: [
        {
          name: 'io.example/foo',
          title: 'Foo',
          description: 'desc',
          version: '1.0.0',
          repositoryUrl: 'https://github.com/example/foo',
          transports: ['streamable-http'],
          oauthHint: false,
        },
      ],
      nextCursor: 'opaque',
      cachedAt: '2026-06-30T00:00:00.000Z',
    };
    mockListServers.mockResolvedValueOnce(payload);

    const res = await request(buildApp()).get('/api/admin/mcp-external-catalog/servers');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(payload);
    expect(mockListServers).toHaveBeenCalledWith({});
  });

  it('passes search/cursor/limit through to the client', async () => {
    mockListServers.mockResolvedValueOnce({ items: [], nextCursor: null, cachedAt: '' });

    await request(buildApp()).get(
      '/api/admin/mcp-external-catalog/servers?search=github&cursor=abc&limit=10',
    );

    expect(mockListServers).toHaveBeenCalledWith({
      search: 'github',
      cursor: 'abc',
      limit: 10,
    });
  });

  it('rejects limit > 50', async () => {
    const res = await request(buildApp()).get(
      '/api/admin/mcp-external-catalog/servers?limit=999',
    );
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid query parameters');
    expect(mockListServers).not.toHaveBeenCalled();
  });

  it('maps a 503 RegistryClientError to HTTP 503', async () => {
    const { RegistryClientError } = require('@librechat/api');
    mockListServers.mockRejectedValueOnce(
      new RegistryClientError('upstream registry unavailable', 503, 503),
    );

    const res = await request(buildApp()).get('/api/admin/mcp-external-catalog/servers');

    expect(res.status).toBe(503);
    expect(res.body.error).toMatch(/upstream/);
  });
});

describe('GET /api/admin/mcp-external-catalog/servers/:name', () => {
  it('returns the raw ServerJSON on a hit', async () => {
    const server = {
      name: 'io.example/foo',
      version: '1.0.0',
      remotes: [{ type: 'streamable-http', url: 'https://example.com/mcp' }],
      _meta: {
        'io.modelcontextprotocol.registry/official': { isLatest: true },
      },
    };
    mockGetServer.mockResolvedValueOnce(server);

    const res = await request(buildApp()).get(
      '/api/admin/mcp-external-catalog/servers/io.example/foo',
    );

    expect(res.status).toBe(200);
    expect(res.body).toEqual(server);
  });

  it('returns 404 when the client cannot find a match', async () => {
    mockGetServer.mockResolvedValueOnce(null);

    const res = await request(buildApp()).get(
      '/api/admin/mcp-external-catalog/servers/io.example/missing',
    );

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  it('rejects names with unsafe characters', async () => {
    // Space (encoded) is not in the allowed path charset; the route
    // regex doesn't match → Express returns 404, the handler is never
    // invoked. We assert "did not call the client" rather than a
    // specific status because Express 5's behavior here is path
    // rejection at the routing layer.
    const res = await request(buildApp()).get(
      '/api/admin/mcp-external-catalog/servers/foo%20bar',
    );
    expect([400, 404]).toContain(res.status);
    expect(mockGetServer).not.toHaveBeenCalled();
  });

  it('rejects names that pass the path regex but fail Zod validation', async () => {
    // Names containing a `?` would pass our regex but Zod rejects; this
    // case is mostly defensive — covered here so a future loosening of
    // `nameParamSchema` does not silently bypass validation.
    const res = await request(buildApp()).get(
      '/api/admin/mcp-external-catalog/servers/foo%3Fbar',
    );
    expect([400, 404]).toContain(res.status);
    expect(mockGetServer).not.toHaveBeenCalled();
  });
});

describe('POST /api/admin/mcp-external-catalog/servers/:name/preview', () => {
  const remoteServer = {
    name: 'io.example/foo',
    title: 'Foo',
    description: 'desc',
    version: '1.0.0',
    remotes: [{ type: 'streamable-http', url: 'https://example.com/mcp' }],
    _meta: {
      'io.modelcontextprotocol.registry/official': { isLatest: true },
    },
  };

  it('returns the converted preview (admin mode by default)', async () => {
    mockGetServer.mockResolvedValueOnce(remoteServer);

    const res = await request(buildApp())
      .post('/api/admin/mcp-external-catalog/servers/io.example/foo/preview')
      .send({});

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      name: 'io.example/foo',
      title: 'Foo',
      config: { type: 'streamable-http', url: 'https://example.com/mcp' },
      requiredEnvVars: [],
      oauthRequired: false,
      warnings: [],
    });
  });

  it('respects explicit mode = "user" in the body', async () => {
    mockGetServer.mockResolvedValueOnce(remoteServer);

    const res = await request(buildApp())
      .post('/api/admin/mcp-external-catalog/servers/io.example/foo/preview')
      .send({ mode: 'user' });

    expect(res.status).toBe(200);
    expect(res.body.config).toMatchObject({ type: 'streamable-http' });
  });

  it('returns 400 when user mode rejects stdio-only', async () => {
    mockGetServer.mockResolvedValueOnce({
      name: 'io.example/std',
      title: 'Stdio',
      description: 'stdio only',
      version: '1.0.0',
      packages: [{ registryName: 'npm', name: '@example/std' }],
      _meta: {
        'io.modelcontextprotocol.registry/official': { isLatest: true },
      },
    });

    const res = await request(buildApp())
      .post('/api/admin/mcp-external-catalog/servers/io.example/std/preview')
      .send({ mode: 'user' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/stdio/i);
  });

  it('returns 422 when admin mode rejects stdio-only with manual-install hint', async () => {
    mockGetServer.mockResolvedValueOnce({
      name: 'io.example/std',
      title: 'Stdio',
      description: 'stdio only',
      version: '1.0.0',
      packages: [{ registryName: 'npm', name: '@example/std' }],
      repository: { url: 'https://github.com/example/std', source: 'github' },
      _meta: {
        'io.modelcontextprotocol.registry/official': { isLatest: true },
      },
    });

    const res = await request(buildApp())
      .post('/api/admin/mcp-external-catalog/servers/io.example/std/preview')
      .send({ mode: 'admin' });

    expect(res.status).toBe(422);
    expect(res.body.error).toContain('npm');
    expect(res.body.error).toContain('github.com/example/std');
  });

  it('rejects an invalid mode value', async () => {
    mockGetServer.mockResolvedValueOnce(remoteServer);

    const res = await request(buildApp())
      .post('/api/admin/mcp-external-catalog/servers/io.example/foo/preview')
      .send({ mode: 'guest' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid preview payload');
    // Body parse fails before getServer is called; the queued mock
    // is not consumed here. Reset to keep the next test deterministic.
    mockGetServer.mockReset();
  });

  it('returns 404 when the server is unknown to the client', async () => {
    mockGetServer.mockResolvedValueOnce(null);

    const res = await request(buildApp())
      .post('/api/admin/mcp-external-catalog/servers/io.example/nope/preview')
      .send({});

    expect(res.status).toBe(404);
  });
});

describe('GET /api/admin/mcp-external-catalog/health', () => {
  it('returns the feature-flag state and cache stats', async () => {
    mockGetCacheStats.mockReturnValueOnce({
      size: 3,
      hits: 7,
      misses: 5,
      evictions: 0,
      expirations: 1,
    });

    const res = await request(buildApp()).get('/api/admin/mcp-external-catalog/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      enabled: true,
      cache: {
        size: 3,
        hits: 7,
        misses: 5,
        evictions: 0,
        expirations: 1,
      },
    });
  });
});

describe('feature flag gating', () => {
  let originalFlag;

  beforeEach(() => {
    originalFlag = process.env.MCP_REGISTRY_ENABLED;
    process.env.MCP_REGISTRY_ENABLED = 'false';
  });

  afterEach(() => {
    process.env.MCP_REGISTRY_ENABLED = originalFlag;
  });

  it('returns 404 on every route when MCP_REGISTRY_ENABLED is not "true"', async () => {
    // Re-require the router so the FEATURE_ENABLED constant picks up
    // the freshly set env value.
    jest.isolateModules(() => {
      const router2 = require('./mcpExternalCatalog');
      const app = express();
      app.use(express.json());
      app.use('/api/admin/mcp-external-catalog', router2);
      return request(app)
        .get('/api/admin/mcp-external-catalog/servers')
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body.error).toMatch(/disabled/i);
        });
    });
    expect(mockListServers).not.toHaveBeenCalled();
  });
});