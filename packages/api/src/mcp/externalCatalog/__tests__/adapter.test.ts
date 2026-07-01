import {
  adaptRegistryServer,
  detectOAuth,
  pickRemote,
  type AdapterMode,
} from '~/mcp/externalCatalog/adapter';
import type { RegistryServer } from '~/mcp/externalCatalog/types';

function makeServer(overrides: Partial<RegistryServer> = {}): RegistryServer {
  return {
    name: 'io.example/test',
    title: 'Test',
    description: 'A test server',
    version: '1.0.0',
    remotes: [{ type: 'streamable-http', url: 'https://example.com/mcp' }],
    _meta: {
      'io.modelcontextprotocol.registry/official': { isLatest: true },
    },
    ...overrides,
  };
}

describe('detectOAuth', () => {
  it.each([
    ['Uses OAuth for authentication', true],
    ['Sign in with authorize flow', true],
    ['OAuth-based', true],
    ['Standard MCP server with tools', false],
    ['', false],
    [undefined, false],
  ])('detectOAuth(%j) → %j', (desc, expected) => {
    expect(detectOAuth(desc)).toBe(expected);
  });
});

describe('pickRemote', () => {
  const remotes = [
    { type: 'websocket', url: 'wss://x/mcp' },
    { type: 'sse', url: 'https://x/sse' },
    { type: 'streamable-http', url: 'https://x/http' },
  ];

  it('prefers streamable-http when no index given', () => {
    expect(pickRemote(remotes)?.type).toBe('streamable-http');
  });

  it('honors preferredRemoteIndex when valid', () => {
    expect(pickRemote(remotes, 0)?.type).toBe('websocket');
    expect(pickRemote(remotes, 2)?.type).toBe('streamable-http');
  });

  it('ignores out-of-range preferredRemoteIndex and falls back to priority', () => {
    expect(pickRemote(remotes, 99)?.type).toBe('streamable-http');
    expect(pickRemote(remotes, -1)?.type).toBe('streamable-http');
  });

  it('returns null when no remotes', () => {
    expect(pickRemote([])).toBeNull();
  });
});

describe('adaptRegistryServer', () => {
  const cases: Array<{
    name: string;
    mode: AdapterMode;
    server: RegistryServer;
    assert: (result: ReturnType<typeof adaptRegistryServer>) => void;
  }> = [
    {
      name: 'admin + remote server → success with MCPOptions config',
      mode: 'admin',
      server: makeServer(),
      assert: (r) => {
        expect(r.ok).toBe(true);
        if (!r.ok) return;
        expect(r.preview.config).toMatchObject({
          type: 'streamable-http',
          url: 'https://example.com/mcp',
        });
        expect(r.preview.requiredEnvVars).toEqual([]);
        expect(r.preview.oauthRequired).toBe(false);
        expect(r.preview.warnings).toEqual([]);
      },
    },
    {
      name: 'user + stdio-only package → rejected',
      mode: 'user',
      server: makeServer({
        remotes: undefined,
        packages: [{ registryName: 'npm', name: '@example/foo' }],
      }),
      assert: (r) => {
        expect(r.ok).toBe(false);
        if (r.ok) return;
        expect(r.status).toBe(400);
        expect(r.error).toMatch(/stdio\/local transport/i);
      },
    },
    {
      name: 'admin + stdio-only package → rejected with manual-install hint',
      mode: 'admin',
      server: makeServer({
        remotes: undefined,
        packages: [{ registryName: 'npm', name: '@example/foo' }],
        repository: { url: 'https://github.com/example/foo', source: 'github' },
      }),
      assert: (r) => {
        expect(r.ok).toBe(false);
        if (r.ok) return;
        expect(r.status).toBe(422);
        expect(r.error).toContain('npm');
        expect(r.error).toContain('github.com/example/foo');
      },
    },
    {
      name: 'OAuth description triggers oauth placeholder',
      mode: 'admin',
      server: makeServer({ description: 'Requires OAuth sign-in.' }),
      assert: (r) => {
        expect(r.ok).toBe(true);
        if (!r.ok) return;
        expect(r.preview.oauthRequired).toBe(true);
        expect(r.preview.config).toMatchObject({
          oauth: { client_id: '', client_secret: '' },
        });
        expect(r.preview.warnings.length).toBeGreaterThan(0);
      },
    },
    {
      name: 'headers with ${ENV} placeholders surface env var names',
      mode: 'admin',
      server: makeServer({
        remotes: [
          {
            type: 'sse',
            url: 'https://example.com/sse',
            headers: { Authorization: 'Bearer ${MY_API_KEY}' },
          },
        ],
      }),
      assert: (r) => {
        expect(r.ok).toBe(true);
        if (!r.ok) return;
        expect(r.preview.requiredEnvVars).toEqual(['MY_API_KEY']);
      },
    },
    {
      name: 'multiple remotes → streamable-http wins',
      mode: 'admin',
      server: makeServer({
        remotes: [
          { type: 'sse', url: 'https://x/sse' },
          { type: 'streamable-http', url: 'https://x/http' },
        ],
      }),
      assert: (r) => {
        expect(r.ok).toBe(true);
        if (!r.ok) return;
        expect(r.preview.config).toMatchObject({ type: 'streamable-http' });
      },
    },
    {
      name: 'preferredRemoteIndex honored when valid',
      mode: 'admin',
      server: makeServer({
        remotes: [
          { type: 'streamable-http', url: 'https://x/http' },
          { type: 'websocket', url: 'wss://x/ws' },
        ],
      }),
      assert: (r) => {
        expect(r.ok).toBe(true);
        if (!r.ok) return;
        // Manually re-run with index 1 to verify the parameter path.
        const rePick = adaptRegistryServer(
          makeServer({
            remotes: [
              { type: 'streamable-http', url: 'https://x/http' },
              { type: 'websocket', url: 'wss://x/ws' },
            ],
          }),
          { mode: 'admin', preferredRemoteIndex: 1 },
        );
        expect(rePick.ok).toBe(true);
        if (!rePick.ok) return;
        expect(rePick.preview.config).toMatchObject({ type: 'websocket' });
      },
    },
    {
      name: 'unsupported transport type → rejected with 422',
      mode: 'admin',
      server: makeServer({
        remotes: [{ type: 'gopher', url: 'gopher://x' }],
      }),
      assert: (r) => {
        expect(r.ok).toBe(false);
        if (r.ok) return;
        expect(r.status).toBe(422);
        expect(r.error).toMatch(/gopher/);
      },
    },
    {
      name: 'no remotes and no packages → rejected',
      mode: 'admin',
      server: makeServer({ remotes: undefined, packages: undefined }),
      assert: (r) => {
        expect(r.ok).toBe(false);
        if (r.ok) return;
        expect(r.status).toBe(422);
      },
    },
    {
      name: 'user + remote server → success (no stdio leak)',
      mode: 'user',
      server: makeServer(),
      assert: (r) => {
        expect(r.ok).toBe(true);
        if (!r.ok) return;
        expect(r.preview.config).toMatchObject({
          type: 'streamable-http',
          url: 'https://example.com/mcp',
        });
      },
    },
  ];

  it.each(cases)('$name', ({ mode, server, assert }) => {
    const result = adaptRegistryServer(server, { mode });
    assert(result);
  });
});