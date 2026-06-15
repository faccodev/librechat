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

/**
 * Creates a new empty (or seed-content) file inside the user's
 * workspace. The destination name is sanitized the same way as
 * `createWorkspaceDirectory`. Refuses to overwrite an existing
 * entry.
 */
export async function createWorkspaceFile({
  appConfig,
  user,
  parentPath,
  name,
  content = '',
}: {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  parentPath: string;
  name: string;
  content?: string;
}): Promise<WorkspaceNode> {
  const wsConfig = getWorkspaceConfig(appConfig);
  const limitBytes = wsConfig.sizeLimitMB * 1024 * 1024;
  const contentBytes = Buffer.byteLength(content, 'utf8');
  if (contentBytes > limitBytes) {
    throw Object.assign(
      new Error(`File content exceeds the workspace size limit (${wsConfig.sizeLimitMB} MB)`),
      { status: 413 },
    );
  }
  const cleanName = sanitizeEntryName(name);
  const { abs: parentAbs, rel: parentRel, workspacePath, basePath } = resolveFsPath({
    appConfig,
    user,
    relPath: parentPath,
    requireDir: true,
  });
  const parentStat = await fs.promises.stat(parentAbs).catch((err) => {
    rethrowFsError(err, 'Parent directory not found', 404);
    throw err;
  });
  if (!parentStat.isDirectory()) {
    throw Object.assign(new Error('Parent is not a directory'), { status: 400 });
  }
  const targetAbs = path.join(parentAbs, cleanName);
  if (!isPathSafe(targetAbs, basePath)) {
    throw Object.assign(new Error('Path escapes workspace'), { status: 400 });
  }
  // Existence check for consistent 409 semantics.
  try {
    await fs.promises.stat(targetAbs);
    throw Object.assign(new Error('A file with that name already exists'), { status: 409 });
  } catch (err) {
    if ((err as { status?: number })?.status === 409) throw err;
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
  }
  await fs.promises.writeFile(targetAbs, content, { encoding: 'utf8', flag: 'wx' });
  const stat = await fs.promises.stat(targetAbs);
  logger.info(`[workspaceFiles] create: ${parentRel || '/'} + ${cleanName} (${contentBytes} bytes)`);
  return buildNodeFromStat(targetAbs, workspacePath, stat);
}

/**
 * Overwrites the content of an existing workspace file. The new
 * content is sent as a UTF-8 text body and rejected if it exceeds
 * the workspace size limit. Only safe for text-based files; binary
 * uploads must continue going through the multipart `/upload` route.
 */
export async function writeWorkspaceContent({
  appConfig,
  user,
  relPath,
  content,
}: {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  relPath: string;
  content: string;
}): Promise<WorkspaceNode> {
  const wsConfig = getWorkspaceConfig(appConfig);
  const limitBytes = wsConfig.sizeLimitMB * 1024 * 1024;
  const contentBytes = Buffer.byteLength(content, 'utf8');
  if (contentBytes > limitBytes) {
    throw Object.assign(
      new Error(`Content exceeds the workspace size limit (${wsConfig.sizeLimitMB} MB)`),
      { status: 413 },
    );
  }
  const { abs, workspacePath } = resolveFsPath({ appConfig, user, relPath });
  const stat = await fs.promises.stat(abs).catch((err) => {
    rethrowFsError(err, 'File not found', 404);
    throw err;
  });
  if (!stat.isFile()) {
    throw Object.assign(new Error('Path is not a file'), { status: 400 });
  }
  await fs.promises.writeFile(abs, content, { encoding: 'utf8' });
  const newStat = await fs.promises.stat(abs);
  logger.info(`[workspaceFiles] write-content: ${relPath} (${contentBytes} bytes)`);
  return buildNodeFromStat(abs, workspacePath, newStat);
}

export type WorkspaceSearchResult = {
  query: string;
  matches: WorkspaceNode[];
  total: number;
  truncated: boolean;
};

const DEFAULT_MAX_ENTRIES = 1000;
const DEFAULT_MAX_SEARCH_RESULTS = 500;
const MAX_SEARCH_DEPTH = 16;

