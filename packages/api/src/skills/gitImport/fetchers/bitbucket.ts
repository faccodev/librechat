/**
 * Bitbucket Cloud REST API fetcher (v2.0).
 *
 * Uses the public `GET /2.0/repositories/{workspace}/{repo_slug}/src/{ref}/{path}`
 * endpoint for the directory listing (paginated) and the matching
 * `raw` link for SKILL.md content. No auth needed for public repos.
 */

import { logger } from '@librechat/data-schemas';
import type {
  GitImportPreviewRequest,
  GitImportPreviewResponse,
} from '../types';

const API_BASE = 'https://api.bitbucket.org/2.0';

const PER_FILE_SIZE_CAP = 1_000_000;
const TOTAL_SIZE_CAP = 10_000_000;

interface BitbucketPaginated<T> {
  values: T[];
  next?: string;
}

interface BitbucketSrcEntry {
  path: string;
  type: 'commit_file' | 'commit_directory';
  size?: number;
  links?: {
    self?: { href: string };
  };
}

interface BitbucketRepoMeta {
  mainbranch?: { name: string };
  [key: string]: unknown;
}

function parseRepoFromPath(path: string): { workspace: string; repo: string } {
  const segments = path.split('/').filter(Boolean);
  if (segments.length < 2) {
    throw new Error('Bitbucket URL must include workspace/repo');
  }
  return { workspace: segments[0], repo: segments[1] };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'LibreChat/skill-import' },
  });
  if (!res.ok) {
    throw new Error(`Bitbucket API ${res.status}: ${res.statusText}`);
  }
  return (await res.json()) as T;
}

async function fetchDefaultBranch(workspace: string, repo: string): Promise<string> {
  try {
    const meta = await fetchJson<BitbucketRepoMeta>(
      `${API_BASE}/repositories/${workspace}/${repo}`,
    );
    return meta.mainbranch?.name || 'main';
  } catch (err) {
    logger.warn('[gitImport.bitbucket] default branch fetch failed, falling back to main', err);
    return 'main';
  }
}

export async function previewBitbucket(
  req: GitImportPreviewRequest,
): Promise<GitImportPreviewResponse> {
  const repoPath = req.path ?? '';
  const { workspace, repo } = parseRepoFromPath(repoPath);
  const segments = repoPath.split('/').filter(Boolean);
  const subpath = segments.slice(2).join('/');
  const ref = req.ref || (await fetchDefaultBranch(workspace, repo));

  const srcUrl = subpath
    ? `${API_BASE}/repositories/${workspace}/${repo}/src/${encodeURIComponent(ref)}/${subpath}?pagelen=100`
    : `${API_BASE}/repositories/${workspace}/${repo}/src/${encodeURIComponent(ref)}?pagelen=100`;
  const page = await fetchJson<BitbucketPaginated<BitbucketSrcEntry>>(srcUrl);
  const entries = page.values ?? [];

  const warnings: string[] = [];
  let totalBytes = 0;
  let skillMd = '';
  const files: Array<{ path: string; bytes: number }> = [];

  for (const entry of entries) {
    if (entry.type === 'commit_directory') continue;
    const name = entry.path.split('/').pop() ?? '';
    if (name.toUpperCase() === 'SKILL.MD') {
      const rawLink = entry.links?.self?.href;
      if (!rawLink) {
        warnings.push(`No raw link for ${entry.path}`);
        continue;
      }
      const res = await fetch(rawLink, {
        headers: { 'User-Agent': 'LibreChat/skill-import' },
      });
      if (!res.ok) {
        warnings.push(`Failed to fetch SKILL.md (${res.status})`);
        continue;
      }
      skillMd = await res.text();
      totalBytes += skillMd.length;
      continue;
    }
    if ((entry.size ?? 0) > PER_FILE_SIZE_CAP) {
      warnings.push(`Skipping ${entry.path}: exceeds per-file preview cap`);
      continue;
    }
    if (totalBytes + (entry.size ?? 0) > TOTAL_SIZE_CAP) {
      warnings.push(`Skipping ${entry.path}: would exceed total preview cap`);
      continue;
    }
    files.push({ path: name, bytes: entry.size ?? 0 });
    totalBytes += entry.size ?? 0;
  }

  return {
    host: 'bitbucket',
    repository: `${workspace}/${repo}`,
    ref,
    path: subpath,
    skillMd,
    files,
    warnings,
  };
}