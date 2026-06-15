const fs = require('fs').promises;
const path = require('path');
const { logger } = require('@librechat/data-schemas');

/**
 * Caps on the filesystem sync scan. The previous implementation recursed
 * into every directory under the workspace path with no upper bound and
 * would hang `GET /api/files` forever whenever a user's `workspaceSubdir`
 * pointed at (or contained) a heavy tree like `node_modules`, a
 * `.git/objects` pack, or a slow NFS mount.
 */
const MAX_SCAN_DEPTH = 16;
const MAX_SCAN_ENTRIES = 10_000;
const SCAN_TIMEOUT_MS = 5_000;

/** Directory basenames that are universally huge / irrelevant to
 *  user-facing files. These are the main reason past scans hung the
 *  request thread. */
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

const isCaseInsensitiveFs = process.platform === 'win32';

const shouldSkipDir = (name) => {
  if (IGNORED_DIRNAMES.has(name)) return true;
  if (isCaseInsensitiveFs && IGNORED_DIRNAMES.has(name.toLowerCase())) return true;
  return false;
};

const isHidden = (name) => name.startsWith('.');

/**
 * Bounded BFS walk of `workspacePath`. Designed to be safe to call on
 * user-controlled paths in a sync request handler:
 *
 *  - hard depth cap (`MAX_SCAN_DEPTH`)
 *  - hard entry cap (`MAX_SCAN_ENTRIES`); once reached, traversal stops
 *    and `truncated` is set
 *  - hard wall-clock cap (`SCAN_TIMEOUT_MS`); once hit, traversal stops
 *    and `timedOut` is set
 *  - skips heavy build/VCS directories from `IGNORED_DIRNAMES`
 *  - skips hidden entries (basename starts with `.`)
 *
 * On any of those limits the function still returns whatever it
 * already collected — partial results are better than a hung request.
 *
 * @param {object} options
 * @param {string} options.workspacePath - absolute path to scan
 * @param {number} [options.maxEntries] - override cap
 * @param {number} [options.maxDepth] - override cap
 * @param {number} [options.timeoutMs] - override cap
 * @returns {Promise<{
 *   entries: Array<{ absolutePath: string, relativePath: string, name: string }>,
 *   truncated: boolean,
 *   timedOut: boolean,
 *   scannedDirs: number,
 * }>}
 */
async function scanWorkspaceFiles({
  workspacePath,
  maxEntries = MAX_SCAN_ENTRIES,
  maxDepth = MAX_SCAN_DEPTH,
  timeoutMs = SCAN_TIMEOUT_MS,
} = {}) {
  if (!workspacePath) {
    return { entries: [], truncated: false, timedOut: false, scannedDirs: 0 };
  }

  const entries = [];
  let truncated = false;
  let timedOut = false;
  let scannedDirs = 0;
  const deadline = Date.now() + timeoutMs;
  const queue = [{ abs: workspacePath, depth: 0 }];

  while (queue.length > 0) {
    if (entries.length >= maxEntries) {
      truncated = true;
      break;
    }
    if (Date.now() >= deadline) {
      timedOut = true;
      break;
    }

    const { abs, depth } = queue.shift();
    if (depth > maxDepth) continue;

    let dirents;
    try {
      dirents = await fs.readdir(abs, { withFileTypes: true });
    } catch (readErr) {
      logger.warn(`[scanWorkspace] readdir failed for ${abs}:`, readErr);
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
        if (shouldSkipDir(dirent.name)) continue;
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

module.exports = {
  scanWorkspaceFiles,
  MAX_SCAN_DEPTH,
  MAX_SCAN_ENTRIES,
  SCAN_TIMEOUT_MS,
  IGNORED_DIRNAMES,
};
