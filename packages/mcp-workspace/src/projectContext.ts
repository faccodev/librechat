import path from 'path';
import type { ProjectContext } from './context.js';

/**
 * Header name carrying the per-conversation project context over HTTP.
 * Defaults to `X-Project-Context`; the runner admin can override via
 * `RUNNER_PROJECT_CONTEXT_HEADER` so deployments behind a header-stripping
 * proxy can repurpose an existing name. The companion `MCP_PROJECT_CONTEXT`
 * env name (stdio) is fixed — see `encodeProjectContext` in
 * `@librechat/api`'s `env.ts` for the unified contract.
 */
export const PROJECT_CONTEXT_HEADER_DEFAULT = 'X-Project-Context';

/** Thrown when the header is present but cannot be parsed into a valid
 *  ProjectContext. Distinct from "header missing" so the caller can choose
 *  how to react: a missing header is the normal no-project path; a
 *  malformed one signals a bug or a malicious caller. */
export class InvalidProjectContextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidProjectContextError';
  }
}

/**
 * Read the env-configured header name (default `X-Project-Context`).
 * Lookup is cached at module load — the env is read once and never
 * re-read for the lifetime of the process, mirroring how
 * `WORKSPACES_BASE` and the language images are read at the top of
 * `runner.ts`. A restart picks up new env, which is the right cadence
 * for a runner config that an admin changes intentionally.
 */
const PROJECT_CONTEXT_HEADER: string =
  process.env.RUNNER_PROJECT_CONTEXT_HEADER || PROJECT_CONTEXT_HEADER_DEFAULT;

/** Returns the active header name. Exposed so tests and the Express
 *  boundary can use the same source of truth. */
export function getProjectContextHeaderName(): string {
  return PROJECT_CONTEXT_HEADER;
}

/**
 * Parse the `X-Project-Context` HTTP header value into a
 * {@link ProjectContext}. The contract is `base64(JSON)`; the JSON
 * shape is `{ projectId: string, workspacePath: string }`.
 *
 *  - `null` or `undefined` input  -> `null` (no header, normal path)
 *  - empty string                 -> `null` (same)
 *  - any other string             -> strict decode + JSON.parse + shape
 *    validation; throws
 *    `InvalidProjectContextError` on any failure.
 *
 * The strictness is the layer-3 counterpart to the server-side
 * `sanitizeWorkspacePath`: an unparseable header never reaches
 * `getSafePaths` as a half-built object that could slip through
 * downstream checks.
 */
