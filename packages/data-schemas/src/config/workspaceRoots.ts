import path from 'node:path';

/**
 * Default workspace root when `WORKSPACE_ROOTS` is unset. Matches the
 * `/home/workspaces:/workspaces` mount in docker-compose.yml — local dev
 * (docker-compose) and the same default that has been the implicit root for
 * mcp-code-runner historically.
 */
export const DEFAULT_WORKSPACE_ROOTS: readonly string[] = ['/workspaces'];

/**
 * Parse a `WORKSPACE_ROOTS`-style value into a list of canonicalised,
 * absolute paths. Pure function — no env access — so tests can exercise the
 * parsing logic without depending on process state.
 *
 * Rules:
 *  - Comma-separated.
 *  - Whitespace around each entry is trimmed.
 *  - Empty entries are skipped (so a trailing comma doesn't produce '').
 *  - Each entry is resolved with `path.resolve` so relative entries become
 *    absolute.
 *
 * Returns `[]` when input is `null`, `undefined`, or empty after trimming.
 */
export function parseWorkspaceRoots(raw: string | undefined | null): string[] {
  if (raw == null) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0)
    .map((entry) => path.resolve(entry));
}

let cachedRoots: string[] | null = null;

/**
 * Read and parse `WORKSPACE_ROOTS` from `process.env`, returning the list of
 * canonicalised paths the server should allow user-supplied `workspacePath`s
 * to live under.
 *
 * Falls back to `DEFAULT_WORKSPACE_ROOTS` when the env is unset or contains
 * only whitespace/empty entries.
 *
 * Cached on first call. Call `resetWorkspaceRootsCache()` from tests to
 * pick up env changes between cases.
 */
export function getWorkspaceRoots(): string[] {
  if (cachedRoots !== null) return cachedRoots;
  const parsed = parseWorkspaceRoots(process.env.WORKSPACE_ROOTS);
  cachedRoots = parsed.length > 0 ? parsed : [...DEFAULT_WORKSPACE_ROOTS];
  return cachedRoots;
}

/**
 * Reset the internal cache. Intended for tests; production code should never
 * need to call this.
 */
export function resetWorkspaceRootsCache(): void {
  cachedRoots = null;
}