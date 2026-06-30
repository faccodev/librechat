/**
 * Read-only metadata tools for the workspace MCP.
 *
 *   - get_file_info           — size, mtime, mode, type
 *   - list_allowed_directories — current sandbox roots
 *
 * `list_allowed_directories` is the LLM's first call when it joins a
 * workspace: tells it where it can operate before any other tool.
 *
 * Stub for PR 1. Implementation lands in PR 2.
 */

/** Stub: returns `null` until PR 2. */
export async function getFileInfo(_args: unknown): Promise<unknown> {
  throw new Error('getFileInfo not implemented yet — landing in PR 2');
}

/** Stub: returns `null` until PR 2. */
export async function listAllowedDirectories(): Promise<unknown> {
  throw new Error('listAllowedDirectories not implemented yet — landing in PR 2');
}
