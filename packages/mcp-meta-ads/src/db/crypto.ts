/**
 * Token Encryption/Decryption — AES-256-GCM
 *
 * Uses MCP_ENCRYPTION_KEY env var (64-char hex = 32 bytes).
 * In dev mode without key, falls back to base64 with a warning.
 */

import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

let warnedNoKey = false;

function getEncryptionKey(): Buffer | null {
  const hex = process.env.MCP_ENCRYPTION_KEY;
  if (!hex) return null;
  if (hex.length !== 64) {
    throw new Error('MCP_ENCRYPTION_KEY must be a 64-character hex string (32 bytes)');
  }
  return Buffer.from(hex, 'hex');
}

/**
 * Encrypts a plaintext string. Returns a base64-encoded ciphertext.
 */
export function encryptToken(plaintext: string): string {
  const key = getEncryptionKey();

  if (!key) {
    if (!warnedNoKey) {
      console.warn('[crypto] WARNING: MCP_ENCRYPTION_KEY not set — tokens stored as base64 (NOT secure for production)');
      warnedNoKey = true;
    }
    return `b64:${Buffer.from(plaintext).toString('base64')}`;
  }

  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  // Format: enc:<iv>:<tag>:<ciphertext> (all base64)
  return `enc:${iv.toString('base64')}:${tag.toString('base64')}:${encrypted.toString('base64')}`;
}

/**
 * Decrypts a ciphertext string produced by encryptToken.
 */
export function decryptToken(ciphertext: string): string {
  // Dev fallback — base64
  if (ciphertext.startsWith('b64:')) {
    return Buffer.from(ciphertext.slice(4), 'base64').toString('utf8');
  }

  if (!ciphertext.startsWith('enc:')) {
    throw new Error('Invalid encrypted token format');
  }

  const key = getEncryptionKey();
  if (!key) {
    throw new Error('MCP_ENCRYPTION_KEY required to decrypt tokens');
  }

  const parts = ciphertext.slice(4).split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted token format');
  }

  const iv = Buffer.from(parts[0], 'base64');
  const tag = Buffer.from(parts[1], 'base64');
  const encrypted = Buffer.from(parts[2], 'base64');

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  return decipher.update(encrypted) + decipher.final('utf8');
}