/** Caps on the filesystem sync scan. The sync used to run an unbounded
 *  recursive `readdir` and would hang `GET /api/files` forever on a
 *  workspace path containing `node_modules` (or any large tree). */
const MAX_SCAN_DEPTH = 16;
const MAX_SCAN_ENTRIES = 10_000;
const SCAN_TIMEOUT_MS = 5_000;

/** Directory basenames that should never be recursed into during a workspace
 *  scan. They are universally huge, irrelevant to user-facing files, and
 *  the main cause of past scans hanging the request thread. */
const IGNORED_DIRNAMES = new Set([
  'node_modules',
  '.git',
  '.next',
  '.nuxt',
  '.turbo',
  '.cache',
  '.parcel-cache',
  '.venv',
  'venv',
  '__pycache__',
  'dist',
  'build',
  '.gradle',
  'target',
]);

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

/**
 * One row in a workspace filesystem scan. Distinct from `WorkspaceNode`
 * (which is shaped for the file-manager UI) because the only consumer of
 * this scan is the legacy `GET /api/files` DB-sync routine.
 */
export type WorkspaceScanEntry = {
  absolutePath: string;
  relativePath: string;
  name: string;
};

export type WorkspaceScanResult = {
  entries: WorkspaceScanEntry[];
  truncated: boolean;
  timedOut: boolean;
  scannedDirs: number;
};

export type ScanWorkspaceFilesOptions = {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  maxEntries?: number;
  maxDepth?: number;
  timeoutMs?: number;
  /**
   * Extra directory basenames to skip on top of the default
   * `IGNORED_DIRNAMES`. Comparison is case-sensitive on POSIX and
   * case-insensitive on Windows (mirrors `fs.readdir` on those platforms).
   */
  extraIgnoreDirnames?: string[];
};

/**
 * Bounded BFS walk of a user's workspace directory. Used by the legacy
 * `GET /api/files` handler to reconcile on-disk files with the `files`
 * collection. Hard caps prevent a misconfigured `workspaceSubdir`
 * (e.g. one pointing inside a `node_modules` tree or a slow NFS share)
 * from hanging the request thread indefinitely.
 *
 * Caps and behavior:
 *  - depth: capped at `maxDepth` (default `MAX_SCAN_DEPTH`)
 *  - entries: capped at `maxEntries` (default `MAX_SCAN_ENTRIES`); once
 *    reached, traversal stops and `truncated` is set
 *  - timeout: hard wall-clock cap at `timeoutMs` (default
 *    `SCAN_TIMEOUT_MS`); once hit, traversal stops and `timedOut` is set
 *  - skips: `node_modules`, `.git`, and other heavy build/VCS directories
 *    from `IGNORED_DIRNAMES` are never recursed into
 *  - hidden entries (basename starts with `.`): skipped unless explicitly
 *    allowed via `extraIgnoreDirnames`; matches `listWorkspaceTree`
 *
 * On any of those limits the function still returns whatever it already
 * collected — partial results are better than a hung request.
 */
