/**
 * Generic git fetcher — shallow clone via `simple-git`.
 *
 * Used for any host that is not GitHub / GitLab / Bitbucket (Codeberg,
 * Gitea self-hosted, GitBucket, etc). The clone target is a tmp
 * directory under `os.tmpdir()`; we read SKILL.md + same-level
 * files and delete the clone after the preview is built.
 *
 * Network hardening:
 *   - `--depth 1` keeps the clone fast and bounded.
 *   - 30s timeout on the clone operation.
 *   - Never expose the tmp dir to the API response — only file
 *     contents flow back.
 */

import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import simpleGit from 'simple-git';
import { logger } from '@librechat/data-schemas';
import type {
  GitImportPreviewRequest,
  GitImportPreviewResponse,
} from '../types';

const CLONE_TIMEOUT_MS = 30_000;
const PER_FILE_SIZE_CAP = 1_000_000;
const TOTAL_SIZE_CAP = 10_000_000;

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readdirSafe(dir: string): Promise<string[]> {
  try {
    return await fs.readdir(dir);
  } catch {
    return [];
  }
}

export async function previewGeneric(
  req: GitImportPreviewRequest,
): Promise<GitImportPreviewResponse> {
  const tmpRoot = path.join(
    os.tmpdir(),
    `librechat-skill-import-${crypto.randomBytes(8).toString('hex')}`,
  );
  await fs.mkdir(tmpRoot, { recursive: true });

  try {
    const git = simpleGit({ baseDir: tmpRoot });
    const cloneArgs = ['--depth', '1'];
    if (req.ref) {
      cloneArgs.push('--branch', req.ref);
    }
    cloneArgs.push(req.url, tmpRoot);

    // Simple-git does not expose a per-call timeout; race the clone
    // against a manual timer so we never hang the route handler.
    const clonePromise = git.clone(req.url, tmpRoot, cloneArgs.slice(2));
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Clone timed out after ${CLONE_TIMEOUT_MS}ms`)), CLONE_TIMEOUT_MS),
    );
    await Promise.race([clonePromise, timeoutPromise]);

    // After clone, the worktree is at tmpRoot. If a subpath was given,
    // descend into it.
    const workdir = req.path ? path.join(tmpRoot, req.path) : tmpRoot;
    if (!(await exists(workdir))) {
      throw new Error(`Cloned repo does not contain path "${req.path}"`);
    }

    const warnings: string[] = [];
    let totalBytes = 0;
    let skillMd = '';
    const files: Array<{ path: string; bytes: number }> = [];

    const entries = await readdirSafe(workdir);
    for (const name of entries) {
      const full = path.join(workdir, name);
      const stat = await fs.stat(full).catch(() => null);
      if (!stat || !stat.isFile()) continue;
      if (name.toUpperCase() === 'SKILL.MD') {
        skillMd = await fs.readFile(full, 'utf-8');
        totalBytes += skillMd.length;
        continue;
      }
      if (stat.size > PER_FILE_SIZE_CAP) {
        warnings.push(`Skipping ${name}: exceeds per-file preview cap`);
        continue;
      }
      if (totalBytes + stat.size > TOTAL_SIZE_CAP) {
        warnings.push(`Skipping ${name}: would exceed total preview cap`);
        continue;
      }
      files.push({ path: name, bytes: stat.size });
      totalBytes += stat.size;
    }

    return {
      host: 'generic',
      repository: req.url,
      ref: req.ref || 'HEAD',
      path: req.path || '',
      skillMd,
      files,
      warnings,
    };
  } catch (err) {
    logger.error('[gitImport.generic] Clone failed:', err);
    throw new Error(
      `Failed to clone repository: ${(err as Error)?.message ?? 'unknown error'}`,
    );
  } finally {
    await fs.rm(tmpRoot, { recursive: true, force: true }).catch(() => undefined);
  }
}