import fs from 'fs';
import path from 'path';
import { logger } from '@librechat/data-schemas';
import type { WorkspaceConfig } from './config';

/**
 * Valida o workspaceSubdir fornecido pelo admin:
 * - Sem componentes '..' ou '.'
 * - Sem caracteres especiais perigosos
 * - Dentro do comprimento máximo
 */
export function validateWorkspaceSubdir(subdir: string): { valid: boolean; error?: string } {
  if (!subdir) {
    return { valid: false, error: 'Workspace subdirectory cannot be empty' };
  }
  if (subdir.length > 512) {
    return { valid: false, error: 'Workspace subdirectory exceeds 512 characters' };
  }

  const parts = subdir.split('/');
  if (subdir.includes('..') || parts.includes('.') || parts.includes('..')) {
    return { valid: false, error: 'Path traversal or relative components are not allowed' };
  }

  // Safe characters regex: alphanumeric, dash, underscore, forward slash (for nested directories)
  const safeRegex = /^[a-zA-Z0-9_\-\/]+$/;
  if (!safeRegex.test(subdir)) {
    return {
      valid: false,
      error: 'Subdirectory contains invalid characters. Only alphanumeric, -, _, and / are allowed',
    };
  }

  if (subdir.startsWith('/') || subdir.endsWith('/')) {
    return { valid: false, error: 'Subdirectory cannot start or end with a slash' };
  }

  return { valid: true };
}

/**
 * Path traversal check: resolve(path).startsWith(resolve(basePath))
 */
export function isPathSafe(absolutePath: string, basePath: string): boolean {
  const resolvedPath = path.resolve(absolutePath);
  const resolvedBase = path.resolve(basePath);

  const normalizedPath = resolvedPath.endsWith(path.sep) ? resolvedPath : resolvedPath + path.sep;
  const normalizedBase = resolvedBase.endsWith(path.sep) ? resolvedBase : resolvedBase + path.sep;

  return normalizedPath.startsWith(normalizedBase);
}

/**
 * Resolve o path absoluto do workspace a partir do subdiretório definido pelo admin.
 * Retorna null apenas se workspaces estiver desabilitado. Quando o admin não define
 * um subdir, retorna o containerBasePath (root compartilhado) como workspace padrão.
 */
export function resolveWorkspacePath(
  subdir: string | null | undefined,
  config: WorkspaceConfig,
): string | null {
  if (!config.enabled) {
    return null;
  }

  if (!subdir) {
    return path.resolve(config.containerBasePath);
  }

  const { valid } = validateWorkspaceSubdir(subdir);
  if (!valid) {
    return null;
  }

  const resolved = path.resolve(config.containerBasePath, subdir);
  if (!isPathSafe(resolved, config.containerBasePath)) {
    return null;
  }

  return resolved;
}

/**
 * Cria o diretório do workspace (mkdir -p).
 * Valida path traversal antes de criar.
 */
export async function ensureWorkspaceDir(absolutePath: string, basePath: string): Promise<void> {
  if (!isPathSafe(absolutePath, basePath)) {
    throw new Error(`Unsafe workspace path attempt: ${absolutePath}`);
  }

  try {
    await fs.promises.mkdir(absolutePath, { recursive: true });
    logger.info(`[Workspace Service] Created workspace directory: ${absolutePath}`);
  } catch (error) {
    logger.error(`[Workspace Service] Failed to create workspace directory ${absolutePath}:`, error);
    throw error;
  }
}
