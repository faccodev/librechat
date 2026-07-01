/**
 * OAuth 2.0 Routes for MCP (Claude Connectors)
 *
 * Implements:
 * - POST /oauth/register  (RFC 7591 Dynamic Client Registration)
 * - GET  /oauth/authorize  (renders login page)
 * - POST /oauth/authorize  (handles login/register + issues auth code)
 * - POST /oauth/token      (exchanges code/refresh_token for access token)
 */

import express, { Router } from 'express';
import type { Request, Response } from 'express';
import { getPrisma } from '../db/prisma.js';
import {
  generateClientSecret,
  generateAuthCode,
  generateToken,
  hashPassword,
  verifyPassword,
  verifyPkceS256,
  scopeToPermission,
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_TTL,
  AUTH_CODE_TTL,
} from '../auth/oauth-utils.js';
import { encryptToken } from '../db/crypto.js';
import type { Prisma } from '../generated/prisma/client.js';

const router = Router();

// Parse URL-encoded form bodies (RFC 6749 requires form-encoded for /token and /authorize)
router.use(express.urlencoded({ extended: false }));

// ── POST /oauth/register — Dynamic Client Registration (RFC 7591) ──

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { client_name, redirect_uris, grant_types } = req.body;

    if (!client_name || !redirect_uris || !Array.isArray(redirect_uris) || redirect_uris.length === 0) {
      res.status(400).json({
        error: 'invalid_client_metadata',
        error_description: 'client_name and redirect_uris (non-empty array) are required',
      });
      return;
    }

    const clientSecret = generateClientSecret();
    const prisma = getPrisma();

    const client = await prisma.oAuthClient.create({
      data: {
        clientName: client_name,
        clientSecret: clientSecret,
        redirectUris: redirect_uris,
        grantTypes: grant_types || ['authorization_code', 'refresh_token'],
      },
    });

    res.status(201).json({
      client_id: client.id,
      client_secret: clientSecret,
      client_name: client.clientName,
      redirect_uris: client.redirectUris,
      grant_types: client.grantTypes,
      token_endpoint_auth_method: 'client_secret_post',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[oauth/register]', message);
    res.status(500).json({ error: 'server_error', error_description: message });
  }
});

// ── GET /oauth/authorize — Render login page ──

router.get('/authorize', async (req: Request, res: Response) => {
  const { client_id, redirect_uri, response_type, code_challenge, code_challenge_method, state, scope } = req.query;

  if (response_type !== 'code') {
    res.status(400).json({ error: 'unsupported_response_type', error_description: 'Only response_type=code is supported' });
    return;
  }

  if (!client_id || !redirect_uri || !code_challenge) {
    res.status(400).json({ error: 'invalid_request', error_description: 'client_id, redirect_uri, and code_challenge are required' });
    return;
  }

  if (code_challenge_method && code_challenge_method !== 'S256') {
    res.status(400).json({ error: 'invalid_request', error_description: 'Only code_challenge_method=S256 is supported' });
    return;
  }

  // Validate client exists
  try {
    const prisma = getPrisma();
    const client = await prisma.oAuthClient.findUnique({ where: { id: client_id as string } });
    if (!client) {
      res.status(400).json({ error: 'invalid_client', error_description: 'Unknown client_id' });
      return;
    }

    if (!client.redirectUris.includes(redirect_uri as string)) {
      res.status(400).json({ error: 'invalid_request', error_description: 'redirect_uri not registered for this client' });
      return;
    }
  } catch (err) {
    console.error('[oauth/authorize] Client lookup failed:', err);
    res.status(500).json({ error: 'server_error' });
    return;
  }

  // Render inline login/register HTML
  const html = renderLoginPage({
    client_id: client_id as string,
    redirect_uri: redirect_uri as string,
    code_challenge: code_challenge as string,
    code_challenge_method: (code_challenge_method as string) || 'S256',
    state: (state as string) || '',
    scope: (scope as string) || '',
  });

  res.type('html').send(html);
});

// ── POST /oauth/authorize — Handle login/register form submission ──

