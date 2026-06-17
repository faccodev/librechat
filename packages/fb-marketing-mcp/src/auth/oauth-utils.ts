/**
 * OAuth 2.0 Utility Functions
 *
 * Pure functions using only node:crypto. No external dependencies.
 * Handles PKCE S256, password hashing (scrypt), and token generation.
 */

import { randomUUID, createHash, scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';

// ── Constants ──

/** Access token time-to-live: 1 hour */
export const ACCESS_TOKEN_TTL = 60 * 60 * 1000;

/** Refresh token time-to-live: 30 days */
export const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000;

/** Authorization code time-to-live: 10 minutes */
export const AUTH_CODE_TTL = 10 * 60 * 1000;

// ── PKCE ──

/**
 * Verifies a PKCE S256 code_verifier against the stored code_challenge.
 * challenge = BASE64URL(SHA256(verifier))
 */
export function verifyPkceS256(codeVerifier: string, codeChallenge: string): boolean {
  const hash = createHash('sha256').update(codeVerifier).digest('base64url');
  const hashBuf = Buffer.from(hash);
  const challengeBuf = Buffer.from(codeChallenge);
  if (hashBuf.length !== challengeBuf.length) return false;
  return timingSafeEqual(hashBuf, challengeBuf);
}

// ── Password Hashing (scrypt) ──

const SCRYPT_KEYLEN = 64;
const SALT_LENGTH = 16;

/**
 * Hashes a password using scrypt with a random salt.
 * Returns: "salt_hex:hash_hex"
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LENGTH);
  const derived = scryptSync(password, salt, SCRYPT_KEYLEN);
  return `${salt.toString('hex')}:${derived.toString('hex')}`;
}

/**
 * Verifies a password against a stored hash (from hashPassword).
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  const [saltHex, hashHex] = storedHash.split(':');
  if (!saltHex || !hashHex) return false;

  const salt = Buffer.from(saltHex, 'hex');
  const expected = Buffer.from(hashHex, 'hex');
  const derived = scryptSync(password, salt, SCRYPT_KEYLEN);

  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

// ── Token/Code Generation ──

/** Generates a random access/refresh token. */
export function generateToken(): string {
  return randomUUID() + randomUUID().replace(/-/g, '');
}

/** Generates a random authorization code. */
export function generateAuthCode(): string {
  return randomBytes(32).toString('base64url');
}

/** Generates a client secret. */
export function generateClientSecret(): string {
  return randomBytes(32).toString('hex');
}

// ── Scope Mapping ──

/**
 * Maps an OAuth scope string to the system's permission level.
 * "ads_read" → "read", anything with "write" or "manage" → "readwrite"
 */
export function scopeToPermission(scope: string): 'read' | 'readwrite' {
  const scopes = scope.split(/\s+/).filter(Boolean);
  const hasWrite = scopes.some((s) => s.includes('write') || s.includes('manage'));
  return hasWrite ? 'readwrite' : 'read';
}
