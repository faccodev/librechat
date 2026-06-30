/**
 * Path resolution for the workspace MCP filesystem tools.
 *
 * The filesystem tools (read_file, write_file, edit_file, ...) operate
 * DIRECTLY on the host workspace path. They do NOT go through the
 * Docker sandbox that `run_code` uses — they don't need to, because
 * they're pure fs operations.
 *
 * What they DO need is the same path validation `runner.ts` already
 * does for the executor mount:
 *
 *   - Reject absolute paths (workspaceSubdir-relative only).
 *   - Reject `..` traversal after normalisation.
 *   - Reject symlinks that escape the workspace.
 *   - Reject NUL bytes and other control characters.
 *
 * This module is a thin wrapper over `validateWorkspacePathAgainstRoots`
 * from `projectContext.ts` so the layer-3 defence stays in one place.
 *
 * Stub for PR 1. Implementation lands in PR 2.
 */

import path from "path";

/**
 * Resolve a user-supplied path against the workspace root, returning a
 * host-side absolute path that is guaranteed to stay inside `WORKSPACE_ROOTS`.
 *
 * Stub: throws until PR 2.
 */
export async function resolveWorkspacePath(
  _workspaceContainerPath: string,
  _userPath: string,
): Promise<string> {
  throw new Error("resolveWorkspacePath not implemented yet — landing in PR 2");
}

/**
 * Re-export of `path` so consumers don't need to import `node:path` separately.
 */
export { path };