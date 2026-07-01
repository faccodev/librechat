/**
 * Routes a validated git URL to the right fetcher.
 *
 * The fetcher returns a preview object carrying SKILL.md content
 * plus auxiliary file metadata. The route layer then either shows
 * that preview to the user or persists it via the existing
 * `createImportHandler` plumbing (single-file import already
 * supports .md uploads; we re-use its dep injection seam).
 */

import { detectHost, deriveSubpathFromUrlPath, validateSubpath } from './validator';
import type {
  GitHost,
  GitImportPreviewRequest,
  GitImportPreviewResponse,
} from './types';
import { previewGithub } from './fetchers/github';
import { previewGitlab } from './fetchers/gitlab';
import { previewBitbucket } from './fetchers/bitbucket';
import { previewGeneric } from './fetchers/generic';

export interface ResolvedGitImport extends GitImportPreviewRequest {
  host: GitHost;
  /** Subpath resolved (URL hint preferred over explicit `path`). */
  effectivePath: string;
}

/**
 * Normalize the user request: combine URL-derived path with the
 * optional explicit `path` argument (explicit wins), validate the
 * subpath charset, and detect the host.
 */
export function resolveGitImport(
  req: GitImportPreviewRequest,
): { ok: true; resolved: ResolvedGitImport } | { ok: false; reason: string } {
  const urlPath = (() => {
    try {
      return new URL(req.url).pathname;
    } catch {
      return '';
    }
  })();
  const derived = deriveSubpathFromUrlPath(urlPath);
  const explicit = validateSubpath(req.path);
  if (req.path && explicit === null) {
    return { ok: false, reason: 'Invalid subpath' };
  }
  // explicit is '' when the input is empty/undefined; we never reach this
  // branch with explicit === null thanks to the guard above.
  const effectivePath = explicit !== '' && explicit !== null ? explicit : derived;
  let host: URL;
  try {
    host = new URL(req.url);
  } catch {
    return { ok: false, reason: 'Invalid URL' };
  }
  const detected = detectHost(host.hostname);
  return {
    ok: true,
    resolved: {
      ...req,
      path: effectivePath,
      effectivePath,
      host: detected,
    },
  };
}

/**
 * Dispatch to the host-specific fetcher. Returns the preview shape
 * or throws a descriptive error to be caught by the route handler.
 */
export async function fetchGitImportPreview(
  resolved: ResolvedGitImport,
): Promise<GitImportPreviewResponse> {
  switch (resolved.host) {
    case 'github':
      return previewGithub(resolved);
    case 'gitlab':
      return previewGitlab(resolved);
    case 'bitbucket':
      return previewBitbucket(resolved);
    case 'generic':
    default:
      return previewGeneric(resolved);
  }
}