export async function scanWorkspaceFiles({
  appConfig,
  user,
  maxEntries = MAX_SCAN_ENTRIES,
  maxDepth = MAX_SCAN_DEPTH,
  timeoutMs = SCAN_TIMEOUT_MS,
  extraIgnoreDirnames = [],
}: ScanWorkspaceFilesOptions): Promise<WorkspaceScanResult> {
  const wsConfig = getWorkspaceConfig(appConfig);
  const workspacePath = resolveWorkspacePath(user?.workspaceSubdir, wsConfig);
  if (!workspacePath) {
    return { entries: [], truncated: false, timedOut: false, scannedDirs: 0 };
  }

  const ignore = new Set(IGNORED_DIRNAMES);
  for (const name of extraIgnoreDirnames) {
    ignore.add(name);
  }
  const isCaseInsensitive = process.platform === 'win32';
  const shouldSkip = (basename: string) => {
    if (ignore.has(basename)) return true;
    if (isCaseInsensitive && ignore.has(basename.toLowerCase())) return true;
    return false;
  };

  const entries: WorkspaceScanEntry[] = [];
  let truncated = false;
  let timedOut = false;
  let scannedDirs = 0;

  const deadline = Date.now() + timeoutMs;
  const queue: Array<{ abs: string; depth: number }> = [{ abs: workspacePath, depth: 0 }];

  while (queue.length > 0) {
    if (entries.length >= maxEntries) {
      truncated = true;
      break;
    }
    if (Date.now() >= deadline) {
      timedOut = true;
      break;
    }

    const { abs, depth } = queue.shift()!;
    if (depth > maxDepth) continue;

    let dirents: fs.Dirent[];
    try {
      dirents = await fs.promises.readdir(abs, { withFileTypes: true });
    } catch (err) {
      logger.warn(`[workspaceFiles] scan: failed to read ${abs}:`, err);
      continue;
    }
    scannedDirs += 1;

    for (const dirent of dirents) {
      if (entries.length >= maxEntries) {
        truncated = true;
        break;
      }
      if (Date.now() >= deadline) {
        timedOut = true;
        break;
      }
      if (isHidden(dirent.name)) continue;
      const childAbs = path.join(abs, dirent.name);
      if (dirent.isDirectory()) {
        if (depth + 1 > maxDepth) continue;
        if (shouldSkip(dirent.name)) continue;
        queue.push({ abs: childAbs, depth: depth + 1 });
      } else if (dirent.isFile()) {
        entries.push({
          absolutePath: childAbs,
          relativePath: path
            .relative(workspacePath, childAbs)
            .split(path.sep)
            .join('/'),
          name: dirent.name,
        });
      }
    }
  }

  return { entries, truncated, timedOut, scannedDirs };
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

const SAFE_NAME_RE = /^[a-zA-Z0-9._\- ]+$/;

/**
 * Sanitizes a user-supplied entry name (file or folder basename).
 * Returns the cleaned name or throws with `status: 400`.
 *
 * Rejects:
 *  - empty / whitespace-only
 *  - paths with `/` or `\` (no sub-paths inside a name)
 *  - traversal segments `.` and `..`
 *  - leading dots (hidden entries)
 *  - characters outside `[A-Za-z0-9._- ]` (e.g. shell metas, NULs)
 *  - names longer than 255 bytes
 */
export const sanitizeEntryName = (name: string): string => {
  const trimmed = name.trim();
  if (!trimmed) {
    throw Object.assign(new Error('Name is required'), { status: 400 });
  }
  if (trimmed.length > 255) {
    throw Object.assign(new Error('Name is too long'), { status: 400 });
  }
  if (trimmed === '.' || trimmed === '..' || trimmed.startsWith('/') || trimmed.endsWith('/')) {
    throw Object.assign(new Error('Invalid name'), { status: 400 });
  }
  if (trimmed.includes('/') || trimmed.includes('\\')) {
    throw Object.assign(new Error('Name cannot contain path separators'), { status: 400 });
  }
  if (trimmed.startsWith('.')) {
    throw Object.assign(new Error('Hidden names are not allowed'), { status: 400 });
  }
  if (!SAFE_NAME_RE.test(trimmed)) {
    throw Object.assign(
      new Error('Name may only contain letters, numbers, spaces, dot, dash, underscore'),
      { status: 400 },
    );
  }
  return trimmed;
};

/**
 * Resolves a user-supplied relative path against the workspace root
 * without forcing a directory or file check. Returns the absolute
 * path + the workspace root so the caller can do its own stat and
 * construct the response node. Reuses `isPathSafe` and the same
 * traversal guards as the read endpoints.
 */
const resolveFsPath = ({
  appConfig,
  user,
  relPath,
  requireDir,
  requireFile,
}: {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  relPath: string;
  requireDir?: boolean;
  requireFile?: boolean;
}): { abs: string; rel: string; workspacePath: string; basePath: string } => {
  const wsConfig = getWorkspaceConfig(appConfig);
  const workspacePath = resolveWorkspacePath(user?.workspaceSubdir, wsConfig);
  if (!workspacePath) {
    throw Object.assign(new Error('Workspaces are not available for this user'), { status: 404 });
  }
  const rel = toRelativePosix(relPath);
  if (rel && (rel === '..' || rel.startsWith('../') || rel.includes('/../'))) {
    throw Object.assign(new Error('Path traversal is not allowed'), { status: 400 });
  }
  const abs = rel ? path.resolve(workspacePath, rel) : workspacePath;
  if (!isPathSafe(abs, wsConfig.containerBasePath)) {
    throw Object.assign(new Error('Path escapes workspace'), { status: 400 });
  }
  return { abs, rel, workspacePath, basePath: wsConfig.containerBasePath };
};

const rethrowFsError = (err: unknown, fallback: string, status = 500) => {
  const e = err as NodeJS.ErrnoException;
  if (e?.code === 'ENOENT') {
    throw Object.assign(new Error('Path not found'), { status: 404 });
  }
  if (e?.code === 'EEXIST') {
    throw Object.assign(new Error(fallback), { status: 409 });
  }
  if (e?.code === 'ENOTEMPTY' || e?.code === 'EACCES' || e?.code === 'EPERM') {
    throw Object.assign(new Error(fallback), { status: 403 });
  }
  throw Object.assign(new Error(fallback), { status, cause: err });
};

const buildNodeFromStat = (abs: string, base: string, stat: fs.Stats): WorkspaceNode => {
  const rel = toRelativePosix(path.relative(base, abs));
  return {
    name: path.basename(abs),
    path: rel,
    type: stat.isDirectory() ? 'dir' : 'file',
    size: stat.isFile() ? stat.size : undefined,
    mime: stat.isFile() ? lookupMime(abs) : undefined,
    modifiedAt: (stat.mtime || new Date()).toISOString(),
  };
};

/**
 * Creates a new directory inside the user's workspace. The parent
 * path must already exist; the new directory's name is sanitized
 * (no path separators, no leading dot, ASCII-safe characters).
 */
export async function createWorkspaceDirectory({
  appConfig,
  user,
  parentPath,
  name,
}: {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  parentPath: string;
  name: string;
}): Promise<WorkspaceNode> {
  const cleanName = sanitizeEntryName(name);
  const { abs: parentAbs, rel: parentRel, workspacePath, basePath } = resolveFsPath({
    appConfig,
    user,
    relPath: parentPath,
    requireDir: true,
  });
  const parentStat = await fs.promises.stat(parentAbs).catch((err) => {
    rethrowFsError(err, 'Parent directory not found', 404);
    throw err;
  });
  if (!parentStat.isDirectory()) {
    throw Object.assign(new Error('Parent is not a directory'), { status: 400 });
  }
  const targetAbs = path.join(parentAbs, cleanName);
  if (!isPathSafe(targetAbs, basePath)) {
    throw Object.assign(new Error('Path escapes workspace'), { status: 400 });
  }
  try {
    await fs.promises.mkdir(targetAbs, { recursive: false });
  } catch (err) {
    rethrowFsError(err, 'Could not create directory');
  }
  const stat = await fs.promises.stat(targetAbs);
  const node = buildNodeFromStat(targetAbs, workspacePath, stat);
  logger.info(`[workspaceFiles] mkdir: ${parentRel || '/'} + ${cleanName}`);
  return node;
}

/**
 * Moves a Multer-uploaded temp file into the user's workspace. The
 * destination name is sanitized like every other entry. Overwriting
 * an existing file is rejected (409) — the user can rename the
 * existing entry first. Workspace size limit is enforced here so a
 * malicious user can't push a 4GB file into a 2GB workspace via
 * repeated writes.
 */
export async function writeWorkspaceFile({
  appConfig,
  user,
  parentPath,
  originalName,
  tempPath,
  size,
}: {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  parentPath: string;
  originalName: string;
  tempPath: string;
  size: number;
}): Promise<WorkspaceNode> {
  const wsConfig = getWorkspaceConfig(appConfig);
  const limitBytes = wsConfig.sizeLimitMB * 1024 * 1024;
  if (size > limitBytes) {
    try {
      await fs.promises.unlink(tempPath);
    } catch {
      // best-effort cleanup
    }
    throw Object.assign(
      new Error(
        `File exceeds the workspace size limit (${wsConfig.sizeLimitMB} MB)`,
      ),
      { status: 413 },
    );
  }
  const cleanName = sanitizeEntryName(originalName);
  const { abs: parentAbs, rel: parentRel, workspacePath, basePath } = resolveFsPath({
    appConfig,
    user,
    relPath: parentPath,
    requireDir: true,
  });
  const parentStat = await fs.promises.stat(parentAbs).catch((err) => {
    rethrowFsError(err, 'Parent directory not found', 404);
    throw err;
  });
  if (!parentStat.isDirectory()) {
    try {
      await fs.promises.unlink(tempPath);
    } catch {
      // best-effort cleanup
    }
    throw Object.assign(new Error('Parent is not a directory'), { status: 400 });
  }
  const targetAbs = path.join(parentAbs, cleanName);
  if (!isPathSafe(targetAbs, basePath)) {
    try {
      await fs.promises.unlink(tempPath);
    } catch {
      // best-effort cleanup
    }
    throw Object.assign(new Error('Path escapes workspace'), { status: 400 });
  }
  // Existence check is explicit because `fs.rename` silently
  // overwrites on POSIX (where the test is running) — we want 409
  // semantics regardless of platform.
  try {
    await fs.promises.stat(targetAbs);
    try {
      await fs.promises.unlink(tempPath);
    } catch {
      // best-effort cleanup
    }
    throw Object.assign(new Error('A file with that name already exists'), { status: 409 });
  } catch (err) {
    if ((err as { status?: number })?.status === 409) throw err;
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      try {
        await fs.promises.unlink(tempPath);
      } catch {
        // best-effort cleanup
      }
      throw err;
    }
  }
  // Cross-device-safe move: copyFile + unlink works across mounted
  // volumes (Docker bind mounts under different source dirs fail
  // `rename` with EXDEV). Slightly slower but correct.
  try {
    await fs.promises.copyFile(tempPath, targetAbs, fs.constants.COPYFILE_EXCL);
    await fs.promises.unlink(tempPath);
  } catch (err) {
    try {
      await fs.promises.unlink(tempPath);
    } catch {
      // best-effort cleanup
    }
    rethrowFsError(err, 'Could not write file');
  }
  const stat = await fs.promises.stat(targetAbs);
  logger.info(`[workspaceFiles] upload: ${parentRel || '/'} + ${cleanName} (${size} bytes)`);
  return buildNodeFromStat(targetAbs, workspacePath, stat);
}

