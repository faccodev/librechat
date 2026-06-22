import type { Model, QueryOptions, Types } from 'mongoose';
import type { MCPIntegrationDocument } from '~/types';
import {
  encryptMCPCredentials,
  decryptMCPCredentials,
  redactMCPCredentials,
} from '~/crypto/mcpCredentials';
import logger from '~/config/winston';

/**
 * MCP Integration service methods.
 *
 * The "integration" concept is the **admin-managed** counterpart to the
 * existing `MCPServer` collection. Where `MCPServer` stores
 * per-user/per-tenant saved MCP server definitions authored from the
 * chat UI, `MCPIntegration` stores the global set of MCP integrations
 * that ship with the LibreChat deployment — currently loaded from
 * `librechat.yaml` `mcpServers` and (eventually) editable from the
 * admin panel.
 *
 * Sensitive fields inside `config` are encrypted at rest via
 * `encryptMCPCredentials` (see `~/crypto/mcpCredentials`). The runtime
 * reads through `findMCPIntegrationByName` and gets the decrypted
 * shape; the admin list view reads through `listMCPIntegrations` and
 * gets a redacted shape with `••••••••` placeholders.
 */
export function createMCPIntegrationMethods(mongoose: typeof import('mongoose')) {
  const MCPIntegration = mongoose.models.MCPIntegration as Model<MCPIntegrationDocument>;

  /**
   * Build the persistence-ready payload from a user-supplied config.
   * Deep-clones the input so callers can keep their own reference,
   * then encrypts sensitive leaves.
   */
  function encryptForPersist(config: Record<string, unknown>): Record<string, unknown> {
    return encryptMCPCredentials(structuredClone(config));
  }

  function decryptAfterRead(config: Record<string, unknown>): Record<string, unknown> {
    return decryptMCPCredentials(config);
  }

  /**
   * List integrations, redacted by default. Pass `{ redact: false }`
   * for the decrypted shape (only safe to expose to admin).
   */
  async function listMCPIntegrations(
    options: { redact?: boolean } = {},
  ): Promise<Array<Omit<MCPIntegrationDocument, 'config'> & { config: Record<string, unknown> }>> {
    const docs = await MCPIntegration.find().sort({ updatedAt: -1 }).lean();
    const redact = options.redact !== false;
    return docs.map((doc) => {
      const { config, ...rest } = doc;
      const safeConfig = redact ? redactMCPCredentials(config ?? {}) : decryptAfterRead(config ?? {});
      return { ...rest, config: safeConfig };
    });
  }

  /**
   * Find a single integration by name. Returns the decrypted shape so
   * the runtime can consume it directly. Returns `null` when missing.
   */
  async function findMCPIntegrationByName(
    name: string,
  ): Promise<(Omit<MCPIntegrationDocument, 'config'> & { config: Record<string, unknown> }) | null> {
    const doc = await MCPIntegration.findOne({ name }).lean();
    if (!doc) {
      return null;
    }
    const { config, ...rest } = doc;
    return { ...rest, config: decryptAfterRead(config ?? {}) };
  }

  /**
   * Insert or update an integration. The `name` is normalized
   * (lowercase, trimmed) and used as the natural key. Returns the
   * decrypted shape, matching the `find` contract.
   */
  async function upsertMCPIntegration(params: {
    name: string;
    title?: string;
    description?: string;
    enabled?: boolean;
    config: Record<string, unknown>;
  }): Promise<Omit<MCPIntegrationDocument, 'config'> & { config: Record<string, unknown> }> {
    const name = params.name.trim().toLowerCase();
    if (!name) {
      throw new Error('MCPIntegration name is required');
    }
    const encryptedConfig = encryptForPersist(params.config);

    const update = {
      name,
      title: params.title ?? null,
      description: params.description ?? null,
      enabled: params.enabled ?? true,
      config: encryptedConfig,
    };

    const doc = await MCPIntegration.findOneAndUpdate(
      { name },
      { $set: update },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true },
    ).lean();

    const { config, ...rest } = doc;
    return { ...rest, config: decryptAfterRead(config ?? {}) };
  }

  /**
   * Remove an integration by id or name. At least one identifier is
   * required. Returns the deleted document (decrypted) or `null` if
   * nothing matched.
   */
  async function removeMCPIntegration(
    identifier: { id?: string; name?: string },
    options: QueryOptions = {},
  ): Promise<Omit<MCPIntegrationDocument, 'config'> & { config: Record<string, unknown> } | null> {
    const filter: Record<string, unknown> = {};
    if (identifier.id) {
      filter._id = identifier.id as unknown as Types.ObjectId;
    }
    if (identifier.name) {
      filter.name = identifier.name.trim().toLowerCase();
    }
    if (Object.keys(filter).length === 0) {
      throw new Error('removeMCPIntegration requires an id or name');
    }
    const doc = await MCPIntegration.findOneAndDelete(filter, options).lean();
    if (!doc) {
      return null;
    }
    const { config, ...rest } = doc;
    return { ...rest, config: decryptAfterRead(config ?? {}) };
  }

  /**
   * Toggle the `enabled` flag without touching the encrypted config.
   * Used by the admin panel quick-toggle and by the runtime to disable
   * an integration that is misbehaving without losing credentials.
   */
  async function setMCPIntegrationEnabled(
    name: string,
    enabled: boolean,
  ): Promise<Omit<MCPIntegrationDocument, 'config'> | null> {
    const doc = await MCPIntegration.findOneAndUpdate(
      { name: name.trim().toLowerCase() },
      { $set: { enabled } },
      { new: true },
    ).lean<MCPIntegrationDocument | null>();
    if (!doc) {
      return null;
    }
    const { config: _config, ...rest } = doc;
    return rest as Omit<MCPIntegrationDocument, 'config'>;
  }

  return {
    listMCPIntegrations,
    findMCPIntegrationByName,
    upsertMCPIntegration,
    removeMCPIntegration,
    setMCPIntegrationEnabled,
  };
}

export type MCPIntegrationMethods = ReturnType<typeof createMCPIntegrationMethods>;

// Re-export the crypto helpers so the admin route layer can use them
// without an extra import path. `logger` import is here to keep the
// module side-effect surface stable if the methods grow noisy logging
// later — touching this file already imports it, and dead-code
// elimination handles the rest.
export { logger };