router.post('/authorize', async (req: Request, res: Response) => {
  const { email, password, action, client_id, redirect_uri, code_challenge, code_challenge_method, state, scope } = req.body;

  if (!email || !password) {
    res.status(400).type('html').send(renderLoginPage({
      client_id, redirect_uri, code_challenge, code_challenge_method: code_challenge_method || 'S256', state: state || '', scope: scope || '',
      error: 'Email and password are required',
    }));
    return;
  }

  if (!client_id || !redirect_uri || !code_challenge) {
    res.status(400).json({ error: 'invalid_request', error_description: 'Missing OAuth parameters' });
    return;
  }

  try {
    const prisma = getPrisma();
    let user;

    if (action === 'register') {
      // Check if user already exists — auto-fallback to login
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        // If email exists and has password, try to log them in automatically
        if (existing.passwordHash && verifyPassword(password, existing.passwordHash)) {
          user = existing;
        } else {
          res.status(401).type('html').send(renderLoginPage({
            client_id, redirect_uri, code_challenge, code_challenge_method: code_challenge_method || 'S256', state: state || '', scope: scope || '',
            error: existing.passwordHash
              ? 'An account with this email already exists. Check your password and click Sign In.'
              : 'An account with this email exists but has no password. Contact support.',
          }));
          return;
        }
      } else {
        user = await prisma.user.create({
          data: {
            email,
            passwordHash: hashPassword(password),
          },
        });
      }
    } else {
      // Login
      user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.passwordHash) {
        res.status(401).type('html').send(renderLoginPage({
          client_id, redirect_uri, code_challenge, code_challenge_method: code_challenge_method || 'S256', state: state || '', scope: scope || '',
          error: 'Invalid email or password',
        }));
        return;
      }

      if (!verifyPassword(password, user.passwordHash)) {
        res.status(401).type('html').send(renderLoginPage({
          client_id, redirect_uri, code_challenge, code_challenge_method: code_challenge_method || 'S256', state: state || '', scope: scope || '',
          error: 'Invalid email or password',
        }));
        return;
      }
    }

    // Create authorization code with PKCE challenge
    const code = generateAuthCode();
    await prisma.authorizationCode.create({
      data: {
        code,
        clientId: client_id,
        userId: user.id,
        redirectUri: redirect_uri,
        scope: scope || '',
        codeChallenge: code_challenge,
        codeChallengeMethod: code_challenge_method || 'S256',
        expiresAt: new Date(Date.now() + AUTH_CODE_TTL),
      },
    });

    // Always redirect to settings page (user can configure Meta token before returning to client)
    const settingsParams = new URLSearchParams({ code, redirect_uri });
    if (state) settingsParams.set('state', state);
    res.redirect(302, `/oauth/settings?${settingsParams.toString()}`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[oauth/authorize POST]', message);
    res.status(500).type('html').send(renderLoginPage({
      client_id, redirect_uri, code_challenge, code_challenge_method: code_challenge_method || 'S256', state: state || '', scope: scope || '',
      error: 'An unexpected error occurred. Please try again.',
    }));
  }
});

// ── POST /oauth/token — Token exchange ──

