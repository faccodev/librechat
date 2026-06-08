const express = require('express');
const { logger } = require('@librechat/data-schemas');
const { listWorkspaceTree, searchWorkspaceTree } = require('@librechat/api');

const router = express.Router();

const sendError = (res, err) => {
  const status = (err && err.status) || 500;
  if (status >= 500) {
    logger.error('[files/workspace] unexpected error:', err);
  }
  res.status(status).json({ message: err?.message ?? 'Internal Server Error' });
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

module.exports = router;