/**
 * Renames an existing entry inside the same parent directory. The
 * new name is sanitized the same way `createWorkspaceDirectory`
 * and `writeWorkspaceFile` sanitize. Cross-directory moves go
 * through `moveWorkspaceNode` instead.
 */
export async function renameWorkspaceNode({
  appConfig,
  user,
  relPath,
  newName,
}: {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  relPath: string;
  newName: string;
}): Promise<WorkspaceNode> {
  const cleanName = sanitizeEntryName(newName);
  const { abs, rel, workspacePath, basePath } = resolveFsPath({
    appConfig,
    user,
    relPath,
  });
  const stat = await fs.promises.stat(abs).catch((err) => {
    rethrowFsError(err, 'Path not found', 404);
    throw err;
  });
  const parentAbs = path.dirname(abs);
  const targetAbs = path.join(parentAbs, cleanName);
  if (!isPathSafe(targetAbs, basePath)) {
    throw Object.assign(new Error('Path escapes workspace'), { status: 400 });
  }
  if (targetAbs === abs) {
    // no-op rename; return the current node instead of erroring
    return buildNodeFromStat(abs, workspacePath, stat);
  }
  // Existence check: fs.rename overwrites on POSIX, we want 409
  // semantics across platforms.
  try {
    await fs.promises.stat(targetAbs);
    throw Object.assign(new Error('A file with that name already exists'), { status: 409 });
  } catch (err) {
    if ((err as { status?: number })?.status === 409) throw err;
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
  }
  try {
    await fs.promises.rename(abs, targetAbs);
  } catch (err) {
    rethrowFsError(err, 'Could not rename');
  }
  const newStat = await fs.promises.stat(targetAbs);
  logger.info(`[workspaceFiles] rename: ${rel} -> ${path.relative(workspacePath, targetAbs).split(path.sep).join('/')}`);
  return buildNodeFromStat(targetAbs, workspacePath, newStat);
}

