const express = require('express');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const { logger } = require('@librechat/data-schemas');
const { sanitizeFilename } = require('@librechat/api');
const {
  listWorkspaceTree,
  searchWorkspaceTree,
  getWorkspaceFile,
  streamWorkspaceFile,
  createWorkspaceDirectory,
  createWorkspaceFile,
  writeWorkspaceFile,
  writeWorkspaceContent,
  renameWorkspaceNode,
  moveWorkspaceNode,
  deleteWorkspaceNodes,
} = require('@librechat/api');

/**
 * Workspace uploads deliberately skip the project-wide `fileFilter`
 * in `routes/files/multer.js` because:
 *  1. That filter is keyed off `req.body.endpoint`, which is undefined
 *     for workspace uploads — it falls back to the default allowlist
 *     and rejects `application/octet-stream` (any binary without a
 *     registered mime) before the file ever hits disk.
 *  2. Workspace files are user-managed, not agent-attached, so the
 *     endpoint-allowlist semantics don't apply.
 * The storage layout (temp dir per user) is reused; the file is
 * sanitized once more via `sanitizeEntryName` in the route handler
 * before the cross-device move.
 */
const buildWorkspaceUpload = () =>
  multer({
    storage: multer.diskStorage({
      destination(req, _file, cb) {
        const outputPath = path.join(
          req.config.paths.uploads,
          'temp',
          req.user.id,
        );
        try {
          fsSync.mkdirSync(outputPath, { recursive: true });
        } catch (err) {
          return cb(err);
        }
        cb(null, outputPath);
      },
      filename(_req, file, cb) {
        try {
          file.originalname = decodeURIComponent(file.originalname);
          const safe = sanitizeFilename(file.originalname);
          cb(null, safe);
        } catch (err) {
          cb(err);
        }
      },
    }),
  });

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

/* ---- CRUD (step 3) ---- */

/**
 * Creates a new directory. `parentPath` defaults to the workspace
 * root when empty; `name` is sanitized by the helper.
 */
router.post('/mkdir', async (req, res) => {
  try {
    const parentPath = typeof req.body?.parentPath === 'string' ? req.body.parentPath : '';
    const name = typeof req.body?.name === 'string' ? req.body.name : '';
    const node = await createWorkspaceDirectory({
      appConfig: req.config,
      user: req.user,
      parentPath,
      name,
    });
    res.status(201).json(node);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * Creates a new file (empty or seeded with `content`). Body:
 *   { parentPath: string, name: string, content?: string }
 */
router.post('/create', async (req, res) => {
  try {
    const parentPath = typeof req.body?.parentPath === 'string' ? req.body.parentPath : '';
    const name = typeof req.body?.name === 'string' ? req.body.name : '';
    const content = typeof req.body?.content === 'string' ? req.body.content : '';
    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }
    const node = await createWorkspaceFile({
      appConfig: req.config,
      user: req.user,
      parentPath,
      name,
      content,
    });
    res.status(201).json(node);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * Overwrites the content of an existing workspace file. The body
 * is plain text (UTF-8) and is rejected if it exceeds the workspace
 * size limit. Used by the in-modal editor for text/code files.
 */
router.put('/content', async (req, res) => {
  try {
    const path = typeof req.body?.path === 'string' ? req.body.path : '';
    const content = typeof req.body?.content === 'string' ? req.body.content : '';
    if (!path) {
      return res.status(400).json({ message: 'path is required' });
    }
    const node = await writeWorkspaceContent({
      appConfig: req.config,
      user: req.user,
      relPath: path,
      content,
    });
    res.status(200).json(node);
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * Multipart upload. The `file` field is moved into `parentPath`
 * (default root) with its original filename. The destination name
 * is sanitized the same way as `createWorkspaceDirectory`. Uses a
 * dedicated multer instance (no restrictive fileFilter) — see
 * `buildWorkspaceUpload` above for the rationale.
 */
router.post('/upload', async (req, res, next) => {
  let tempPath = null;
  try {
    const upload = buildWorkspaceUpload();
    await new Promise((resolve, reject) => {
      upload.single('file')(req, res, (err) => (err ? reject(err) : resolve()));
    });
    if (!req.file) {
      return res.status(400).json({ message: 'file field is required' });
    }
    tempPath = req.file.path;
    const parentPath = typeof req.query.parentPath === 'string' ? req.query.parentPath : '';
    const node = await writeWorkspaceFile({
      appConfig: req.config,
      user: req.user,
      parentPath,
      originalName: req.file.originalname,
      tempPath,
      size: req.file.size ?? 0,
    });
    res.status(201).json(node);
  } catch (err) {
    if (tempPath) {
      fs.unlink(tempPath).catch(() => {});
    }
    if (err && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'File exceeds the workspace size limit' });
    }
    sendError(res, err);
  }
});

/** Renames a file or folder in place. */
router.patch('/rename', async (req, res) => {
  try {
    const path = typeof req.body?.path === 'string' ? req.body.path : '';
    const newName = typeof req.body?.newName === 'string' ? req.body.newName : '';
    if (!path || !newName) {
      return res.status(400).json({ message: 'path and newName are required' });
    }
    const node = await renameWorkspaceNode({
      appConfig: req.config,
      user: req.user,
      relPath: path,
      newName,
    });
    res.status(200).json(node);
  } catch (err) {
    sendError(res, err);
  }
});

/** Moves a file or folder to a different parent directory. */
router.patch('/move', async (req, res) => {
  try {
    const from = typeof req.body?.from === 'string' ? req.body.from : '';
    const toParent = typeof req.body?.toParent === 'string' ? req.body.toParent : '';
    if (!from || !toParent) {
      return res.status(400).json({ message: 'from and toParent are required' });
    }
    const node = await moveWorkspaceNode({
      appConfig: req.config,
      user: req.user,
      fromPath: from,
      toParentPath: toParent,
    });
    res.status(200).json(node);
  } catch (err) {
    sendError(res, err);
  }
});

/** Deletes one or more entries. Returns per-path outcomes. */
router.delete('/', async (req, res) => {
  try {
    const paths = Array.isArray(req.body?.paths) ? req.body.paths : null;
    if (!paths || paths.length === 0) {
      return res.status(400).json({ message: 'paths must be a non-empty array' });
    }
    const result = await deleteWorkspaceNodes({
      appConfig: req.config,
      user: req.user,
      paths,
    });
    res.status(200).json(result);
  } catch (err) {
    sendError(res, err);
  }
});

module.exports = router;
