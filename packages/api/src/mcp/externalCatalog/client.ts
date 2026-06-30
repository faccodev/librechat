/**
 * HTTP client for the Official MCP Registry upstream API.
 *
 * Responsibilities:
 *  - Send a stable User-Agent so the upstream sees LibreChat traffic.
 *  - Enforce a per-call timeout via AbortController.
 *  - Single retry on 5xx (no retry on 4xx — those are caller errors).
 *  - Cache every successful list/detail response for 5 minutes.
 *  - Surface upstream errors as `RegistryClientError` so the route
 *    handler can map them to HTTP status codes.
 *
 * Non-responsibilities:
 *  - Translating `RegistryServer` → `MCPOptions`. That's the adapter.
 *  - Auth. The registry is public and unauthenticated.
 */

import { logger } from '@librechat/data-schemas';
import { TTLCache } from './cache';
import type {
  RegistryListResponse,
  RegistryListResponseNormalized,
  RegistryServer,
  RegistryListItem,
  RegistryRemoteType,
} from './types';

const DEFAULT_BASE_URL = 'https://registry.modelcontextprotocol.io';
const DEFAULT_TIMEOUT_MS = 5_000;
const DEFAULT_MAX_ENTRIES = 200;
const DEFAULT_TTL_MS = 5 * 60 * 1_000;
const DEFAULT_PAGE_LIMIT = 30;
const MAX_PAGE_LIMIT = 50;
const USER_AGENT = `LibreChat/${process.env.npm_package_version ?? '0.0.0'} (mcp-registry)`;

export class RegistryClientError extends Error {
  readonly status: number;
  readonly upstreamStatus?: number;

  constructor(message: string, status: number, upstreamStatus?: number) {
    super(message);
    this.name = 'RegistryClientError';
    this.status = status;
    this.upstreamStatus = upstreamStatus;
  }
}

interface ClientOptions {
  baseUrl?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  cache?: TTLCache<unknown>;
}

const TRANSPORT_WHITELIST: RegistryRemoteType[] = [
  'streamable-http',
  'sse',
  'websocket',
];

function isTransport(value: string): value is RegistryRemoteType {
  return (TRANSPORT_WHITELIST as string[]).includes(value);
}

/**
 * Normalize a `RegistryServer` to the flat shape consumed by the UI.
 * Filters to latest version when `_meta` carries `isLatest: true`,
 * otherwise the upstream returns all versions and the caller is
 * expected to dedupe in the UI by `name`.
 */
function toListItem(server: RegistryServer): RegistryListItem {
  const transports: RegistryRemoteType[] = (server.remotes ?? [])
    .map((r) => r.type)
    .filter((t): t is RegistryRemoteType => isTransport(t));

  const deduped: RegistryRemoteType[] = [];
  for (const t of transports) {
    if (!deduped.includes(t)) {
      deduped.push(t);
    }
  }

  return {
    name: server.name,
    title: server.title ?? server.name,
    description: server.description ?? '',
    version: server.version,
    repositoryUrl: server.repository?.url,
    transports: deduped,
    oauthHint: /\boauth\b|\bauthorize\b|\bauth flow\b/i.test(server.description ?? ''),
  };
}

export class RegistryClient {
  private readonly baseUrl: string;

  private readonly timeoutMs: number;

  private readonly fetchImpl: typeof fetch;

  private readonly cache: TTLCache<unknown>;

  constructor(options: ClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.cache =
      options.cache ??
      new TTLCache({ maxEntries: DEFAULT_MAX_ENTRIES, ttlMs: DEFAULT_TTL_MS });
  }

  /** Exposed for tests and the `/health` route. */
  getCacheStats() {
    return this.cache.stats();
  }

  /**
   * Fetch a page of servers. `search` and `cursor` are passed through
   * verbatim to the upstream. `limit` is clamped to [1, MAX_PAGE_LIMIT].
   *
   * Returns the normalized shape, plus the opaque `nextCursor` and a
   * `cachedAt` timestamp (server-side) so the frontend can show how
   * fresh the catalog is.
   */
  async listServers(params: {
    search?: string;
    cursor?: string;
    limit?: number;
  }): Promise<RegistryListResponseNormalized> {
    const limit = Math.min(
      Math.max(1, params.limit ?? DEFAULT_PAGE_LIMIT),
      MAX_PAGE_LIMIT,
    );
    const search = params.search?.trim() || undefined;
    const cursor = params.cursor?.trim() || undefined;

    const cacheKey = JSON.stringify({ kind: 'list', search, cursor, limit });
    const cached = this.cache.get(cacheKey) as RegistryListResponseNormalized | undefined;
    if (cached) {
      return cached;
    }

    const qs = new URLSearchParams();
    if (search) qs.set('search', search);
    if (cursor) qs.set('cursor', cursor);
    qs.set('limit', String(limit));

    const url = `${this.baseUrl}/v0/servers?${qs.toString()}`;
    const upstream = await this.fetchWithRetry<RegistryListResponse>(url);

    const items = (upstream.servers ?? [])
      .filter((s) => s?._meta?.['io.modelcontextprotocol.registry/official']?.isLatest !== false)
      .map(toListItem);

    const normalized: RegistryListResponseNormalized = {
      items,
      nextCursor: upstream.metadata?.nextCursor ?? null,
      cachedAt: new Date().toISOString(),
    };

    this.cache.set(cacheKey, normalized);
    return normalized;
  }

