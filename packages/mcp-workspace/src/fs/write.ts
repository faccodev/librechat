/**
 * Write tools for the workspace MCP.
 *
 *   - write_file       — create or overwrite a file
 *   - create_directory — mkdir -p (idempotent)
 *   - move_file        — rename/move (no overwrite)
 *
 * All destructive operations go through the same path validation as
 * the rest of the MCP. The write tools run on the HOST workspace path
 * (no Docker sandbox) because they're pure fs operations.
 *
 * Stub for PR 1. Implementation lands in PR 3 (alongside edit_file).
 */

/** Stub: returns `null` until PR 3. */
export async function writeFile(_args: unknown): Promise<unknown> {
  throw new Error('writeFile not implemented yet — landing in PR 3');
}

/** Stub: returns `null` until PR 3. */
export async function createDirectory(_args: unknown): Promise<unknown> {
  throw new Error('createDirectory not implemented yet — landing in PR 3');
}

/** Stub: returns `null` until PR 3. */
export async function moveFile(_args: unknown): Promise<unknown> {
  throw new Error('moveFile not implemented yet — landing in PR 3');
}
