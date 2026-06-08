import fs from 'fs';
import path from 'path';
import { logger } from '@librechat/data-schemas';
import type { TCustomConfig } from 'librechat-data-provider';
import { isPathSafe, resolveWorkspacePath } from '../workspaces/service';
import { getWorkspaceConfig, type WorkspaceConfig } from '../workspaces/config';

/**
 * Public shape of a single tree entry returned to the file manager UI.
 * `path` is the workspace-relative POSIX path (forward slashes, no leading
 * slash) so it round-trips through `encodeURIComponent` and JSON safely.
 */
export type WorkspaceNode = {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size?: number;
  mime?: string;
  modifiedAt: string;
  childCount?: number;
};

export type WorkspaceListResult = {
  path: string;
  nodes: WorkspaceNode[];
  truncated: boolean;
  workspacePath: string;
};

export type WorkspaceFileResult = {
  path: string;
  absolutePath: string;
  size: number;
  mime?: string;
  modifiedAt: string;
  workspacePath: string;
};

export type WorkspaceSearchResult = {
  query: string;
  matches: WorkspaceNode[];
  total: number;
  truncated: boolean;
};

const DEFAULT_MAX_ENTRIES = 1000;
const DEFAULT_MAX_SEARCH_RESULTS = 500;
const MAX_SEARCH_DEPTH = 16;

/** POSIX-relative form of `relative` with any leading `./` stripped. */
const toRelativePosix = (relative: string): string => {
  const normalized = relative.split(path.sep).join('/').replace(/^\.\/+/, '');
  return normalized;
};

/** Truthy if the basename is a hidden entry (starts with `.`). */
const isHidden = (name: string): boolean => name.startsWith('.');

/**
 * Resolves a user-supplied relative path against the workspace root and
 * returns the absolute path + a `WorkspaceListResult` envelope. Throws
 * an `Error` with a `status` property so the route handler can map it to
 * a 4xx response.
 */
async function resolveAndAssertPath({
  relPath,
  workspacePath,
  basePath,
}: {
  relPath: string;
  workspacePath: string;
  basePath: string;
}): Promise<string> {
  const rel = toRelativePosix(relPath);
  if (rel && (rel === '..' || rel.startsWith('../') || rel.includes('/../'))) {
    const err = new Error('Path traversal is not allowed');
    (err as Error & { status?: number }).status = 400;
    throw err;
  }
  const abs = rel ? path.resolve(workspacePath, rel) : workspacePath;
  if (!isPathSafe(abs, basePath)) {
    const err = new Error('Path escapes workspace');
    (err as Error & { status?: number }).status = 400;
    throw err;
  }
  let stat: fs.Stats;
  try {
    stat = await fs.promises.stat(abs);
  } catch (error) {
    const err = new Error('Path not found');
    (err as Error & { status?: number }).status = 404;
    (err as Error & { cause?: unknown }).cause = error;
    throw err;
  }
  if (!stat.isDirectory()) {
    const err = new Error('Path is not a directory');
    (err as Error & { status?: number }).status = 400;
    throw err;
  }
  return abs;
}

/**
 * Builds a `WorkspaceNode` from a `Dirent`. `mime` and `size` are resolved
 * lazily so list calls don't pay for unused fields.
 */
async function direntToNode({
  dirent,
  parentAbs,
  workspacePath,
  includeChildCount,
}: {
  dirent: fs.Dirent;
  parentAbs: string;
  workspacePath: string;
  includeChildCount: boolean;
}): Promise<WorkspaceNode> {
  const abs = path.join(parentAbs, dirent.name);
  const rel = toRelativePosix(path.relative(workspacePath, abs));
  const stat = await fs.promises.stat(abs);
  if (dirent.isDirectory()) {
    let childCount: number | undefined;
    if (includeChildCount) {
      const children = await fs.promises.readdir(abs);
      childCount = children.length;
    }
    return {
      name: dirent.name,
      path: rel,
      type: 'dir',
      modifiedAt: (stat.mtime || new Date()).toISOString(),
      childCount,
    };
  }
  const mime = lookupMime(abs);
  return {
    name: dirent.name,
    path: rel,
    type: 'file',
    size: stat.size,
    mime,
    modifiedAt: (stat.mtime || new Date()).toISOString(),
  };
}

/**
 * Lazy mime lookup. `mime-types` is a runtime transitive dependency in the
 * legacy `api/` router — kept optional so the package itself stays slim.
 * Returns `undefined` for unknown extensions rather than `application/octet-stream`
 * so the UI can fall back to extension-based icons.
 */
function lookupMime(absPath: string): string | undefined {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mime = require('mime-types') as { lookup: (p: string) => string | false };
    const value = mime.lookup(absPath);
    return value === false ? undefined : (value as string | undefined);
  } catch {
    return undefined;
  }
}

/**
 * Lists a single level of a workspace directory. Sorted case-insensitively:
 * directories first, then files. Hidden entries are filtered out.
 */
export async function listWorkspaceTree({
  appConfig,
  user,
  relPath = '',
  maxEntries = DEFAULT_MAX_ENTRIES,
}: {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  relPath?: string;
  maxEntries?: number;
}): Promise<WorkspaceListResult> {
  const wsConfig = getWorkspaceConfig(appConfig);
  const workspacePath = resolveWorkspacePath(user?.workspaceSubdir, wsConfig);
  if (!workspacePath) {
    const err = new Error('Workspaces are not available for this user');
    (err as Error & { status?: number }).status = 404;
    throw err;
  }
  const abs = await resolveAndAssertPath({
    relPath,
    workspacePath,
    basePath: wsConfig.containerBasePath,
  });
  const rel = toRelativePosix(relPath);
  const allEntries = await fs.promises.readdir(abs, { withFileTypes: true });
  const visible = allEntries.filter((entry) => !isHidden(entry.name));
  const truncated = visible.length > maxEntries;
  const sliced = truncated ? visible.slice(0, maxEntries) : visible;
  const nodes = await Promise.all(
    sliced.map((dirent) =>
      direntToNode({
        dirent,
        parentAbs: abs,
        workspacePath,
        includeChildCount: true,
      }),
    ),
  );
  const dirs = nodes.filter((n) => n.type === 'dir');
  const files = nodes.filter((n) => n.type === 'file');
  dirs.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  files.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  return {
    path: rel,
    nodes: [...dirs, ...files],
    truncated,
    workspacePath,
  };
}

