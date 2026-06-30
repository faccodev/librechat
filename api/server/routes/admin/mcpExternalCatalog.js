/**
 * Admin routes for browsing the Official MCP Registry
 * (registry.modelcontextprotocol.io, v0.1 API freeze).
 *
 * All routes are gated by `requireJwtAuth + requireAdminAccess` so
 * only admins can hit them. The browser never fetches the upstream
 * directly — we proxy and cache, hiding the upstream URL and
 * rate-limit surface from clients.
 *
 * Endpoints:
 *   GET  /api/admin/mcp-external-catalog/servers
 *   GET  /api/admin/mcp-external-catalog/servers/:name
 *   POST /api/admin/mcp-external-catalog/servers/:name/preview
 *   GET  /api/admin/mcp-external-catalog/health
 *
 * Feature flag:
 *   MCP_REGISTRY_ENABLED (default: false). When disabled the router
 *   responds 404 to every route — no upstream calls, no DB writes,
 *   no cache reads. Operators can flip the env var and restart the
 *   server to roll out the feature.
 */

const express = require('express');
const { z } = require('zod');
const { SystemCapabilities, logger } = require('@librechat/data-schemas');
const { requireCapability } = require('~/server/middleware/roles/capabilities');
const { requireJwtAuth } = require('~/server/middleware');
const {
  RegistryClientError,
  adaptRegistryServer,
  getRegistryClient,
} = require('@librechat/api');

const router = express.Router();
const requireAdminAccess = requireCapability(SystemCapabilities.ACCESS_ADMIN);

const FEATURE_ENABLED = process.env.MCP_REGISTRY_ENABLED === 'true';

/**
 * Short, conservative charset for the `:name` URL param — matches the
 * pattern the upstream registry uses (`io.github.<owner>/<name>` and
 * similar). We restrict to a known-safe set so it can flow through
 * logging, error messages, and the adapter without escaping.
 */
const nameParamSchema = z
  .string()
  .min(1)
  .max(256)
  .regex(/^[A-Za-z0-9][A-Za-z0-9._/:-]*$/, 'invalid registry server name');

const listQuerySchema = z.object({
  search: z.string().max(200).optional(),
  cursor: z.string().max(1024).optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
});

const previewBodySchema = z
  .object({
    mode: z.enum(['admin', 'user']).default('admin'),
    preferredRemoteIndex: z.number().int().min(0).max(32).optional(),
  })
  .default({ mode: 'admin' });

/**
 * When the feature flag is off, every route short-circuits to 404.
 * Returning 404 (instead of 403) lets us flip the flag without changing
 * client code; the Browse Registry tab simply doesn't render its
 * content and falls back to the existing Custom tab.
 */
function disabledIfFlagOff(req, res, next) {
  if (!FEATURE_ENABLED) {
    return res.status(404).json({ error: 'External MCP catalog is disabled' });
  }
  return next();
}

router.use(requireJwtAuth, requireAdminAccess, disabledIfFlagOff);

/**
 * GET /api/admin/mcp-external-catalog/servers
 *
 * Query: ?search=&cursor=&limit=
 * Lists catalog entries. Cache hits return identical payloads with
 * the same `cachedAt` stamp so the frontend can display "Catalog
 * refreshed X minutes ago" without a second round-trip.
 */
router.get('/servers', async (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid query parameters',
      details: parsed.error.flatten(),
    });
  }

  try {
    const result = await getRegistryClient().listServers(parsed.data);
    return res.status(200).json(result);
  } catch (error) {
    return handleClientError(error, res, 'list servers');
  }
});

/**
 * GET /api/admin/mcp-external-catalog/servers/:name
 *
 * Returns the latest version of a single registry entry as-is (raw
 * ServerJSON shape). Useful for "Details" UI that wants to show
 * fields the adapter does not consume (icons, websiteUrl, etc).
 *
 * Note on the regex path: registry server names commonly contain `/`
 * (e.g. `io.github.<owner>/<repo>`). Express 5's path-to-regexp
 * rejects `/` inside a `:name` param, so we capture with a named
 * regex group that allows embedded slashes and `:`-prefixed numeric
 * port hints. The captured value is validated against the
 * conservative `nameParamSchema` below before any upstream call.
 * Anything else (whitespace, control chars, etc) is rejected at the
 * route level with a 400.
 */
const REGISTRY_NAME_RE = '\\/servers\\/(?<name>[A-Za-z0-9][A-Za-z0-9._/:\\-]{0,255})';

router.get(new RegExp(`^${REGISTRY_NAME_RE}\\/?$`), async (req, res) => {
  const name = req.params.name;
  const parsed = nameParamSchema.safeParse(req.params.name);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid server name' });
  }

  try {
    const server = await getRegistryClient().getServer(parsed.data);
    if (!server) {
      return res.status(404).json({ error: 'Server not found in registry' });
    }
    return res.status(200).json(server);
  } catch (error) {
    return handleClientError(error, res, 'fetch server');
  }
});

/**
 * POST /api/admin/mcp-external-catalog/servers/:name/preview
 *
 * Body: { mode?: 'admin' | 'user', preferredRemoteIndex?: number }
 *
 * Returns a converted `MCPOptions`-shaped config plus the metadata
 * the UI needs to render the install drawer (env var placeholders,
 * OAuth hint, warnings). Does NOT persist anything — the caller
 * reviews the config and POSTs to the existing admin or user MCP
 * creation endpoint.
 *
 * Mode `user` rejects stdio-only entries with HTTP 400; mode `admin`
 * surfaces them with HTTP 422 + a manual-install hint.
 */
router.post(new RegExp(`^${REGISTRY_NAME_RE}\\/preview\\/?$`), async (req, res) => {
  const nameParsed = nameParamSchema.safeParse(req.params.name);
  if (!nameParsed.success) {
    return res.status(400).json({ error: 'Invalid server name' });
  }

  const bodyParsed = previewBodySchema.safeParse(req.body ?? {});
  if (!bodyParsed.success) {
    return res
      .status(400)
      .json({ error: 'Invalid preview payload', details: bodyParsed.error.flatten() });
  }

  try {
    const server = await getRegistryClient().getServer(nameParsed.data);
    if (!server) {
      return res.status(404).json({ error: 'Server not found in registry' });
    }

    const adapted = adaptRegistryServer(server, bodyParsed.data);
    if (!adapted.ok) {
      return res.status(adapted.status).json({ error: adapted.error });
    }
    return res.status(200).json(adapted.preview);
  } catch (error) {
    return handleClientError(error, res, 'preview server');
  }
});

/**
 * GET /api/admin/mcp-external-catalog/health
 *
 * Diagnostic endpoint for operators. Surfaces cache stats and the
 * current feature-flag state. Intentionally minimal — no DB writes,
 * no upstream call (we report last-known cache health, not a live
 * ping, so this endpoint stays cheap and never trips the upstream
 * rate limit).
 */
router.get('/health', (_req, res) => {
  return res.status(200).json({
    enabled: FEATURE_ENABLED,
    cache: getRegistryClient().getCacheStats(),
  });
});

function handleClientError(error, res, label) {
  if (error instanceof RegistryClientError) {
    logger.warn(`[/api/admin/mcp-external-catalog] ${label} failed`, {
      status: error.status,
      upstreamStatus: error.upstreamStatus,
      message: error.message,
    });
    return res.status(error.status).json({ error: error.message });
  }
  logger.error(`[/api/admin/mcp-external-catalog] ${label} crashed`, error);
  return res.status(500).json({ error: 'Internal error' });
}

module.exports = router;