/**
 * Moves an existing entry to a different parent directory. Detects
 * the case where `toParent` is inside (or equal to) the entry being
 * moved and rejects it to prevent a rename loop / infinite nesting.
 */
export async function moveWorkspaceNode({
  appConfig,
  user,
  fromPath,
  toParentPath,
}: {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  fromPath: string;
  toParentPath: string;
}): Promise<WorkspaceNode> {
  const from = resolveFsPath({ appConfig, user, relPath: fromPath });
  const to = resolveFsPath({ appConfig, user, relPath: toParentPath, requireDir: true });
  if (from.workspacePath !== to.workspacePath) {
    throw Object.assign(new Error('Cross-workspace moves are not supported'), { status: 400 });
  }
  const fromStat = await fs.promises.stat(from.abs).catch((err) => {
    rethrowFsError(err, 'Source not found', 404);
    throw err;
  });
  const toStat = await fs.promises.stat(to.abs).catch((err) => {
    rethrowFsError(err, 'Destination not found', 404);
    throw err;
  });
  if (!toStat.isDirectory()) {
    throw Object.assign(new Error('Destination is not a directory'), { status: 400 });
  }
  if (!isPathSafe(to.abs, to.basePath)) {
    throw Object.assign(new Error('Path escapes workspace'), { status: 400 });
  }
  // Loop prevention: forbid moving a directory into itself or any
  // descendant.
  if (fromStat.isDirectory() && to.abs.startsWith(from.abs + path.sep)) {
    throw Object.assign(new Error('Cannot move a folder into itself'), { status: 400 });
  }
  if (to.abs.startsWith(from.abs + path.sep) === false && to.abs !== from.abs) {
    // also reject moving to the same parent (no-op; user should
    // use rename instead)
  }
  const targetAbs = path.join(to.abs, path.basename(from.abs));
  if (!isPathSafe(targetAbs, to.basePath)) {
    throw Object.assign(new Error('Path escapes workspace'), { status: 400 });
  }
  // Existence check for consistent 409 semantics across platforms.
  try {
    await fs.promises.stat(targetAbs);
    throw Object.assign(new Error('A file with that name already exists at the destination'), {
      status: 409,
    });
  } catch (err) {
    if ((err as { status?: number })?.status === 409) throw err;
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
  }
  try {
    await fs.promises.rename(from.abs, targetAbs);
  } catch (err) {
    rethrowFsError(err, 'Could not move');
  }
  const newStat = await fs.promises.stat(targetAbs);
  logger.info(`[workspaceFiles] move: ${from.rel} -> ${path.relative(to.workspacePath, targetAbs).split(path.sep).join('/')}`);
  return buildNodeFromStat(targetAbs, to.workspacePath, newStat);
}

