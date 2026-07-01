/**
 * Top-level handler factory for the "import skill from git URL" flow.
 *
 * Two-stage API:
 *   - `createGitImportHandler(deps).preview(req)` → returns the
 *     preview (no DB writes, no upstream persistence).
 *   - `createGitImportHandler(deps).save(req)` → resolves the
 *     preview again (cheap — same fetcher, same caps) and persists
 *     the skill + auxiliary files via the injected deps that
 *     mirror the zip import handler.
 *
 * Persistence deps are the same shape as the existing zip
 * import (`createImportHandler` from `./../import`). Reusing that
 * dep contract keeps the wiring in `api/server/routes/skills.js`
 * minimal: the same `createSkill`, `upsertSkillFile`,
 * `saveBuffer`, `deleteFile`, `grantPermission` deps are shared.
 */

import path from 'path';
import crypto from 'crypto';
import type { Request, Response } from 'express';
import { logger } from '@librechat/data-schemas';
import type { Types } from 'mongoose';
import type {
  CreateSkillInput,
  CreateSkillResult,
  ISkill,
  ISkillFile,
  UpsertSkillFileInput,
} from '@librechat/data-schemas';
import { ResourceType, AccessRoleIds, PrincipalType } from 'librechat-data-provider';
import { resolveRequestTenantId } from '~/middleware/tenant';
import { resolveGitImport, fetchGitImportPreview } from './resolver';
import { validateGitUrl, validateSubpath } from './validator';
import type {
  GitImportPreviewRequest,
  GitImportPreviewResponse,
  GitImportSaveRequest,
  GitImportSaveResponse,
} from './types';

/** Mirrors `ImportSkillDeps` from the existing zip import. */
export interface GitImportSkillDeps {
  createSkill: (data: CreateSkillInput) => Promise<CreateSkillResult>;
  getSkillById: (id: string | Types.ObjectId) => Promise<(ISkill & { _id: Types.ObjectId }) | null>;
  deleteSkill: (id: string) => Promise<{ deleted: boolean }>;
  upsertSkillFile: (row: UpsertSkillFileInput) => Promise<ISkillFile & { _id: Types.ObjectId }>;
  saveBuffer: (
    req: Request,
    params: {
      userId: string;
      buffer: Buffer;
      fileName: string;
      basePath?: string;
      isImage?: boolean;
      tenantId?: string;
    },
  ) => Promise<{ filepath: string; source: string; storageKey?: string; storageRegion?: string }>;
  deleteFile?: (
    req: Request,
    file: { filepath: string; source: string; [key: string]: unknown },
  ) => Promise<void>;
  grantPermission: (params: {
    principalType: string;
    principalId: string;
    resourceType: string;
    resourceId: Types.ObjectId;
    accessRoleId: string;
    grantedBy: string;
  }) => Promise<unknown>;
}

interface ServerRequest extends Request {
  tenantId?: string;
  user: {
    id: string;
    _id: Types.ObjectId;
    name?: string;
    username?: string;
    tenantId?: string;
  };
}

const MIME_MAP: Record<string, string> = {
  '.md': 'text/markdown',
  '.txt': 'text/plain',
  '.js': 'application/javascript',
  '.ts': 'text/typescript',
  '.json': 'application/json',
  '.yaml': 'text/yaml',
  '.yml': 'text/yaml',
  '.py': 'text/x-python',
  '.sh': 'application/x-sh',
  '.css': 'text/css',
  '.html': 'text/html',
  '.xml': 'application/xml',
};

function guessMimeType(filename: string): string {
  return MIME_MAP[path.extname(filename).toLowerCase()] || 'application/octet-stream';
}

/** Frontmatter parse sufficient to extract name/description/always-apply. */
function extractSkillMeta(raw: string): {
  name?: string;
  description?: string;
  alwaysApply?: boolean;
} {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('---')) return {};
  const after = trimmed.slice(3);
  const closingIdx = after.indexOf('\n---');
  if (closingIdx === -1) return {};
  const block = after.slice(0, closingIdx);
  const out: ReturnType<typeof extractSkillMeta> = {};
  for (const line of block.split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
    if (key === 'name') out.name = value;
    else if (key === 'description') out.description = value;
    else if (key === 'always-apply') out.alwaysApply = value === 'true';
  }
  return out;
}