export function parseProjectContextHeader(raw: string | null | undefined): ProjectContext | null {
  if (raw == null) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let json: string;
  try {
    json = Buffer.from(trimmed, 'base64').toString('utf8');
  } catch {
    // Buffer.from never throws for arbitrary input — it would only on
    // a bad options object, which we never pass. Defensive branch.
    throw new InvalidProjectContextError('X-Project-Context header is not valid base64');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch (err) {
    throw new InvalidProjectContextError(
      `X-Project-Context payload is not valid JSON: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new InvalidProjectContextError('X-Project-Context payload must be a JSON object');
  }

  const { projectId, workspacePath } = parsed as Record<string, unknown>;

  if (typeof projectId !== 'string' || projectId.length === 0) {
    throw new InvalidProjectContextError('X-Project-Context.projectId must be a non-empty string');
  }
  if (typeof workspacePath !== 'string' || workspacePath.length === 0) {
    throw new InvalidProjectContextError(
      'X-Project-Context.workspacePath must be a non-empty string',
    );
  }

  return { projectId, workspacePath };
}

/**
 * Default workspace roots when `WORKSPACE_ROOTS` is unset. Mirrors the
 * server-side default in `packages/data-schemas/src/config/workspaceRoots.ts`
 * — kept in sync deliberately, but the runner must be functional
 * standalone (the mcp-workspace container doesn't depend on
 * @librechat/data-schemas) so the parser lives here, not imported.
 */
const DEFAULT_WORKSPACE_ROOTS = ['/workspaces'];

/**
 * Module-level cache so we only parse `WORKSPACE_ROOTS` once per
 * process. `resetWorkspaceRootsCache()` is exported for tests; production
 * callers should treat the env as immutable for the process lifetime.
 */
let cachedWorkspaceRoots: string[] | null = null;

export function parseWorkspaceRoots(raw: string | undefined): string[] {
  if (!raw) return [...DEFAULT_WORKSPACE_ROOTS];
  const parts = raw
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (parts.length === 0) return [...DEFAULT_WORKSPACE_ROOTS];
  return parts.map((p) => path.resolve(p));
}

export function getWorkspaceRoots(): string[] {
  if (cachedWorkspaceRoots === null) {
    cachedWorkspaceRoots = parseWorkspaceRoots(process.env.WORKSPACE_ROOTS);
  }
  return cachedWorkspaceRoots;
}

/** Test-only: drop the cache so a changed `WORKSPACE_ROOTS` env var is
 *  picked up. Production code never calls this. */
export function resetWorkspaceRootsCache(): void {
  cachedWorkspaceRoots = null;
}

/**
 * Layer 3 of AD-2 — re-validate an explicit workspace path against the
 * current `WORKSPACE_ROOTS` allowlist. The server already validated the
 * path at save time (layer 1) and at agent-init time (layer 2), but a
 * long-lived runner process can outlive both: the admin might narrow
 * the allowlist mid-conversation, or a DB row carrying a stale path
 * could somehow reach here. This is the last line of defence before
 * the runner mounts a host path into a docker container.
 *
 * Returns the canonicalised path on success; throws on any escape.
 * Canonicalisation is the same recipe as the server-side
 * `sanitizeWorkspacePath` (resolve + realpath + strict-subdir check)
 * so a path the server passed in earlier is byte-equal after this
 * round-trip — the runner doesn't reach a different directory than
 * the one the server already approved.
 */
export async function validateWorkspacePathAgainstRoots(
  raw: string,
  roots: string[] = getWorkspaceRoots(),
): Promise<string> {
  if (typeof raw !== 'string' || raw.length === 0) {
    throw new Error('workspacePath must be a non-empty string');
  }

  const resolved = path.resolve(raw);
  let real: string;
  try {
    real = await fsPromisesRealpath(resolved);
  } catch (err) {
    if (err && typeof err === 'object' && (err as NodeJS.ErrnoException).code === 'ENOENT') {
      // Allow the path when it doesn't exist yet — projects can pin a
      // future directory that the runner will create on first `run_code`.
      real = resolved;
    } else {
      throw err;
    }
  }

  // Strict-subdir check: the real path must be *below* at least one
  // root, not equal to it. The trailing-sep normalization makes
  // `startsWith` unambiguous on both POSIX and Windows (which differ
  // only in the separator character, not in the comparison). The
  // length comparison rejects the case where `real` IS the root —
  // without it, the trailing-sep trick lets a path that equals the
  // root slip through (both strings become `<root>\\` and a same-
  // string `startsWith` returns true). That footgun would let an
  // admin-pinned `workspacePath` equal the sandbox root itself,
  // which means the runner is about to mount the *whole* workspaces
  // tree, not a project under it — defence-in-depth must close that.
  const normReal = real.endsWith(path.sep) ? real : real + path.sep;
  const insideSomeRoot = roots.some((root) => {
    const normRoot = root.endsWith(path.sep) ? root : root + path.sep;
    return normReal.length > normRoot.length && normReal.startsWith(normRoot);
  });
  if (!insideSomeRoot) {
    throw new Error(
      `Path escapes workspace sandbox: ${real} is not inside any of WORKSPACE_ROOTS=[${roots.join(', ')}]`,
    );
  }

  return real;
}

// Re-exported for tests + callers that need a stable reference to the
// realpath promise — using `require` lazily to keep the import surface
// narrow and avoid the file-handle mock fighting the test runner.
import * as fsp from 'fs/promises';
const fsPromisesRealpath = fsp.realpath;