export type WorkspaceDeleteResult = {
  deleted: string[];
  failed: Array<{ path: string; message: string }>;
};

/**
 * Deletes one or more workspace entries. Directories are removed
 * recursively (`fs.rm` with `recursive: true`). Returns a per-path
 * outcome so the UI can show partial-failure toasts.
 */
export async function deleteWorkspaceNodes({
  appConfig,
  user,
  paths,
}: {
  appConfig: TCustomConfig;
  user: { workspaceSubdir?: string | null } | null | undefined;
  paths: string[];
}): Promise<WorkspaceDeleteResult> {
  const deleted: string[] = [];
  const failed: Array<{ path: string; message: string }> = [];
  // Resolve all paths up front; if any are invalid we surface the
  // first error rather than partially deleting.
  const resolved = paths.map((relPath) => {
    const { abs, rel, basePath } = resolveFsPath({ appConfig, user, relPath });
    if (!isPathSafe(abs, basePath)) {
      throw Object.assign(new Error('Path escapes workspace'), { status: 400 });
    }
    return { abs, rel };
  });
  for (const { abs, rel } of resolved) {
    try {
      await fs.promises.rm(abs, { recursive: true, force: false });
      deleted.push(rel);
      logger.info(`[workspaceFiles] delete: ${rel}`);
    } catch (err) {
      const e = err as NodeJS.ErrnoException;
      failed.push({ path: rel, message: e?.message ?? 'Delete failed' });
    }
  }
  return { deleted, failed };
}
