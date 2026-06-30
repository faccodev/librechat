/**
 * Strict types for the Official MCP Registry v0.1 API schema.
 *
 * Reference: <https://github.com/modelcontextprotocol/registry>
 * API freeze since 2025-10-24.
 *
 * Only the fields we actually consume are typed; the upstream schema
 * permits more (e.g. icons, websiteUrl, packages[].npm). Unknown fields
 * pass through to MCPOptions as-is when the adapter decides to keep
 * them; we do NOT model them here because we don't read them.
 *
 * Naming follows the upstream server.json field names verbatim so we
 * can drop the parsed object straight into the adapter without
 * translating keys.
 */

export type RegistryRemoteType = 'streamable-http' | 'sse' | 'websocket';

export interface RegistryRemote {
  type: string;
  url: string;
  headers?: Record<string, string>;
}

export interface RegistryPackage {
  registryName?: 'npm' | 'pypi' | 'oci' | 'mcpb' | string;
  name?: string;
  version?: string;
  /** For npm: "npx -y <args> <name>". For pypi: "uvx <args> <name>". */
  command?: string;
  args?: string[];
  env?: Record<string, string>;
}

export interface RegistryRepository {
  url: string;
  source: string;
  id?: string;
}

export interface RegistryServerMeta {
  'io.modelcontextprotocol.registry/official'?: {
    status?: 'active' | 'deprecated' | 'deleted';
    statusChangedAt?: string;
    publishedAt?: string;
    updatedAt?: string;
    isLatest?: boolean;
  };
  [key: string]: unknown;
}

export interface RegistryServer {
  $schema?: string;
  name: string;
  title?: string;
  description?: string;
  version: string;
  websiteUrl?: string;
  icons?: Array<{ src: string; mimeType?: string; sizes?: string[] }>;
  repository?: RegistryRepository;
  remotes?: RegistryRemote[];
  packages?: RegistryPackage[];
  _meta?: RegistryServerMeta;
}

/**
 * Envelope returned by `GET /v0/servers`.
 *
 * `metadata.nextCursor` is opaque per the spec; clients pass it back
 * unmodified. `metadata.count` is the count returned in this page.
 */
export interface RegistryListResponse {
  servers: RegistryServer[];
  metadata?: {
    nextCursor?: string;
    count?: number;
  };
}

export interface RegistryErrorResponse {
  error?: {
    code?: string;
    message?: string;
  };
}

/**
 * Shape the frontend cares about — derived from `RegistryServer`,
 * normalized to a flat list of fields the UI uses. We do NOT pass the
 * raw `RegistryServer` to the client to avoid leaking fields like
 * `_meta` that have no UI surface.
 */
export interface RegistryListItem {
  name: string;
  title: string;
  description: string;
  version: string;
  repositoryUrl?: string;
  /** Transport types declared via `remotes` (filtered to known good values). */
  transports: RegistryRemoteType[];
  /** True iff the package advertises OAuth in its description (heuristic; see adapter). */
  oauthHint: boolean;
}

export interface RegistryListResponseNormalized {
  items: RegistryListItem[];
  nextCursor: string | null;
  /** ISO timestamp at which the response was cached on the server. */
  cachedAt: string;
}

/**
 * Preview of a single install: the converted `MCPOptions`, the names
 * (not values) of env vars the user/admin must supply, and a hint
 * about whether OAuth is required.
 *
 * `warnings` carries adapter-level messages the UI should surface
 * (e.g. "stdio-only package, manual install required").
 */
export interface RegistryPreviewResponse {
  name: string;
  title: string;
  description: string;
  /**
   * The converted config; validated against `MCPOptionsSchema` (or
   * `MCPServerUserInputSchema` for the user path). The frontend
   * renders this as JSON in the editor and submits it to the existing
   * create endpoint.
   */
  config: unknown;
  requiredEnvVars: string[];
  oauthRequired: boolean;
  warnings: string[];
}