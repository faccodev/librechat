/**
 * Read tools for the workspace MCP.
 *
 *   - read_file             — read text with optional head/tail/offset/limit
 *   - read_media_file       — read image/audio, return base64 + MIME
 *   - read_multiple_files   — batch read; one failure does not abort
 *
 * All three operate on the HOST workspace path (not through a Docker
 * sandbox) but enforce the same path validation as the run_code tools:
 * `validateWorkspacePathAgainstRoots` rejects escapes via realpath.
 *
 * Stub for PR 1. Implementation lands in PR 2.
 */

import type { z } from 'zod';

/** Stub: returns `null` until PR 2. */
export async function readFile(_args: unknown): Promise<unknown> {
  throw new Error('readFile not implemented yet — landing in PR 2');
}

/** Stub: returns `null` until PR 2. */
export async function readMediaFile(_args: unknown): Promise<unknown> {
  throw new Error('readMediaFile not implemented yet — landing in PR 2');
}

/** Stub: returns `null` until PR 2. */
export async function readMultipleFiles(_args: unknown): Promise<unknown> {
  throw new Error('readMultipleFiles not implemented yet — landing in PR 2');
}

// Keep `z` import alive so future PR 2 implementation can lean on the
// shared zod instance without re-importing the package.
export const _z: typeof z = undefined as unknown as typeof z;
