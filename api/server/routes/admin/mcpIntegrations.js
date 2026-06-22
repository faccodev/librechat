const express = require('express');
const { z } = require('zod');
const { MCPOptionsSchema } = require('librechat-data-provider');
const { SystemCapabilities, logger } = require('@librechat/data-schemas');
const { requireCapability } = require('~/server/middleware/roles/capabilities');
const { requireJwtAuth } = require('~/server/middleware');
const db = require('~/models');

const router = express.Router();

const requireAdminAccess = requireCapability(SystemCapabilities.ACCESS_ADMIN);

/**
 * The :name URL param is the same kebab/snake identifier used as the
 * `mcpServers.<name>` key in `librechat.yaml`. We restrict it to a
 * conservative charset so it can be interpolated into file paths,
 * env-var names, and OAuth redirect URIs without escaping.
 */
const nameParamSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[a-z0-9][a-z0-9_-]*$/i, 'name must be alphanumeric with - or _');

/**
 * Body of PUT /api/admin/mcp-integrations/:name. `name` and `config`
 * are required; everything else is optional with sensible defaults.
 *
 * The `config` field is validated against the same `MCPOptionsSchema`
 * the YAML loader uses, so admin-entered integrations match the
 * runtime contract byte-for-byte.
 */
const upsertBodySchema = z.object({
  title: z.string().max(256).optional(),
  description: z.string().max(2000).optional(),
  enabled: z.boolean().optional(),
  config: MCPOptionsSchema,
});

router.use(requireJwtAuth, requireAdminAccess);

/**
 * GET /api/admin/mcp-integrations
 *
 * Lists every stored integration. Sensitive fields (`apiKey.key`,
 * `oauth.client_secret`, literal `env.*` values) are redacted to
 * `••••••••` so the response is safe to render directly in the admin
 * panel.
 */
router.get('/', async (req, res) => {
  try {
    const items = await db.listMCPIntegrations({ redact: true });
    return res.status(200).json({ items });
  } catch (error) {
    logger.error('[/api/admin/mcp-integrations] list failed', error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/admin/mcp-integrations/:name
 *
 * Returns the decrypted integration. Admin-only — the response
 * contains plaintext credentials. Returns 404 if not found.
 */
router.get('/:name', async (req, res) => {
  try {
    const nameParse = nameParamSchema.safeParse(req.params.name);
    if (!nameParse.success) {
      return res.status(400).json({ error: 'Invalid integration name' });
    }
    const integration = await db.findMCPIntegrationByName(nameParse.data);
    if (!integration) {
      return res.status(404).json({ error: 'Integration not found' });
    }
    return res.status(200).json(integration);
  } catch (error) {
    logger.error('[/api/admin/mcp-integrations/:name] get failed', error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/admin/mcp-integrations/:name
 *
 * Creates or updates an integration. Body is validated against
 * `MCPOptionsSchema`; on success the encrypted config is stored and
 * the decrypted shape is returned so the admin panel can refresh its
 * view without a second round-trip.
 */
router.put('/:name', async (req, res) => {
  try {
    const nameParse = nameParamSchema.safeParse(req.params.name);
    if (!nameParse.success) {
      return res.status(400).json({ error: 'Invalid integration name' });
    }
    const bodyParse = upsertBodySchema.safeParse(req.body);
    if (!bodyParse.success) {
      return res
        .status(400)
        .json({ error: 'Invalid integration payload', details: bodyParse.error.flatten() });
    }
    const saved = await db.upsertMCPIntegration({
      name: nameParse.data,
      title: bodyParse.data.title,
      description: bodyParse.data.description,
      enabled: bodyParse.data.enabled,
      config: bodyParse.data.config,
    });
    return res.status(200).json(saved);
  } catch (error) {
    logger.error('[/api/admin/mcp-integrations/:name] upsert failed', error);
    return res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/admin/mcp-integrations/:name
 *
 * Removes an integration. Idempotent — 404 if the name is unknown so
 * the admin panel can distinguish "already gone" from "actually
 * removed". The runtime should treat 404 on DELETE as success.
 */
router.delete('/:name', async (req, res) => {
  try {
    const nameParse = nameParamSchema.safeParse(req.params.name);
    if (!nameParse.success) {
      return res.status(400).json({ error: 'Invalid integration name' });
    }
    const removed = await db.removeMCPIntegration({ name: nameParse.data });
    if (!removed) {
      return res.status(404).json({ error: 'Integration not found' });
    }
    return res.status(200).json({ removed: true, name: nameParse.data });
  } catch (error) {
    logger.error('[/api/admin/mcp-integrations/:name] delete failed', error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
