import { RegistryClient, RegistryClientError } from '~/mcp/externalCatalog/client';
import type { RegistryListResponse } from '~/mcp/externalCatalog/types';

type FetchMock = jest.MockedFunction<typeof fetch>;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

describe('RegistryClient', () => {
  it('builds a correct upstream URL with search + cursor + limit', async () => {
    const fetchMock = jest.fn() as unknown as FetchMock;
    fetchMock.mockImplementation(async (url) => {
      const u = new URL(url as string);
      expect(u.pathname).toBe('/v0/servers');
      expect(u.searchParams.get('search')).toBe('github');
      expect(u.searchParams.get('cursor')).toBe('abc');
      expect(u.searchParams.get('limit')).toBe('10');
      return jsonResponse({ servers: [], metadata: {} });
    });
    const client = new RegistryClient({ fetchImpl: fetchMock, timeoutMs: 1000 });

    await client.listServers({ search: 'github', cursor: 'abc', limit: 10 });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0];
    const headers = init?.headers as Record<string, string>;
    expect(headers['User-Agent']).toMatch(/^LibreChat\//);
    expect(headers.Accept).toBe('application/json');
  });

  it('clamps limit to [1, MAX_PAGE_LIMIT]', async () => {
    const fetchMock = jest.fn() as unknown as FetchMock;
    fetchMock.mockImplementation(async () => jsonResponse({ servers: [], metadata: {} }));
    const client = new RegistryClient({ fetchImpl: fetchMock, timeoutMs: 1000 });

    await client.listServers({ limit: 9999 });
    expect(new URL(fetchMock.mock.calls[0][0] as string).searchParams.get('limit')).toBe('50');

    await client.listServers({ limit: 0 });
    expect(new URL(fetchMock.mock.calls[1][0] as string).searchParams.get('limit')).toBe('1');
  });

  it('normalizes the upstream list to the flat shape the UI consumes', async () => {
    const upstream: RegistryListResponse = {
      servers: [
        {
          name: 'io.example/foo',
          title: 'Foo',
          description: 'Does foo things',
          version: '1.0.0',
          repository: { url: 'https://github.com/example/foo', source: 'github' },
          remotes: [{ type: 'streamable-http', url: 'https://foo.example/mcp' }],
          _meta: {
            'io.modelcontextprotocol.registry/official': { isLatest: true },
          },
        },
        {
          name: 'io.example/old',
          version: '0.9.0',
          description: 'old',
          remotes: [{ type: 'sse', url: 'https://old.example/mcp' }],
          _meta: {
            'io.modelcontextprotocol.registry/official': { isLatest: false },
          },
        },
      ],
      metadata: { nextCursor: 'opaque-cursor', count: 2 },
    };

    const fetchMock = jest.fn() as unknown as FetchMock;
    fetchMock.mockResolvedValue(jsonResponse(upstream));
    const client = new RegistryClient({ fetchImpl: fetchMock, timeoutMs: 1000 });

    const result = await client.listServers({ limit: 5 });

    // Non-latest versions are filtered out — the UI only renders latest.
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toMatchObject({
      name: 'io.example/foo',
      title: 'Foo',
      description: 'Does foo things',
      version: '1.0.0',
      repositoryUrl: 'https://github.com/example/foo',
      transports: ['streamable-http'],
      oauthHint: false,
    });
    expect(result.nextCursor).toBe('opaque-cursor');
    expect(typeof result.cachedAt).toBe('string');
  });

  it('detects OAuth from the description', async () => {
    const upstream: RegistryListResponse = {
      servers: [
        {
          name: 'io.example/oauthy',
          version: '1.0.0',
          description: 'Connects to GitHub via OAuth authorization.',
          remotes: [{ type: 'streamable-http', url: 'https://x/mcp' }],
          _meta: {
            'io.modelcontextprotocol.registry/official': { isLatest: true },
          },
        },
      ],
      metadata: {},
    };
    const fetchMock = jest.fn() as unknown as FetchMock;
    fetchMock.mockResolvedValue(jsonResponse(upstream));
    const client = new RegistryClient({ fetchImpl: fetchMock, timeoutMs: 1000 });

    const result = await client.listServers({});
    expect(result.items[0].oauthHint).toBe(true);
  });

  it('deduplicates transports and ignores unknown types', async () => {
    const upstream: RegistryListResponse = {
      servers: [
        {
          name: 'io.example/weird',
          version: '1.0.0',
          remotes: [
            { type: 'streamable-http', url: 'https://x/mcp' },
            { type: 'streamable-http', url: 'https://x/mcp2' },
            { type: 'stdio', url: 'local' },
            { type: 'unknown-future-type', url: 'wut' },
          ],
          _meta: {
            'io.modelcontextprotocol.registry/official': { isLatest: true },
          },
        },
      ],
      metadata: {},
    };
    const fetchMock = jest.fn() as unknown as FetchMock;
    fetchMock.mockResolvedValue(jsonResponse(upstream));
    const client = new RegistryClient({ fetchImpl: fetchMock, timeoutMs: 1000 });

    const result = await client.listServers({});
    expect(result.items[0].transports).toEqual(['streamable-http']);
  });

  it('caches identical list queries', async () => {
    const upstream: RegistryListResponse = {
      servers: [],
      metadata: {},
    };
    const fetchMock = jest.fn() as unknown as FetchMock;
    fetchMock.mockResolvedValue(jsonResponse(upstream));
    const client = new RegistryClient({ fetchImpl: fetchMock, timeoutMs: 1000 });

    await client.listServers({ search: 'x' });
    await client.listServers({ search: 'x' });
    await client.listServers({ search: 'x' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(client.getCacheStats().hits).toBe(2);
    expect(client.getCacheStats().misses).toBe(1);
  });

  it('retries once on 5xx, then surfaces a 503 RegistryClientError', async () => {
    const fetchMock = jest.fn() as unknown as FetchMock;
    fetchMock.mockResolvedValue(new Response('upstream down', { status: 503 }));
    const client = new RegistryClient({ fetchImpl: fetchMock, timeoutMs: 1000 });

    await expect(client.listServers({})).rejects.toBeInstanceOf(RegistryClientError);
    await expect(client.listServers({})).rejects.toMatchObject({ status: 503 });
    expect(fetchMock).toHaveBeenCalledTimes(4); // 2 attempts per call, 2 calls.
  });

  it('does NOT retry on 4xx', async () => {
    const fetchMock = jest.fn() as unknown as FetchMock;
    fetchMock.mockResolvedValue(new Response('bad request', { status: 400 }));
    const client = new RegistryClient({ fetchImpl: fetchMock, timeoutMs: 1000 });

    await expect(client.listServers({})).rejects.toMatchObject({ status: 502 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('returns null when getServer cannot find a match', async () => {
    const fetchMock = jest.fn() as unknown as FetchMock;
    fetchMock.mockResolvedValue(jsonResponse({ servers: [], metadata: {} }));
    const client = new RegistryClient({ fetchImpl: fetchMock, timeoutMs: 1000 });

    const result = await client.getServer('io.example/missing');
    expect(result).toBeNull();
  });

  it('getServer prefers isLatest when multiple versions are returned', async () => {
    const upstream: RegistryListResponse = {
      servers: [
        {
          name: 'io.example/multi',
          version: '0.9.0',
          remotes: [{ type: 'sse', url: 'https://old/mcp' }],
          _meta: {
            'io.modelcontextprotocol.registry/official': { isLatest: false },
          },
        },
        {
          name: 'io.example/multi',
          version: '1.0.0',
          remotes: [{ type: 'streamable-http', url: 'https://new/mcp' }],
          _meta: {
            'io.modelcontextprotocol.registry/official': { isLatest: true },
          },
        },
      ],
      metadata: {},
    };
    const fetchMock = jest.fn() as unknown as FetchMock;
    fetchMock.mockResolvedValue(jsonResponse(upstream));
    const client = new RegistryClient({ fetchImpl: fetchMock, timeoutMs: 1000 });

    const result = await client.getServer('io.example/multi');
    expect(result?.version).toBe('1.0.0');
    expect(result?.remotes?.[0].url).toBe('https://new/mcp');
  });
});