/**
 * Recursively walks the workspace, returning entries whose basename
 * (case-insensitively) contains `query`. Result is bounded by `maxResults`
 * AND `MAX_SEARCH_DEPTH` to keep the BFS predictable.
 */
export async function searchWorkspaceTree({
  appConfig,
  user,
  query,
  maxResults = DEFAULT_MAX_SEARCH_RESULTS,
}: {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  query: string;
  maxResults?: number;
}): Promise<WorkspaceSearchResult> {
  const wsConfig = getWorkspaceConfig(appConfig);
  const workspacePath = resolveWorkspacePath(user?.workspaceSubdir, wsConfig);
  if (!workspacePath) {
    const err = new Error('Workspaces are not available for this user');
    (err as Error & { status?: number }).status = 404;
    throw err;
  }
  const trimmed = query.trim();
  if (!trimmed) {
    return { query: '', matches: [], total: 0, truncated: false };
  }
  const needle = trimmed.toLowerCase();
  const matches: WorkspaceNode[] = [];
  let truncated = false;
  const queue: Array<{ abs: string; depth: number }> = [{ abs: workspacePath, depth: 0 }];
  while (queue.length > 0 && matches.length < maxResults) {
    const { abs, depth } = queue.shift()!;
    let entries: fs.Dirent[];
    try {
      entries = await fs.promises.readdir(abs, { withFileTypes: true });
    } catch (err) {
      logger.warn(`[workspaceFiles] search: failed to read ${abs}:`, err);
      continue;
    }
    for (const entry of entries) {
      if (isHidden(entry.name)) continue;
      if (entry.name.toLowerCase().includes(needle)) {
        try {
          const node = await direntToNode({
            dirent: entry,
            parentAbs: abs,
            workspacePath,
            includeChildCount: false,
          });
          matches.push(node);
          if (matches.length >= maxResults) {
            truncated = true;
            break;
          }
        } catch (err) {
          logger.warn(`[workspaceFiles] search: failed to stat ${entry.name}:`, err);
        }
      }
      if (entry.isDirectory() && depth < MAX_SEARCH_DEPTH) {
        queue.push({ abs: path.join(abs, entry.name), depth: depth + 1 });
      }
    }
  }
  matches.sort((a, b) => a.path.localeCompare(b.path, undefined, { sensitivity: 'base' }));
  return { query: trimmed, matches, total: matches.length, truncated };
}

/** Re-exported for route-layer convenience so callers don't import from `../workspaces/config`. */
export type { WorkspaceConfig };

/**
 * Resolves a workspace-relative path to an absolute file (not directory)
 * and returns its metadata. The same `isPathSafe` invariant used by the
 * tree endpoint applies. Throws with a `status` field on rejection so
 * route handlers can map to a 4xx response.
 */
export async function getWorkspaceFile({
  appConfig,
  user,
  relPath,
}: {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  relPath: string;
}): Promise<WorkspaceFileResult> {
  const wsConfig = getWorkspaceConfig(appConfig);
  const workspacePath = resolveWorkspacePath(user?.workspaceSubdir, wsConfig);
  if (!workspacePath) {
    const err = new Error('Workspaces are not available for this user');
    (err as Error & { status?: number }).status = 404;
    throw err;
  }
  const rel = toRelativePosix(relPath);
  if (!rel) {
    const err = new Error('File path is required');
    (err as Error & { status?: number }).status = 400;
    throw err;
  }
  if (rel === '..' || rel.startsWith('../') || rel.includes('/../')) {
    const err = new Error('Path traversal is not allowed');
    (err as Error & { status?: number }).status = 400;
    throw err;
  }
  const abs = path.resolve(workspacePath, rel);
  if (!isPathSafe(abs, wsConfig.containerBasePath)) {
    const err = new Error('Path escapes workspace');
    (err as Error & { status?: number }).status = 400;
    throw err;
  }
  let stat: fs.Stats;
  try {
    stat = await fs.promises.stat(abs);
  } catch (error) {
    const err = new Error('File not found');
    (err as Error & { status?: number }).status = 404;
    (err as Error & { cause?: unknown }).cause = error;
    throw err;
  }
  if (!stat.isFile()) {
    const err = new Error('Path is not a file');
    (err as Error & { status?: number }).status = 400;
    throw err;
  }
  return {
    path: rel,
    absolutePath: abs,
    size: stat.size,
    mime: lookupMime(abs),
    modifiedAt: (stat.mtime || new Date()).toISOString(),
    workspacePath,
  };
}

/**
 * Streams a file from the workspace to the response. Returns the metadata
 * (mime + filename) so the caller can set headers. The caller is
 * responsible for `Content-Disposition` and `Content-Type`.
 */
export async function streamWorkspaceFile({
  file,
  res,
}: {
  file: WorkspaceFileResult;
  res: NodeJS.WritableStream;
}): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const read = fs.createReadStream(file.absolutePath);
    read.on('error', reject);
    read.on('end', resolve);
    read.pipe(res, { end: false });
    res.on('error', reject);
    res.on('finish', resolve);
  });
}
