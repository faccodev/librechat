/**
 * Wire types for the "Import Skill from git URL" feature.
 *
 * The user pastes a git URL (GitHub / GitLab / Bitbucket / any git
 * host). The resolver detects the host and picks the cheapest fetcher
 * — public-host APIs do not need to clone the full repo. The
 * preview/save flow returns SKILL.md content + zero or more
 * auxiliary files that get persisted via the existing
 * `createImportHandler` pipeline.
 */

export type GitHost = 'github' | 'gitlab' | 'bitbucket' | 'generic';

export interface GitImportPreviewRequest {
  /** Public https git URL — `https://github.com/owner/repo[/path/to/skill]`. */
  url: string;
  /** Git ref (branch/tag/sha). Defaults to the host's default branch. */
  ref?: string;
  /**
   * Path within the repo to treat as the skill root. Defaults to
   * repo root. Supports the same conventions as `npx skills`:
   * the root directory or a single `skills/<name>/` subdirectory.
   */
  path?: string;
}

export interface GitImportPreviewResponse {
  host: GitHost;
  /** Repository identifier as the host exposes it (e.g. `owner/repo`). */
  repository: string;
  /** Resolved branch/tag/sha used for the preview. */
  ref: string;
  /** Effective subdirectory within the repo we scanned. */
  path: string;
  /** SKILL.md content (decoded text). Empty if not found. */
  skillMd: string;
  /** Files discovered alongside SKILL.md, names relative to the skill root. */
  files: Array<{
    path: string;
    bytes: number;
  }>;
  /** Non-fatal warnings (e.g. files skipped due to size cap). */
  warnings: string[];
}

export interface GitImportSaveRequest extends GitImportPreviewRequest {
  /** Optional override for the skill name (defaults to frontmatter name). */
  name?: string;
}

export interface GitImportSaveResponse {
  /** Created skill document (same shape `createSkill` returns). */
  skill: {
    _id: string;
    name: string;
    description?: string;
    body: string;
    alwaysApply?: boolean;
    [key: string]: unknown;
  };
  /** Per-file import summary, matching the zip import shape. */
  importSummary: {
    filesProcessed: number;
    filesSucceeded: number;
    filesFailed: number;
    errors: Array<{ path: string; error: string }>;
  };
  /** URL metadata persisted as `metadata: { source: { url, ref, importedAt } }`. */
  source: {
    url: string;
    ref: string;
    path: string;
    importedAt: string;
  };
}