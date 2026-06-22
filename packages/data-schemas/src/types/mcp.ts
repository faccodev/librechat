import { Document, Types } from 'mongoose';
import type { MCPServerDB } from 'librechat-data-provider';

/**
 * Mongoose document interface for MCP Server
 * Extends API interface with Mongoose-specific database fields
 */
export interface MCPServerDocument
  extends Omit<MCPServerDB, 'author' | '_id'>,
    Document<Types.ObjectId> {
  author: Types.ObjectId; // ObjectId reference in DB (vs string in API)
  tenantId?: string;
}

/**
 * Public, un-redacted MCPIntegration shape — the `config` field matches
 * the same `MCPOptions` shape used by `librechat.yaml` `mcpServers`, so
 * the runtime can consume a DB-stored integration without translation.
 *
 * Sensitive fields inside `config` (`apiKey.key`, `oauth.client_secret`,
 * literal `env.*` values) are encrypted at rest by the service layer and
 * decrypted on read. Callers that need a redacted view (for list views
 * shared with non-admin UIs) should use the service's redacted helpers.
 */
export interface MCPIntegrationDocument extends Document<Types.ObjectId> {
  /** Unique server name — matches the `mcpServers.<name>` key in librechat.yaml. */
  name: string;
  /** Display title (mirrors `librechat.yaml` `mcpServers.<name>.title`). */
  title?: string;
  /**
   * Free-form admin note describing what this integration is for.
   * Not consumed by the runtime.
   */
  description?: string;
  /**
   * Disabled integrations stay in the DB but are excluded from the
   * runtime MCP server registry, so admins can stage configs before
   * publishing them.
   */
  enabled: boolean;
  /**
   * Full MCPOptions shape. Sensitive bits inside are encrypted on save
   * and decrypted on read by the service layer.
   */
  config: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

/** A redacted projection of MCPIntegrationDocument safe for list views. */
export type MCPIntegrationSummary = Pick<
  MCPIntegrationDocument,
  '_id' | 'name' | 'title' | 'description' | 'enabled' | 'createdAt' | 'updatedAt'
> & { type?: string };

