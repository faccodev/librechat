/**
 * GitHub Contents API fetcher.
 *
 * Uses the public `GET /repos/{owner}/{repo}/contents/{path}?ref={ref}`
 * endpoint to list files in a directory. For the SKILL.md itself
 * (`Accept: application/vnd.github.raw`) the response body is the
 * raw text, which we return directly without JSON parsing.
 *
 * No auth. Rate-limited (60/hr unauthenticated, 5000/hr with token);
 * upstream cache layer absorbs bursts.
 */

import { logger } from '@librechat/data-schemas';
import type {
  GitImportPreviewRequest,
  GitImportPreviewResponse,
} from '../types';

const API_BASE = 'https://api.github.com';

const PER_FILE_SIZE_CAP = 1_000_000; // 1 MB per file in preview
const TOTAL_SIZE_CAP = 10_000_000; // 10 MB total preview

interface GithubContentEntry {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size: number;
  download_url: string | null;
}

interface GithubRepoMeta {
  default_branch: string;
}

function parseRepoFromPath(path: string): { owner: string; repo: string; rest: string[] } {
  const segments = path.split('/').filter(Boolean);
  if (segments.length < 2) {
    throw new Error('GitHub URL must include owner/repo');
  }
  const [owner, repo, ...rest] = segments;
  return { owner, repo, rest };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'LibreChat/skill-import',
    },
  });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
  }
  return (await res.json()) as T;
}

async function fetchDefaultBranch(owner: string, repo: string): Promise<string> {
  try {
    const meta = await fetchJson<GithubRepoMeta>(`${API_BASE}/repos/${owner}/${repo}`);
    return meta.default_branch;
  } catch (err) {
    logger.warn('[gitImport.github] default branch fetch failed, falling back to main', err);
    return 'main';
  }
}

export async function previewGithub(
  req: GitImportPreviewRequest,
): Promise<GitImportPreviewResponse> {
  const repoPath = req.path ?? '';
  const { owner, repo, rest } = parseRepoFromPath(repoPath);
  const subpath = rest.join('/');
  const ref = req.ref || (await fetchDefaultBranch(owner, repo));

  // Two-step: contents listing at the resolved subpath, then raw
  // fetch of SKILL.md.
  const contentsUrl = `${API_BASE}/repos/${owner}/${repo}/contents/${subpath}?ref=${encodeURIComponent(ref)}`;
  const entries = await fetchJson<GithubContentEntry[]>(contentsUrl);
  if (!Array.isArray(entries)) {
    throw new Error('GitHub contents response was not an array');
  }

  const warnings: string[] = [];
  let totalBytes = 0;
  let skillMd = '';
  const files: Array<{ path: string; bytes: number }> = [];

  for (const entry of entries) {
    if (entry.type === 'dir') {
      // v1: do not recurse — single-level scan matches `npx skills`
      // behavior and keeps the preview bounded.
      continue;
    }
    if (entry.name.toUpperCase() === 'SKILL.MD') {
      const rawRes = await fetch(
        `${API_BASE}/repos/${owner}/${repo}/contents/${entry.path}?ref=${encodeURIComponent(ref)}`,
        { headers: { Accept: 'application/vnd.github.raw' } },
      );
      if (!rawRes.ok) {
        warnings.push(`Failed to fetch SKILL.md (${rawRes.status})`);
        continue;
      }
      skillMd = await rawRes.text();
      totalBytes += skillMd.length;
      continue;
    }
    if (entry.size > PER_FILE_SIZE_CAP) {
      warnings.push(`Skipping ${entry.path}: exceeds per-file preview cap`);
      continue;
    }
    if (totalBytes + entry.size > TOTAL_SIZE_CAP) {
      warnings.push(`Skipping ${entry.path}: would exceed total preview cap`);
      continue;
    }
    files.push({ path: entry.name, bytes: entry.size });
    totalBytes += entry.size;
  }

  return {
    host: 'github',
    repository: `${owner}/${repo}`,
    ref,
    path: subpath,
    skillMd,
    files,
    warnings,
  };
}