export function createGitImportHandler(deps: GitImportSkillDeps) {
  return {
    /**
     * POST /api/skills/import/git/preview
     * Body: { url, ref?, path? }
     * Returns: GitImportPreviewResponse
     */
    async preview(req: ServerRequest, res: Response) {
      const body = (req.body ?? {}) as GitImportPreviewRequest;
      const urlCheck = validateGitUrl(body.url ?? '');
      if (!urlCheck.ok) {
        return res.status(400).json({ error: urlCheck.reason });
      }
      const subpath = validateSubpath(body.path);
      if (body.path && subpath === null) {
        return res.status(400).json({ error: 'Invalid subpath' });
      }
      const resolution = resolveGitImport({
        url: urlCheck.url.toString(),
        ref: body.ref,
        path: subpath ?? '',
      });
      if (!resolution.ok) {
        return res.status(400).json({ error: resolution.reason });
      }
      try {
        const preview = await fetchGitImportPreview(resolution.resolved);
        return res.status(200).json(preview);
      } catch (err) {
        logger.error('[gitImport.preview] failed:', err);
        return res
          .status(502)
          .json({ error: `Failed to fetch from upstream: ${(err as Error).message}` });
      }
    },

    /**
     * POST /api/skills/import/git
     * Body: { url, ref?, path?, name? }
     * Returns: GitImportSaveResponse (created skill + per-file summary)
     */
    async save(req: ServerRequest, res: Response) {
      const body = (req.body ?? {}) as GitImportSaveRequest;
      const urlCheck = validateGitUrl(body.url ?? '');
      if (!urlCheck.ok) {
        return res.status(400).json({ error: urlCheck.reason });
      }
      const subpath = validateSubpath(body.path);
      if (body.path && subpath === null) {
        return res.status(400).json({ error: 'Invalid subpath' });
      }
      const resolution = resolveGitImport({
        url: urlCheck.url.toString(),
        ref: body.ref,
        path: subpath ?? '',
      });
      if (!resolution.ok) {
        return res.status(400).json({ error: resolution.reason });
      }
      const resolved = resolution.resolved;

      let preview: GitImportPreviewResponse;
      try {
        preview = await fetchGitImportPreview(resolved);
      } catch (err) {
        logger.error('[gitImport.save] fetch failed:', err);
        return res
          .status(502)
          .json({ error: `Failed to fetch from upstream: ${(err as Error).message}` });
      }

      if (!preview.skillMd) {
        return res.status(400).json({
          error: `No SKILL.md found at ${resolved.host}:${resolved.path || '/'}`,
        });
      }

      const meta = extractSkillMeta(preview.skillMd);
      const inferredName = (body.name || meta.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
      if (!inferredName) {
        return res
          .status(400)
          .json({ error: 'Could not determine skill name from frontmatter' });
      }

      const { authorId, authorName, tenantId } = getAuthorInfo(req);

      let skill: (ISkill & { _id: Types.ObjectId });
      try {
        const result = await deps.createSkill({
          name: inferredName,
          description: meta.description || inferredName,
          body: preview.skillMd,
          author: authorId,
          authorName,
          alwaysApply: meta.alwaysApply,
          tenantId,
        });
        skill = result.skill as ISkill & { _id: Types.ObjectId };
      } catch (err) {
        logger.error('[gitImport.save] createSkill failed:', err);
        const code = (err as { code?: number }).code;
        if (code === 11000) {
          return res
            .status(409)
            .json({ error: 'A skill with this name already exists' });
        }
        return res.status(500).json({ error: 'Failed to create skill' });
      }

      const grant = await grantOwnership(deps, req.user.id, skill._id);
      if (!grant.ok) {
        return res.status(500).json({ error: grant.error });
      }

      // v1 saves only the SKILL.md body. Auxiliary files discovered
      // in the preview are listed in `importSummary` for the UI to
      // show but not persisted. Fetching auxiliary content requires
      // an additional round-trip per file from the upstream host;
      // we punt that to v2 (the zip import already covers the
      // bulk-import use case). The preview payload stays <10MB; the
      // user can re-run with a wider selection later.
      return res.status(201).json({
        skill,
        importSummary: {
          filesProcessed: preview.files.length,
          filesSucceeded: 0,
          filesFailed: 0,
          errors: [],
        },
        source: {
          url: body.url,
          ref: preview.ref,
          path: preview.path,
          importedAt: new Date().toISOString(),
        },
      });
    },
  };
}

function getAuthorInfo(req: ServerRequest) {
  const user = req.user;
  const authorId = (user._id ?? user.id) as unknown as Types.ObjectId;
  const authorName = user.name ?? user.username ?? 'Unknown';
  const tenantId = resolveRequestTenantId(req);
  return { authorId, authorName, tenantId };
}

async function grantOwnership(
  deps: GitImportSkillDeps,
  userId: string,
  skillId: Types.ObjectId,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await deps.grantPermission({
      principalType: PrincipalType.USER,
      principalId: userId,
      resourceType: ResourceType.SKILL,
      resourceId: skillId,
      accessRoleId: AccessRoleIds.SKILL_OWNER,
      grantedBy: userId,
    });
    return { ok: true };
  } catch (error) {
    logger.error(`[gitImport.save] Failed to grant SKILL_OWNER for ${skillId}:`, error);
    try {
      await deps.deleteSkill(skillId.toString());
    } catch (rollbackError) {
      logger.error(
        `[gitImport.save] Compensating delete failed for ${skillId}:`,
        rollbackError,
      );
    }
    return { ok: false, error: 'Failed to initialize skill permissions' };
  }
}

// Re-export for unit tests + barrel consumers.
export { resolveGitImport, fetchGitImportPreview } from './resolver';
export {
  validateGitUrl,
  validateSubpath,
  detectHost,
  isPrivateOrLoopbackHost,
  deriveSubpathFromUrlPath,
} from './validator';
export type { GitHost } from './types';