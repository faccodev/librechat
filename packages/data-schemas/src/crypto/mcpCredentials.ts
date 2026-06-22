import { encryptV3, decryptV3 } from './index';

/**
 * Sensitive-field encryption for MCP integration credentials.
 *
 * Uses the same `CREDS_KEY` (AES-256-CTR, v3) that the rest of the
 * LibreChat credential surface uses — so the trust model matches the
 * existing token storage (any party with `CREDS_KEY` and MongoDB read
 * access can decrypt). Decision 1a from the admin MCP design.
 *
 * Sensitive fields inside an MCP integration `config` object:
 *   - `apiKey.key`                  (admin-sourced API keys)
 *   - `oauth.client_secret`         (confidential OAuth clients)
 *   - `env.<NAME>` value            (literal env values, not `${VAR}` refs)
 *
 * The encrypt step is a deep mutation; decrypt is a deep mutation. The
 * input objects are NOT cloned — callers should treat them as
 * ephemeral. This keeps allocations minimal and matches the pattern
 * used by the rest of the data-schemas layer.
 */

const ENC_PREFIX = 'v3:';
const ENV_REF_PATTERN = /^\$\{[A-Z0-9_][A-Z0-9_]*\}$/;

const isEncrypted = (value: unknown): value is string =>
  typeof value === 'string' && value.startsWith(ENC_PREFIX);

const isEnvRef = (value: unknown): value is string =>
  typeof value === 'string' && ENV_REF_PATTERN.test(value);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Walk a copy of the config tree and encrypt every sensitive leaf in
 * place. The returned object is safe to persist to MongoDB.
 *
 * Idempotent on already-encrypted leaves (re-encrypting the same v3
 * ciphertext would change the IV but the round-trip still works, so we
 * skip leaves that already carry the v3 prefix to keep the diff small).
 */
export function encryptMCPCredentials(
  config: Record<string, unknown>,
): Record<string, unknown> {
  if (!isPlainObject(config)) {
    return config;
  }

  if (isPlainObject(config.apiKey)) {
    const key = config.apiKey.key;
    if (typeof key === 'string' && key.length > 0 && !isEncrypted(key)) {
      config.apiKey = { ...config.apiKey, key: encryptV3(key) };
    }
  }

  if (isPlainObject(config.oauth)) {
    const secret = config.oauth.client_secret;
    if (typeof secret === 'string' && secret.length > 0 && !isEncrypted(secret)) {
      config.oauth = { ...config.oauth, client_secret: encryptV3(secret) };
    }
  }

  if (isPlainObject(config.env)) {
    const nextEnv: Record<string, string> = {};
    let touched = false;
    for (const [name, value] of Object.entries(config.env)) {
      if (typeof value === 'string' && value.length > 0 && !isEnvRef(value) && !isEncrypted(value)) {
        nextEnv[name] = encryptV3(value);
        touched = true;
      } else {
        nextEnv[name] = value as string;
      }
    }
    if (touched) {
      config.env = nextEnv;
    }
  }

  return config;
}

/**
 * Inverse of `encryptMCPCredentials`. Walks the same tree and decrypts
 * any v3-prefixed leaves. Safe to call on plaintext configs — leaves
 * that are not v3-prefixed are returned untouched.
 */
export function decryptMCPCredentials(
  config: Record<string, unknown>,
): Record<string, unknown> {
  if (!isPlainObject(config)) {
    return config;
  }

  if (isPlainObject(config.apiKey)) {
    const key = config.apiKey.key;
    if (isEncrypted(key)) {
      config.apiKey = { ...config.apiKey, key: decryptV3(key) };
    }
  }

  if (isPlainObject(config.oauth)) {
    const secret = config.oauth.client_secret;
    if (isEncrypted(secret)) {
      config.oauth = { ...config.oauth, client_secret: decryptV3(secret) };
    }
  }

  if (isPlainObject(config.env)) {
    const nextEnv: Record<string, string> = {};
    let touched = false;
    for (const [name, value] of Object.entries(config.env)) {
      if (isEncrypted(value)) {
        nextEnv[name] = decryptV3(value);
        touched = true;
      } else {
        nextEnv[name] = value as string;
      }
    }
    if (touched) {
      config.env = nextEnv;
    }
  }

  return config;
}

/**
 * Build a redacted summary of an MCPIntegrationDocument suitable for
 * list views. Sensitive leaves are replaced with a sentinel so the
 * caller never accidentally renders a decrypted secret.
 */
export function redactMCPCredentials(
  config: Record<string, unknown>,
): Record<string, unknown> {
  const REDACTED = '••••••••' as const;
  if (!isPlainObject(config)) {
    return config;
  }

  const next: Record<string, unknown> = { ...config };

  const apiKeyNode = next.apiKey;
  if (isPlainObject(apiKeyNode)) {
    const masked = { ...apiKeyNode };
    if (typeof masked.key === 'string' && masked.key.length > 0) {
      masked.key = REDACTED;
    }
    next.apiKey = masked;
  }

  const oauthNode = next.oauth;
  if (isPlainObject(oauthNode)) {
    const masked = { ...oauthNode };
    if (typeof masked.client_secret === 'string' && masked.client_secret.length > 0) {
      masked.client_secret = REDACTED;
    }
    next.oauth = masked;
  }

  if (isPlainObject(next.env)) {
    const nextEnv: Record<string, string> = {};
    for (const [name, value] of Object.entries(next.env)) {
      if (typeof value === 'string' && value.length > 0 && !isEnvRef(value)) {
        nextEnv[name] = REDACTED;
      } else {
        nextEnv[name] = value as string;
      }
    }
    next.env = nextEnv;
  }

  return next;
}
