import type { MCPOptions } from '../mcp';

/**
 * MCP Integration (admin-managed).
 *
 * The wire shape for `/api/admin/mcp-integrations`. Each integration
 * represents one entry from the LibreChat deployment's `mcpServers`
 * map (`librechat.yaml`); the admin panel will edit these directly so
 * operators do not have to restart the api container to rotate a key.
 *
 * Sensitive fields inside `config` (`apiKey.key`, `oauth.client_secret`,
 * literal `env.*` values) are encrypted at rest on the server. The
 * server returns either:
 *   - a redacted shape (`MCPIntegrationSummary`) for list views, or
 *   - the decrypted shape (`MCPIntegrationDetail`) when an admin
 *     explicitly fetches one entry.
 *
 * The runtime consumes the same `MCPOptions` shape from the
 * `librechat.yaml` loader, so the integration can be passed through
 * without translation once the runtime learns to read from the DB.
 */
export interface MCPIntegrationSummary {
  _id: string;
  /** Unique server name; matches `mcpServers.<name>` in librechat.yaml. */
  name: string;
  /** Display title shown in the chat dropdown. */
  title?: string | null;
  description?: string | null;
  enabled: boolean;
  /** Discriminator from `MCPOptions` — useful for icon/section picking. */
  type?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MCPIntegrationDetail extends MCPIntegrationSummary {
  /** Full MCPOptions shape. Decrypted server-side. */
  config: MCPOptions;
}

export interface MCPIntegrationUpsertPayload {
  title?: string;
  description?: string;
  enabled?: boolean;
  config: MCPOptions;
}

export interface MCPIntegrationListResponse {
  items: MCPIntegrationSummary[];
}
