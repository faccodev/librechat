/**
 * Wire types for the External MCP Catalog admin endpoints.
 *
 * These mirror the responses from `/api/admin/mcp-external-catalog/*`
 * (see `api/server/routes/admin/mcpExternalCatalog.js`). They are
 * declared as standalone interfaces (not derived from the `@librechat/api`
 * Zod types) so the client bundle does not need the server-side
 * validator.
 */

export type RegistryRemoteType = 'streamable-http' | 'sse' | 'websocket';

export interface RegistryListItem {
  name: string;
  title: string;
  description: string;
  version: string;
  repositoryUrl?: string;
  transports: RegistryRemoteType[];
  oauthHint: boolean;
}

export interface RegistryListResponse {
  items: RegistryListItem[];
  nextCursor: string | null;
  cachedAt: string;
}

export interface RegistryPreviewRequest {
  /** 'admin' allows stdio-only entries with a manual-install hint; 'user' rejects them. */
  mode?: 'admin' | 'user';
  preferredRemoteIndex?: number;
}

export interface RegistryPreviewResponse {
  name: string;
  title: string;
  description: string;
  /**
   * The converted MCPOptions config; ready to drop into the existing
   * admin/user MCP editor verbatim. Server validates against
   * `MCPOptionsSchema` before returning.
   */
  config: unknown;
  requiredEnvVars: string[];
  oauthRequired: boolean;
  warnings: string[];
}

export interface RegistryHealthResponse {
  enabled: boolean;
  cache: {
    size: number;
    hits: number;
    misses: number;
    evictions: number;
    expirations: number;
  };
}