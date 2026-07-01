/**
 * URL safety for the git import flow.
 *
 * The fetcher reaches arbitrary user-supplied URLs over the network.
 * We block schemes other than https, block private IP ranges (RFC
 * 1918, loopback, link-local) that an attacker could use to probe
 * internal services, and constrain the path charset so the captured
 * path flows into filenames without escaping.
 */

import { URL } from 'url';

export type UrlValidationResult =
  | { ok: true; url: URL; path: string }
  | { ok: false; reason: string };

const ALLOWED_HOSTS = new Set(['github.com', 'gitlab.com', 'bitbucket.org']);

const PRIVATE_IPV4_PATTERNS: ReadonlyArray<RegExp> = [
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^127\./,
  /^169\.254\./,
  /^0\./,
];

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  '0.0.0.0',
  '[::1]',
  '::1',
  'metadata.google.internal',
  'metadata',
]);

/**
 * Strip any embedded credentials and normalize the path component
 * before returning it for filesystem use.
 */
function cleanPath(rawPath: string): string {
  // Drop query/fragment — the fetcher doesn't need them.
  const noQuery = rawPath.split('?')[0].split('#')[0];
  // Collapse repeated slashes and trim leading/trailing slashes.
  return noQuery.replace(/\/+/g, '/').replace(/^\/+/, '').replace(/\/+$/, '');
}

/**
 * Detect whether a resolved hostname is a private/loopback/link-local
 * address. Catches the common SSRF vectors (localhost, 127.0.0.0/8,
 * 169.254.0.0/16, 10/8, 172.16/12, 192.168/16) and the well-known
 * cloud metadata endpoints.
 */
export function isPrivateOrLoopbackHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (BLOCKED_HOSTNAMES.has(lower)) {
    return true;
  }
  if (PRIVATE_IPV4_PATTERNS.some((re) => re.test(lower))) {
    return true;
  }
  // IPv6 ULA (fc00::/7), link-local (fe80::/10), loopback (::1).
  if (lower.includes(':')) {
    if (
      lower.startsWith('fc') ||
      lower.startsWith('fd') ||
      lower.startsWith('fe8') ||
      lower.startsWith('fe9') ||
      lower.startsWith('fea') ||
      lower.startsWith('feb') ||
      lower === '::1'
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Detect which fetcher to use based on hostname. Unknown hosts fall
 * through to the generic clone fetcher.
 */
export function detectHost(hostname: string): 'github' | 'gitlab' | 'bitbucket' | 'generic' {
  const lower = hostname.toLowerCase();
  if (ALLOWED_HOSTS.has(lower)) {
    return lower === 'github.com'
      ? 'github'
      : lower === 'gitlab.com'
        ? 'gitlab'
        : 'bitbucket';
  }
  return 'generic';
}

/**
 * Validate and normalize a user-supplied git URL. Returns the
 * cleaned URL and path, or a reason for rejection.
 */
export function validateGitUrl(input: string): UrlValidationResult {
  let url: URL;
  try {
    url = new URL(input);
  } catch {
    return { ok: false, reason: 'Invalid URL' };
  }
  if (url.protocol !== 'https:') {
    return { ok: false, reason: 'Only https:// URLs are allowed' };
  }
  if (url.username || url.password) {
    return { ok: false, reason: 'URLs with embedded credentials are not allowed' };
  }
  if (isPrivateOrLoopbackHost(url.hostname)) {
    return { ok: false, reason: 'Private or loopback hosts are not allowed' };
  }
  const cleanedPath = cleanPath(url.pathname);
  // Replace the URL's path so downstream fetcher gets the cleaned version.
  return { ok: true, url: new URL(`https://${url.hostname}/${cleanedPath}`), path: cleanedPath };
}

/**
 * Validate the optional in-repo subpath. Allows the same charset as
 * skill file paths (`a-z0-9._-/`), max 256 chars, no traversal.
 *
 * Subpaths are interpreted relative to the repo root. A trailing
 * `/` is always tolerated and stripped (copy-paste from URLs is
 * common). A leading `/` is **only** tolerated when paired with a
 * trailing `/` — `/leading-slash/` → `leading-slash`, but a bare
 * `/absolute` is rejected as an absolute path. This intentionally
 * permissive-but-narrow behavior keeps the round-trip with the URL
 * paste UI (which trims trailing `/`) lossless while still rejecting
 * paths that the user clearly meant as absolute filesystem paths.
 */
export function validateSubpath(subpath: string | undefined): string | null {
  if (subpath === undefined || subpath === '') return '';
  const hasTrailingSlash = subpath.endsWith('/');
  const noTrailing = subpath.replace(/\/+$/, '');
  const startsWithSlash = noTrailing.startsWith('/');
  // Only allow a leading `/` when the original had a trailing `/`.
  if (startsWithSlash && !hasTrailingSlash) return null;
  const trimmed = noTrailing.replace(/^\/+/, '');
  if (trimmed === '') return null;
  if (trimmed.length > 256) return null;
  if (!/^[a-zA-Z0-9._\-/]+$/.test(trimmed)) return null;
  const segments = trimmed.split('/');
  if (segments.some((s) => s === '.' || s === '..' || s.includes('..'))) {
    return null;
  }
  return trimmed;
}

/**
 * Derive the default subpath when the user pastes a URL pointing at
 * a file like `/owner/repo/blob/main/skills/foo/SKILL.md` — we want
 * to treat that as the skill root `skills/foo`, not the file itself.
 */
export function deriveSubpathFromUrlPath(urlPath: string): string {
  const segments = urlPath.split('/').filter(Boolean);
  // owner/repo/tree/<ref>/<path...> → use everything after the ref.
  // GitLab uses `src` for the same idea; we keep `blob` out — when
  // a user pastes a `blob/<ref>/...` URL they usually mean a file
  // view, not the skill root, so we leave it for the explicit
  // `path` argument rather than guessing.
  if (
    segments.length >= 5 &&
    (segments[2] === 'tree' || segments[2] === 'src')
  ) {
    return segments.slice(4).join('/');
  }
  return '';
}