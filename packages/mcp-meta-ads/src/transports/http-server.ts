/**
 * HTTP Server Transport para MCP
 *
 * Expõe o MCP server via Streamable HTTP transport (POST /mcp, GET /mcp, DELETE /mcp).
 * Auth: OAuth 2.0 Bearer token only. Headers X-Meta-* como override para debug.
 */

import express from 'express';
import type { Request, Response } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { randomUUID } from 'node:crypto';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { withAuthContext, type AuthContext } from '../utils/auth-context.js';
import { usageLogger } from '../middleware/usage-logger.js';
import { isDatabaseConfigured, getPrisma } from '../db/prisma.js';
import { decryptToken } from '../db/crypto.js';
import { oauthRouter } from '../routes/oauth.js';
import { scopeToPermission } from '../auth/oauth-utils.js';
import { docsTools, handleDocsTool, isDocsTool } from '../docs-tools.js';
import { apiTools, handleApiTool, isApiTool } from '../api-tools.js';

interface HttpServerOptions {
  port: number;
  createServer: () => Server;
}

/**
 * Cria e inicia o HTTP server com Express.
 */
export async function startHttpServer(options: HttpServerOptions): Promise<void> {
  const { port, createServer } = options;
  const app = express();
  const BASE_URL = process.env.MCP_BASE_URL || `http://localhost:${port}`;

  // ── Middleware global ──
  // Parse JSON bodies. We accept standard JSON content-types plus requests with
  // no Content-Type header (some MCP clients omit it). URL-encoded forms used by
  // the OAuth routes are handled by the OAuth router's own urlencoded() middleware.
  app.use(express.json({
    type: (req) => {
      const ct = req.headers['content-type'] || '';
      // Skip URL-encoded form bodies — they're handled by the OAuth router
      if (ct.includes('application/x-www-form-urlencoded')) return false;
      // Accept explicit JSON types or missing content-type (for MCP clients)
      return ct.includes('json') || ct === '';
    },
  }));

  // CORS para clientes web
  app.use((_req: Request, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Meta-Access-Token, X-Meta-Ad-Account-Id, Mcp-Session-Id, Authorization');
    res.header('Access-Control-Expose-Headers', 'Mcp-Session-Id');
    if (_req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    next();
  });

  // Usage logging
  app.use(usageLogger());

  // ── Public routes ──

  // Favicon (shown in Claude Desktop connector list)
  const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <circle cx="16" cy="16" r="16" fill="#1877F2"/>
  <path d="M21.2 20.6l.7-4.6h-4.4v-3c0-1.3.6-2.5 2.6-2.5h2V6.6s-1.8-.3-3.6-.3c-3.6 0-6 2.2-6 6.2V16h-4v4.6h4V32h5V20.6h3.7z" fill="#FFFFFF"/>
</svg>
`;

  const serveFavicon = (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.send(FAVICON_SVG);
  };
  app.get('/favicon.ico', serveFavicon);
  app.get('/favicon.svg', serveFavicon);
  app.get('/icon.svg', serveFavicon);
  app.get('/icon.png', serveFavicon);
  app.get('/apple-touch-icon.png', serveFavicon);

  // Health check
  app.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'mcp-meta-ads',
      timestamp: new Date().toISOString(),
      activeSessions: sessions.size,
    });
  });

  // OAuth Protected Resource Metadata (RFC 9728)
  app.get('/.well-known/oauth-protected-resource', (_req: Request, res: Response) => {
    res.json({
      resource: BASE_URL,
      resource_name: 'Meta Ads',
      resource_logo_uri: `${BASE_URL}/favicon.svg`,
      authorization_servers: [BASE_URL],
      bearer_methods_supported: ['header'],
      scopes_supported: ['ads_read', 'ads_management'],
    });
  });

  // OAuth Authorization Server Metadata (RFC 8414)
  app.get('/.well-known/oauth-authorization-server', (_req: Request, res: Response) => {
    res.json({
      issuer: BASE_URL,
      op_logo_uri: `${BASE_URL}/favicon.svg`,
      service_documentation: BASE_URL,
      authorization_endpoint: `${BASE_URL}/oauth/authorize`,
      token_endpoint: `${BASE_URL}/oauth/token`,
      registration_endpoint: `${BASE_URL}/oauth/register`,
      scopes_supported: ['ads_read', 'ads_management'],
      response_types_supported: ['code'],
      grant_types_supported: ['authorization_code', 'refresh_token'],
      token_endpoint_auth_methods_supported: ['client_secret_post'],
      code_challenge_methods_supported: ['S256'],
    });
  });

  // OAuth routes (register, authorize, token, settings)
  if (isDatabaseConfigured()) {
    app.use('/oauth', oauthRouter);
    console.log('  OAuth 2.0: /oauth/* (database-backed)');
  }

  // Rate limiting (por userId do OAuth ou IP)
  const mcpLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    limit: 100,
    keyGenerator: (req: Request) => {
      // Try to extract userId from Bearer token for per-user limiting
      // Falls back to IP if no auth header
      const authHeader = req.headers['authorization'] as string | undefined;
      if (authHeader?.startsWith('Bearer ')) {
        // Use the token itself as key (unique per user session)
        return `bearer:${authHeader.slice(7, 27)}`; // First 20 chars as key
      }
      return `ip:${ipKeyGenerator(req.ip ?? '0.0.0.0')}`;
    },
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { error: 'Rate limit exceeded', message: '100 requests/hour. Try again later.' },
  });
  app.use('/mcp', mcpLimiter);

  // ── Mapa de sessões (stateful transport) ──
  const sessions = new Map<string, { transport: StreamableHTTPServerTransport; server: Server }>();

  /**
   * Extrai auth context dos headers HTTP.
   * Priority: 1) Bearer token → resolve Meta token do DB  2) Headers X-Meta-* override  3) null → 401
   */
  async function extractAuthContext(req: Request): Promise<AuthContext | null> {
    const authHeader = req.headers['authorization'] as string | undefined;

    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const bearerToken = authHeader.slice(7);
    if (!isDatabaseConfigured()) {
      return null;
    }

    try {
      const prisma = getPrisma();
      const oauthToken = await prisma.oAuthAccessToken.findUnique({
        where: { token: bearerToken },
        include: { user: true },
      });

      if (!oauthToken || oauthToken.expiresAt <= new Date()) {
        return null;
      }

      const oauthUserId = oauthToken.userId;
      const permissions = scopeToPermission(oauthToken.scope);

      // Check for X-Meta-* header override (debug)
      const headerAccessToken = req.headers['x-meta-access-token'] as string | undefined;

      if (headerAccessToken) {
        return {
          accessToken: headerAccessToken,
          apiVersion: (req.headers['x-meta-api-version'] as string) || undefined,
          userId: oauthUserId,
          permissions,
        };
      }

      // Resolve Meta token from DB for this user
      const metaToken = await prisma.metaToken.findFirst({
        where: { userId: oauthUserId },
        orderBy: { createdAt: 'desc' },
      });

      return {
        accessToken: metaToken ? decryptToken(metaToken.accessToken) : '',
        userId: oauthUserId,
        permissions,
      };
    } catch (err) {
      console.error('[auth] Bearer token lookup failed:', err);
      return null;
    }
  }

  /**
   * Wraps handler com auth context se disponível.
   */
  async function withOptionalAuth<T>(req: Request, fn: () => T): Promise<T> {
    const authCtx = await extractAuthContext(req);
    if (authCtx) {
      return withAuthContext(authCtx, fn);
    }
    return fn();
  }

  // ── MCP Handlers (shared between / and /mcp) ──

  async function mcpBearerGuard(req: Request, res: Response, next: () => void) {
    const authHeader = req.headers['authorization'] as string | undefined;
    console.error(`[MCP] Guard — ${req.method} ${req.path}, hasAuth: ${!!authHeader}, authPrefix: ${authHeader?.substring(0, 10) || 'none'}`);

    if (authHeader?.startsWith('Bearer ')) {
      const authCtx = await extractAuthContext(req);
      if (!authCtx) {
        console.error(`[MCP] Guard — 401: Bearer token invalid or expired`);
        const resourceMetadataUrl = `${BASE_URL}/.well-known/oauth-protected-resource`;
        res.setHeader('WWW-Authenticate', `Bearer resource_metadata="${resourceMetadataUrl}"`);
        res.status(401).json({ error: 'invalid_token', error_description: 'Bearer token is invalid or expired' });
        return;
      }
      console.error(`[MCP] Guard — OK: userId=${authCtx.userId}, permissions=${authCtx.permissions}`);
    } else {
      console.error(`[MCP] Guard — 401: No Bearer token`);
      // No Bearer token at all → 401
      const resourceMetadataUrl = `${BASE_URL}/.well-known/oauth-protected-resource`;
      res.setHeader('WWW-Authenticate', `Bearer resource_metadata="${resourceMetadataUrl}"`);
      res.status(401).json({ error: 'unauthorized', error_description: 'Authorization: Bearer token required' });
      return;
    }
    next();
  }

  async function createNewSession(): Promise<{ transport: StreamableHTTPServerTransport; server: Server }> {
    const mcpServer = createServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (newSessionId) => {
        sessions.set(newSessionId, { transport, server: mcpServer });
        console.error(`[MCP] Session initialized: ${newSessionId}`);
      },
    });

    transport.onclose = () => {
      const sid = transport.sessionId;
      if (sid && sessions.has(sid)) {
        sessions.delete(sid);
        console.error(`[MCP] Session closed: ${sid}`);
      }
    };

    await mcpServer.connect(transport);
    return { transport, server: mcpServer };
  }

  async function mcpPost(req: Request, res: Response) {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;

    // Sessão existente — reutilizar transport
    if (sessionId && sessions.has(sessionId)) {
      const session = sessions.get(sessionId)!;
      await withOptionalAuth(req, () => session.transport.handleRequest(req, res, req.body));
      return;
    }

    // Nova sessão — initialize request (com ou sem session ID antigo)
    if (isInitializeRequest(req.body)) {
      const { transport } = await createNewSession();
      await withOptionalAuth(req, () => transport.handleRequest(req, res, req.body));
      return;
    }

    // Session ID expirado (server redeployado) — handle requests directly
    // The client still has a stale session ID from before the redeploy.
    // We bypass the MCP transport and execute tool calls directly.
    if (sessionId && !sessions.has(sessionId)) {
      const body = req.body;
      const method = body?.method;
      const id = body?.id;

      if (method === 'tools/call') {
        const toolName = body.params?.name as string;
        const toolArgs = body.params?.arguments || {};
        console.error(`[MCP] Stale session — direct tools/call: ${toolName}`);

        const result = await withOptionalAuth(req, async () => {
          if (isApiTool(toolName)) {
            return await handleApiTool(toolName, toolArgs);
          } else if (isDocsTool(toolName)) {
            return await handleDocsTool(toolName, toolArgs);
          }
          return { content: [{ type: 'text', text: `Tool not found: ${toolName}` }], isError: true };
        });

        res.json({ jsonrpc: '2.0', result, id });
        return;
      }

      if (method === 'tools/list') {
        console.error(`[MCP] Stale session — direct tools/list`);
        // Auth already validated by mcpBearerGuard above
        const tools = await withOptionalAuth(req, async () => [...docsTools, ...apiTools]);
        res.json({ jsonrpc: '2.0', result: { tools }, id });
        return;
      }

      // For other methods (initialize, etc.), ask client to re-initialize
      console.error(`[MCP] Stale session — unhandled method: ${method}`);
      res.status(400).json({
        jsonrpc: '2.0',
        error: { code: -32000, message: 'Session expired. Please reconnect.' },
        id,
      });
      return;
    }

    // Request inválido — sem sessão e não é initialize
    console.error(`[MCP] 400 — no sessionId, not initialize, body method: ${req.body?.method || 'N/A'}`);
    res.status(400).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: 'Bad Request: No valid session ID provided',
      },
      id: null,
    });
  }

  async function mcpGet(req: Request, res: Response) {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    if (!sessionId) {
      res.status(400).json({ error: 'Mcp-Session-Id header required for GET requests' });
      return;
    }

    const session = sessions.get(sessionId);
    if (!session) {
      console.error(`[MCP] GET stale session ${sessionId} — session expired`);
      res.status(404).json({ error: 'Session expired. Please reconnect.' });
      return;
    }

    await session.transport.handleRequest(req, res);
  }

  async function mcpDelete(req: Request, res: Response) {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    if (!sessionId) {
      res.status(400).json({ error: 'Mcp-Session-Id header required' });
      return;
    }

    const session = sessions.get(sessionId);
    if (!session) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    await session.transport.close();
    sessions.delete(sessionId);
    res.status(200).json({ message: 'Session closed' });
  }

  // Mount MCP on /mcp
  app.use('/mcp', mcpBearerGuard);
  app.post('/mcp', mcpPost);
  app.get('/mcp', mcpGet);
  app.delete('/mcp', mcpDelete);

  // Also serve MCP at root / for Claude remote connector compatibility
  // (Claude POSTs to the root URL provided by the user)
  app.post('/', mcpBearerGuard, mcpPost);
  app.get('/', mcpBearerGuard, mcpGet);
  app.delete('/', mcpBearerGuard, mcpDelete);

  // ── Start server ──
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`mcp-meta-ads HTTP server listening on http://0.0.0.0:${port}`);
    console.log(`  MCP endpoint: POST/GET/DELETE http://0.0.0.0:${port}/mcp (also at /)`);
    console.log(`  Health check: GET http://0.0.0.0:${port}/health`);
    console.log(`  OAuth metadata: GET ${BASE_URL}/.well-known/oauth-authorization-server`);
    console.log(`  Auth: OAuth 2.0 Bearer token only`);
    console.log(`  Base URL: ${BASE_URL}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n[ERROR] Port ${port} is already in use.`);
      console.error(`  Try: --port <other-port>  or  kill the process using port ${port}`);
      console.error(`  Find it: lsof -i :${port}\n`);
    } else {
      console.error(`\n[ERROR] Server failed to start:`, err.message);
    }
    process.exit(1);
  });
}
