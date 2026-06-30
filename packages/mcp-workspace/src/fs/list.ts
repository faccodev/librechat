/**
 * Listing & search tools for the workspace MCP.
 *
 *   - list_directory              — flat list with [FILE]/[DIR] prefixes
 *   - list_directory_with_sizes   — same, with sizes + summary
 *   - directory_tree              — recursive JSON tree
 *   - search_files                — glob-based recursive search
 *
 * All operate on the HOST workspace path with the same path validation
 * as the rest of the MCP. Honors `.gitignore` patterns by default.
 *
 * Stub for PR 1. Implementation lands in PR 2.
 */

/** Stub: returns `null` until PR 2. */
export async function listDirectory(_args: unknown): Promise<unknown> {
  throw new Error('listDirectory not implemented yet — landing in PR 2');
}

/** Stub: returns `null` until PR 2. */
export async function listDirectoryWithSizes(_args: unknown): Promise<unknown> {
  throw new Error('listDirectoryWithSizes not implemented yet — landing in PR 2');
}

/** Stub: returns `null` until PR 2. */
export async function directoryTree(_args: unknown): Promise<unknown> {
  throw new Error('directoryTree not implemented yet — landing in PR 2');
}

/** Stub: returns `null` until PR 2. */
export async function searchFiles(_args: unknown): Promise<unknown> {
  throw new Error('searchFiles not implemented yet — landing in PR 2');
}