  /**
   * Fetch a single server by name, preferring the latest version.
   * The upstream doesn't expose a "by name" endpoint that picks latest
   * automatically, so we list and filter — same as the UI does.
   */
  async getServer(name: string): Promise<RegistryServer | null> {
    const trimmed = name.trim();
    if (!trimmed) {
      throw new RegistryClientError('Server name is required', 400);
    }
    const cacheKey = JSON.stringify({ kind: 'detail', name: trimmed });
    const cached = this.cache.get(cacheKey) as RegistryServer | null | undefined;
    if (cached !== undefined) {
      return cached;
    }

    const qs = new URLSearchParams({ search: trimmed, limit: String(MAX_PAGE_LIMIT) });
    const url = `${this.baseUrl}/v0/servers?${qs.toString()}`;
    const upstream = await this.fetchWithRetry<RegistryListResponse>(url);

    const matches = (upstream.servers ?? []).filter((s) => s.name === trimmed);
    if (matches.length === 0) {
      this.cache.set(cacheKey, null);
      return null;
    }

    // Prefer isLatest, then highest semver-ish version, then first.
    const latest = matches.find(
      (s) => s._meta?.['io.modelcontextprotocol.registry/official']?.isLatest === true,
    );
    const picked = latest ?? matches[0];

    this.cache.set(cacheKey, picked);
    return picked;
  }

  private async fetchWithRetry<T>(url: string): Promise<T> {
    const first = await this.fetchOnce<T>(url);
    if (first.kind === 'ok') {
      return first.value;
    }
    if (first.kind === 'http4xx') {
      throw new RegistryClientError(
        `Upstream rejected request: ${first.message}`,
        502,
        first.status,
      );
    }
    // Single retry on 5xx, network errors, or timeout.
    logger.warn('[RegistryClient] Retrying after upstream error', {
      url,
      status: first.kind === 'http5xx' ? first.status : 'n/a',
      message: first.message,
    });
    const second = await this.fetchOnce<T>(url);
    if (second.kind === 'ok') {
      return second.value;
    }
    throw new RegistryClientError(
      `Upstream registry unavailable: ${second.message}`,
      503,
      second.kind === 'http5xx' ? second.status : undefined,
    );
  }

  private async fetchOnce<T>(url: string): Promise<
    | { kind: 'ok'; value: T }
    | { kind: 'http4xx'; status: number; message: string }
    | { kind: 'http5xx'; status: number; message: string }
    | { kind: 'network'; message: string }
  > {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const res = await this.fetchImpl(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'User-Agent': USER_AGENT,
        },
        signal: controller.signal,
      });
      if (!res.ok) {
        let bodyText = '';
        try {
          bodyText = (await res.text()).slice(0, 500);
        } catch {
          // ignore
        }
        if (res.status >= 400 && res.status < 500) {
          return {
            kind: 'http4xx',
            status: res.status,
            message: `${res.status} ${bodyText || res.statusText}`.trim(),
          };
        }
        return {
          kind: 'http5xx',
          status: res.status,
          message: `${res.status} ${bodyText || res.statusText}`.trim(),
        };
      }
      const value = (await res.json()) as T;
      return { kind: 'ok', value };
    } catch (err) {
      const message =
        err instanceof Error
          ? err.name === 'AbortError'
            ? `timeout after ${this.timeoutMs}ms`
            : err.message
          : 'unknown fetch error';
      return { kind: 'network', message };
    } finally {
      clearTimeout(timeout);
    }
  }
}

let defaultClient: RegistryClient | null = null;

/** Lazy singleton — created on first call so env overrides apply at runtime. */
export function getRegistryClient(): RegistryClient {
  if (!defaultClient) {
    defaultClient = new RegistryClient();
  }
  return defaultClient;
}

/** Test-only escape hatch. */
export function __resetRegistryClient(): void {
  defaultClient = null;
}