/**
 * GitLab REST API fetcher.
 *
 * Uses the public `GET /api/v4/projects/{url-encoded-path}/repository/tree`
 * endpoint to list files. SKILL.md content is fetched via the
 * `repository/files/{path}/raw?ref={ref}` endpoint.
 *
 * Path encoding: GitLab expects the `url-encoded` project path,
 * e.g. `group%2Fsub%2Fproject` for `group/sub/project`.
 */

import { logger } from '@librechat/data-schemas';
import type {
  GitImportPreviewRequest,
  GitImportPreviewResponse,
} from '../types';

const API_BASE = 'https://gitlab.com/api/v4';

const PER_FILE_SIZE_CAP = 1_000_000;
const TOTAL_SIZE_CAP = 10_000_000;

interface GitlabTreeEntry {
  name: string;
  path: string;
  type: 'blob' | 'tree';
  size?: number;
}

interface GitlabProjectMeta {
  default_branch?: string;
  [key: string]: unknown;
}

function parseRepoFromPath(path: string): string[] {
  const segments = path.split('/').filter(Boolean);
  if (segments.length < 2) {
    throw new Error('GitLab URL must include group/project');
  }
  return segments;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'LibreChat/skill-import' },
  });
  if (!res.ok) {
    throw new Error(`GitLab API ${res.status}: ${res.statusText}`);
  }
  return (await res.json()) as T;
}

async function fetchDefaultBranch(projectId: string): Promise<string> {
  try {
    const meta = await fetchJson<GitlabProjectMeta>(`${API_BASE}/projects/${projectId}`);
    return meta.default_branch || 'main';
  } catch (err) {
    logger.warn('[gitImport.gitlab] default branch fetch failed, falling back to main', err);
    return 'main';
  }
}

export async function previewGitlab(
  req: GitImportPreviewRequest,
): Promise<GitImportPreviewResponse> {
  const repoPath = req.path ?? '';
  const segments = parseRepoFromPath(repoPath);
  const projectId = encodeURIComponent(segments.join('/'));
  const subpath = repoPath.split('/').slice(2).join('/');
  const ref = req.ref || (await fetchDefaultBranch(projectId));

  const treeParams = new URLSearchParams({
    path: subpath,
    ref,
    recursive: 'false',
    per_page: '100',
  });
  const entries = await fetchJson<GitlabTreeEntry[]>(
    `${API_BASE}/projects/${projectId}/repository/tree?${treeParams.toString()}`,
  );
  if (!Array.isArray(entries)) {
    throw new Error('GitLab tree response was not an array');
  }

  const warnings: string[] = [];
  let totalBytes = 0;
  let skillMd = '';
  const files: Array<{ path: string; bytes: number }> = [];

  for (const entry of entries) {
    if (entry.type === 'tree') continue;
    if (entry.name.toUpperCase() === 'SKILL.MD') {
      const rawUrl = `${API_BASE}/projects/${projectId}/repository/files/${encodeURIComponent(entry.path)}/raw?ref=${encodeURIComponent(ref)}`;
      const res = await fetch(rawUrl, {
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
    files.push({ path: entry.name, bytes: entry.size ?? 0 });
    totalBytes += entry.size ?? 0;
  }

  return {
    host: 'gitlab',
    repository: segments.join('/'),
    ref,
    path: subpath,
    skillMd,
    files,
    warnings,
  };
}