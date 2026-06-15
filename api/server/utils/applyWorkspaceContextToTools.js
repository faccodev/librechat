const { logger } = require('@librechat/data-schemas');
const { patchToolDescription } = require('./workspaceAwareTools');

/**
 * Augment every tool definition that deals with filesystem paths with
 * a per-user `[Workspace context]` block. The block tells the agent
 * (a) what the resolved sandbox root is, (b) the user's
 * `workspaceSubdir` so it can build relative paths, and (c) that
 * spaces, accented characters, and Unicode in path segments are
 * passed verbatim — the previous behaviour forced the agent to
 * guess and it kept escaping or substituting characters that broke
 * the call.
 *
 * Idempotent: tools whose description already carries
 * `[Workspace context]` are left alone (`patchToolDescription`
 * detects the marker and returns the tool untouched).
 *
 * The function is best-effort: any failure to resolve the workspace
 * path or to patch an individual tool is logged at debug level and
 * swallowed so a single bad tool can't break the entire tool set.
 */
function applyWorkspaceContextToTools(toolDefinitions, req) {
  if (!Array.isArray(toolDefinitions) || toolDefinitions.length === 0) {
    return toolDefinitions;
  }
  if (!req || !req.user) {
    return toolDefinitions;
  }

  let workspacePath = null;
  try {
    const { getWorkspaceConfig, resolveWorkspacePath } = require('@librechat/api');
    const loadCustomConfig = require('~/server/services/Config/loadCustomConfig');
    const appConfig = req.config ?? loadCustomConfig() ?? {};
    const wsConfig = getWorkspaceConfig(appConfig);
    workspacePath = resolveWorkspacePath(req.user.workspaceSubdir, wsConfig);
  } catch (err) {
    logger.debug(
      '[applyWorkspaceContextToTools] Could not resolve workspace path:',
      err?.message ?? err,
    );
  }

  const ctx = { user: req.user, workspacePath };
  for (const def of toolDefinitions) {
    if (!def || typeof def.description !== 'string') {
      continue;
    }
    try {
      patchToolDescription(def, ctx);
    } catch (err) {
      logger.debug(
        '[applyWorkspaceContextToTools] patch failed for tool',
        def?.name,
        err?.message ?? err,
      );
    }
  }
  return toolDefinitions;
}

module.exports = applyWorkspaceContextToTools;
