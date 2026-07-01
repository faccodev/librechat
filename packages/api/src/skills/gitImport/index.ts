/**
 * Barrel export for the "import skill from git URL" feature.
 *
 * Exposes the public surface consumed by the Express route in
 * `api/server/routes/skills.js`. The fetcher implementations and
 * internal helpers stay private to keep the API surface tight.
 */

export {
  createGitImportHandler,
  resolveGitImport,
  fetchGitImportPreview,
  validateGitUrl,
  validateSubpath,
  detectHost,
  isPrivateOrLoopbackHost,
  deriveSubpathFromUrlPath,
} from './handler';

export type { GitImportSkillDeps } from './handler';

export type {
  GitHost,
  GitImportPreviewRequest,
  GitImportPreviewResponse,
  GitImportSaveRequest,
  GitImportSaveResponse,
} from './types';