router.post('/token', async (req: Request, res: Response) => {
  const { grant_type, code, redirect_uri, code_verifier, client_id, client_secret, refresh_token } = req.body;

  try {
    const prisma = getPrisma();

    if (grant_type === 'authorization_code') {
      // Validate required params
      if (!code || !redirect_uri || !code_verifier || !client_id) {
        res.status(400).json({ error: 'invalid_request', error_description: 'code, redirect_uri, code_verifier, and client_id are required' });
        return;
      }

      // Validate client
      const client = await prisma.oAuthClient.findUnique({ where: { id: client_id } });
      if (!client) {
        res.status(401).json({ error: 'invalid_client' });
        return;
      }
      if (client_secret && client.clientSecret !== client_secret) {
        res.status(401).json({ error: 'invalid_client', error_description: 'Invalid client secret' });
        return;
      }

      // Lookup authorization code
      const authCode = await prisma.authorizationCode.findUnique({ where: { code } });
      if (!authCode) {
        res.status(400).json({ error: 'invalid_grant', error_description: 'Invalid authorization code' });
        return;
      }

      // Validate code
      if (authCode.used) {
        res.status(400).json({ error: 'invalid_grant', error_description: 'Authorization code already used' });
        return;
      }
      if (authCode.expiresAt < new Date()) {
        res.status(400).json({ error: 'invalid_grant', error_description: 'Authorization code expired' });
        return;
      }
      if (authCode.clientId !== client_id) {
        res.status(400).json({ error: 'invalid_grant', error_description: 'Client mismatch' });
        return;
      }
      if (authCode.redirectUri !== redirect_uri) {
        res.status(400).json({ error: 'invalid_grant', error_description: 'redirect_uri mismatch' });
        return;
      }

      // Verify PKCE
      if (!verifyPkceS256(code_verifier, authCode.codeChallenge)) {
        res.status(400).json({ error: 'invalid_grant', error_description: 'PKCE verification failed' });
        return;
      }

      // Mark code as used
      await prisma.authorizationCode.update({ where: { code }, data: { used: true } });

      // Issue tokens
      const accessToken = generateToken();
      const refreshTokenValue = generateToken();

      await prisma.oAuthAccessToken.create({
        data: {
          token: accessToken,
          clientId: client_id,
          userId: authCode.userId,
          scope: authCode.scope,
          expiresAt: new Date(Date.now() + ACCESS_TOKEN_TTL),
          refreshToken: refreshTokenValue,
        },
      });

      res.json({
        access_token: accessToken,
        token_type: 'bearer',
        expires_in: ACCESS_TOKEN_TTL / 1000,
        scope: authCode.scope,
        refresh_token: refreshTokenValue,
      });
    } else if (grant_type === 'refresh_token') {
      if (!refresh_token || !client_id) {
        res.status(400).json({ error: 'invalid_request', error_description: 'refresh_token and client_id are required' });
        return;
      }

      // Validate client
      const client = await prisma.oAuthClient.findUnique({ where: { id: client_id } });
      if (!client) {
        res.status(401).json({ error: 'invalid_client' });
        return;
      }
      if (client_secret && client.clientSecret !== client_secret) {
        res.status(401).json({ error: 'invalid_client', error_description: 'Invalid client secret' });
        return;
      }

      // Rotate tokens atomically
      const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const oldToken = await tx.oAuthAccessToken.findUnique({ where: { refreshToken: refresh_token } });
        if (!oldToken) return null;
        if (oldToken.clientId !== client_id) return null;

        // Delete old token
        await tx.oAuthAccessToken.delete({ where: { token: oldToken.token } });

        // Create new tokens
        const newAccessToken = generateToken();
        const newRefreshToken = generateToken();

        const created = await tx.oAuthAccessToken.create({
          data: {
            token: newAccessToken,
            clientId: client_id,
            userId: oldToken.userId,
            scope: oldToken.scope,
            expiresAt: new Date(Date.now() + ACCESS_TOKEN_TTL),
            refreshToken: newRefreshToken,
          },
        });

        return created;
      });

      if (!result) {
        res.status(400).json({ error: 'invalid_grant', error_description: 'Invalid refresh token' });
        return;
      }

      res.json({
        access_token: result.token,
        token_type: 'bearer',
        expires_in: ACCESS_TOKEN_TTL / 1000,
        scope: result.scope,
        refresh_token: result.refreshToken,
      });
    } else {
      res.status(400).json({ error: 'unsupported_grant_type', error_description: 'Only authorization_code and refresh_token are supported' });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[oauth/token]', message);
    res.status(500).json({ error: 'server_error', error_description: message });
  }
});

// ── Login Page HTML ──

interface LoginPageParams {
  client_id: string;
  redirect_uri: string;
  code_challenge: string;
  code_challenge_method: string;
  state: string;
  scope: string;
  error?: string;
}

