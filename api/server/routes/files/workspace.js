const express = require('express');
const { logger } = require('@librechat/data-schemas');
const {
  listWorkspaceTree,
  searchWorkspaceTree,
  getWorkspaceFile,
  streamWorkspaceFile,
} = require('@librechat/api');

const router = express.Router();

const sendError = (res, err) => {
  const status = (err && err.status) || 500;
  if (status >= 500) {
    logger.error('[files/workspace] unexpected error:', err);
  }
  res.status(status).json({ message: err?.message ?? 'Internal Server Error' });
};

const getContentDisposition = (filename, download) => {
  const disposition = download ? 'attachment' : 'inline';
  // Escape quotes per RFC 6266; filenames stay ASCII-safe via the same
  // helper used by the legacy file-download route.
  const safe = String(filename).replace(/"/g, '');
  const encoded = encodeURIComponent(safe);
  return `${disposition}; filename*=UTF-8''${encoded}`;
};

/**
 * List one level of a user's workspace.
 * `path` is a workspace-relative POSIX path; empty means the workspace root.
 */
router.get('/tree', async (req, res) => {
  try {
    const relPath = typeof req.query.path === 'string' ? req.query.path : '';
    const result = await listWorkspaceTree({
      appConfig: req.config,
      user: req.user,
      relPath,
    });
    res.status(200).json(result);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * Recursive search across the user's workspace. Matches against the
 * basename of every entry; case-insensitive.
 */
router.get('/search', async (req, res) => {
  try {
    const query = typeof req.query.q === 'string' ? req.query.q : '';
    if (!query.trim()) {
      return res.status(200).json({ query: '', matches: [], total: 0, truncated: false });
    }
    const result = await searchWorkspaceTree({
      appConfig: req.config,
      user: req.user,
      query,
    });
    res.status(200).json(result);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * Streams a single file from the user's workspace. `?download=true`
 * flips the Content-Disposition to attachment so the browser saves
 * instead of inline-rendering. Range requests are intentionally NOT
 * implemented in step 2; the route is enough for image / video / audio
 * previews in the file manager. Add `Range` support when a real need
 * shows up (likely during scrubbing on large video files).
 */
router.get('/raw', async (req, res) => {
  try {
    const relPath = typeof req.query.path === 'string' ? req.query.path : '';
    if (!relPath) {
      return res.status(400).json({ message: 'path query parameter is required' });
    }
    const file = await getWorkspaceFile({
      appConfig: req.config,
      user: req.user,
      relPath,
    });
    const download = req.query.download === 'true' || req.query.download === '1';
    res.setHeader('Content-Type', file.mime || 'application/octet-stream');
    res.setHeader('Content-Length', String(file.size));
    res.setHeader('Content-Disposition', getContentDisposition(file.path.split('/').pop(), download));
    res.setHeader('Cache-Control', 'no-store');
    await streamWorkspaceFile({ file, res });
    res.end();
  } catch (err) {
    sendError(res, err);
  }
});

module.exports = router;