function renderLoginPage(params: LoginPageParams): string {
  const { client_id, redirect_uri, code_challenge, code_challenge_method, state, scope, error } = params;

  const escapeHtml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign In — FB Marketing MCP</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .card { background: white; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); padding: 2rem; width: 100%; max-width: 400px; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #1a1a1a; }
    p.subtitle { color: #666; margin-bottom: 1.5rem; font-size: 0.9rem; }
    .error { background: #fee; border: 1px solid #fcc; color: #c33; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.9rem; }
    label { display: block; margin-bottom: 0.25rem; font-weight: 500; font-size: 0.9rem; color: #333; }
    input[type="email"], input[type="password"] { width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; margin-bottom: 1rem; }
    input:focus { outline: none; border-color: #0066cc; box-shadow: 0 0 0 3px rgba(0,102,204,0.1); }
    .actions { display: flex; gap: 0.5rem; }
    button { flex: 1; padding: 0.7rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; font-weight: 500; }
    button[name="action"][value="login"] { background: #0066cc; color: white; }
    button[name="action"][value="login"]:hover { background: #0052a3; }
    button[name="action"][value="register"] { background: #e8e8e8; color: #333; }
    button[name="action"][value="register"]:hover { background: #ddd; }
  </style>
</head>
<body>
  <div class="card">
    <h1>FB Marketing MCP</h1>
    <p class="subtitle">Sign in to connect your account</p>
    ${error ? `<div class="error">${escapeHtml(error)}</div>` : ''}
    <form method="POST" action="/oauth/authorize">
      <input type="hidden" name="client_id" value="${escapeHtml(client_id)}">
      <input type="hidden" name="redirect_uri" value="${escapeHtml(redirect_uri)}">
      <input type="hidden" name="code_challenge" value="${escapeHtml(code_challenge)}">
      <input type="hidden" name="code_challenge_method" value="${escapeHtml(code_challenge_method)}">
      <input type="hidden" name="state" value="${escapeHtml(state)}">
      <input type="hidden" name="scope" value="${escapeHtml(scope)}">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required autocomplete="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required autocomplete="current-password" minlength="8">
      <div class="actions">
        <button type="submit" name="action" value="login">Sign In</button>
        <button type="submit" name="action" value="register">Register</button>
      </div>
    </form>
  </div>
</body>
</html>`;
}

// ── GET /oauth/settings — Render Meta token settings page ──

router.get('/settings', async (req: Request, res: Response) => {
  const { code, redirect_uri, state } = req.query;

  if (!code || !redirect_uri) {
    res.status(400).json({ error: 'invalid_request', error_description: 'code and redirect_uri are required' });
    return;
  }

  try {
    const prisma = getPrisma();

    // Validate the auth code and get user
    const authCode = await prisma.authorizationCode.findUnique({ where: { code: code as string } });
    if (!authCode || authCode.used || authCode.expiresAt < new Date()) {
      res.status(400).json({ error: 'invalid_grant', error_description: 'Invalid or expired authorization code' });
      return;
    }

    // Check if user already has a Meta token
    const existingToken = await prisma.metaToken.findFirst({
      where: { userId: authCode.userId },
      orderBy: { createdAt: 'desc' },
    });

    const html = renderSettingsPage({
      code: code as string,
      redirect_uri: redirect_uri as string,
      state: (state as string) || '',
      maskedToken: existingToken ? maskToken(existingToken.accessToken) : null,
    });

    res.type('html').send(html);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[oauth/settings GET]', message);
    res.status(500).json({ error: 'server_error', error_description: message });
  }
});

// ── POST /oauth/settings — Save Meta token and redirect ──

router.post('/settings', async (req: Request, res: Response) => {
  const { meta_access_token, code, redirect_uri, state } = req.body;

  if (!code || !redirect_uri) {
    res.status(400).json({ error: 'invalid_request', error_description: 'code and redirect_uri are required' });
    return;
  }

  try {
    const prisma = getPrisma();

    // Validate the auth code and get user
    const authCode = await prisma.authorizationCode.findUnique({ where: { code } });
    if (!authCode || authCode.used || authCode.expiresAt < new Date()) {
      res.status(400).json({ error: 'invalid_grant', error_description: 'Invalid or expired authorization code' });
      return;
    }

    // If token is provided, upsert Meta token
    if (meta_access_token) {
      // Delete existing tokens for this user
      await prisma.metaToken.deleteMany({ where: { userId: authCode.userId } });

      await prisma.metaToken.create({
        data: {
          userId: authCode.userId,
          accessToken: encryptToken(meta_access_token),
        },
      });
    }

    // Redirect back to client with code
    const redirectUrl = new URL(redirect_uri);
    redirectUrl.searchParams.set('code', code);
    if (state) redirectUrl.searchParams.set('state', state);

    res.redirect(302, redirectUrl.toString());
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[oauth/settings POST]', message);
    res.status(500).json({ error: 'server_error', error_description: message });
  }
});

// ── Helpers for masking ──

function maskToken(encrypted: string): string {
  // We can't decrypt here easily — just show a generic masked indicator
  // If it starts with common Meta token prefix after decryption, show partial
  return 'EAA...xxxx';
}

// ── Settings Page HTML ──

interface SettingsPageParams {
  code: string;
  redirect_uri: string;
  state: string;
  maskedToken: string | null;
  error?: string;
}

function renderSettingsPage(params: SettingsPageParams): string {
  const { code, redirect_uri, state, maskedToken, error } = params;

  const escapeHtml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const hasExisting = maskedToken !== null;

  // Build the "Continue without changes" redirect URL
  const skipUrl = new URL(redirect_uri);
  skipUrl.searchParams.set('code', code);
  if (state) skipUrl.searchParams.set('state', state);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Configure Meta Token — FB Marketing MCP</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .card { background: white; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.1); padding: 2rem; width: 100%; max-width: 480px; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; color: #1a1a1a; }
    p.subtitle { color: #666; margin-bottom: 1.5rem; font-size: 0.9rem; }
    .error { background: #fee; border: 1px solid #fcc; color: #c33; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.9rem; }
    .current-token { background: #f0f7ff; border: 1px solid #cce0ff; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.85rem; color: #336; }
    .current-token strong { display: block; margin-bottom: 0.25rem; color: #004; }
    label { display: block; margin-bottom: 0.25rem; font-weight: 500; font-size: 0.9rem; color: #333; }
    .helper { font-size: 0.8rem; color: #888; margin-bottom: 0.75rem; }
    input[type="text"], textarea { width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; margin-bottom: 0.25rem; font-family: inherit; }
    textarea { resize: vertical; min-height: 60px; }
    input:focus, textarea:focus { outline: none; border-color: #0066cc; box-shadow: 0 0 0 3px rgba(0,102,204,0.1); }
    .actions { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
    button { width: 100%; padding: 0.7rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; font-weight: 500; background: #0066cc; color: white; }
    button:hover { background: #0052a3; }
    .skip-link { text-align: center; }
    .skip-link a { color: #666; font-size: 0.9rem; text-decoration: none; }
    .skip-link a:hover { color: #333; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Configure Meta Token</h1>
    <p class="subtitle">Set up your Meta API access to use marketing tools</p>
    ${error ? `<div class="error">${escapeHtml(error)}</div>` : ''}
    ${hasExisting ? `<div class="current-token"><strong>Current token configured</strong>Token: ${escapeHtml(maskedToken!)}</div>` : ''}
    <form method="POST" action="/oauth/settings">
      <input type="hidden" name="code" value="${escapeHtml(code)}">
      <input type="hidden" name="redirect_uri" value="${escapeHtml(redirect_uri)}">
      <input type="hidden" name="state" value="${escapeHtml(state)}">
      <label for="meta_access_token">Meta Access Token</label>
      <textarea id="meta_access_token" name="meta_access_token" placeholder="EAA..." rows="3"></textarea>
      ${hasExisting ? '<p class="helper">Leave blank to keep current token</p>' : '<p class="helper">Get your token from Meta Business Suite</p>'}
      <div class="actions">
        <button type="submit">Save &amp; Continue</button>
        ${hasExisting ? `<div class="skip-link"><a href="${escapeHtml(skipUrl.toString())}">Continue without changes &rarr;</a></div>` : ''}
      </div>
    </form>
  </div>
</body>
</html>`;
}

export { router as oauthRouter };
