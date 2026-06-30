const { logger } = require('@librechat/data-schemas');

/**
 * MCP server names that we want to augment with workspaceSubdir
 * documentation. Anything in this list gets a `[Workspace context]`
 * suffix on every tool description so the agent knows how to address
 * paths correctly.
 *
 * The set is small and explicit on purpose: if you add a server here
 * you are also committing to documenting the workspaceSubdir semantics
 * in the description augmentation. See `WORKSPACE_HINT` below.
 */
const WORKSPACE_AWARE_MCP_SERVERS = new Set(['workspace', 'ws_', 'transcribe']);

/**
 * The hint appended to workspace-aware tool descriptions. Three
 * pieces, in order of usefulness to the LLM:
 *  1. the resolved workspace root the MCP is currently sandboxed to,
 *     so the agent can mirror it when reasoning about relative paths;
 *  2. an explicit reminder that spaces, accented characters, and
 *     Unicode in path segments are passed verbatim — the previous
 *     documentation left this implicit and the agent kept escaping or
 *     substituting characters;
 *  3. a pointer to the absolute path on disk, useful when the agent
 *     needs to construct `command_args` or download URLs that the
 *     MCP itself won't accept.
 */
function buildWorkspaceHint({ workspaceSubdir, workspacePath, serverName }) {
  const root = workspacePath || `/workspaces/${workspaceSubdir || ''}`;
  const lines = [
    `[Workspace context] This tool operates inside the user's sandboxed workspace.`,
    `Sandbox root: ${root}`,
    `workspaceSubdir: ${JSON.stringify(workspaceSubdir ?? null)}`,
    serverName ? `MCP server: ${serverName}` : null,
    `Paths: pass them VERBATIM. Spaces, accented characters (á, ã, ç), ` +
      `CJK (文档, 日本語), and emoji (📁) are all valid path segments and must NOT ` +
      `be url-encoded, escaped, or substituted. The MCP server accepts them as-is.`,
    `Relative paths are relative to the sandbox root above. Absolute paths and ` +
      `\`..\` traversal are rejected by the sandbox.`,
  ].filter(Boolean);
  return lines.join('\n');
}

/**
 * Returns true if a tool belongs to an MCP server whose descriptions
 * we want to augment with workspaceSubdir context.
 *
 * The match is by prefix: `ws_<userId>` (the per-user workspace
 * auto-spawned by LibreChat) matches `ws_`; everything else is an
 * exact server name comparison.
 */
function isWorkspaceAwareServer(serverName) {
  if (!serverName) {
    return false;
  }
  if (WORKSPACE_AWARE_MCP_SERVERS.has(serverName)) {
    return true;
  }
  for (const prefix of WORKSPACE_AWARE_MCP_SERVERS) {
    if (prefix.endsWith('_') && serverName.startsWith(prefix)) {
      return true;
    }
  }
  return false;
}

/**
 * Patch a tool definition's description in place to add the
 * workspaceSubdir hint. Returns the same object so callers can chain.
 *
 * Tools that have no description are left alone. Tools whose
 * description already contains the marker `[Workspace context]` are
 * skipped so we don't keep appending on every call.
 */
function patchToolDescription(tool, ctx) {
  if (!tool || typeof tool.description !== 'string') {
    return tool;
  }
  if (tool.description.includes('[Workspace context]')) {
    return tool;
  }
  const hint = buildWorkspaceHint({
    workspaceSubdir: ctx?.user?.workspaceSubdir ?? null,
    workspacePath: ctx?.workspacePath ?? null,
    serverName: ctx?.serverName ?? null,
  });
  tool.description = `${tool.description}\n\n${hint}`;
  return tool;
}

/**
 * Walk a tool-definition map (the shape produced by
 * `loadToolDefinitionsWrapper` — `{ [toolName]: { description, schema, ... } }`)
 * and patch every tool whose MCP server name matches
 * `WORKSPACE_AWARE_MCP_SERVERS`. The map is mutated in place and
 * also returned for convenience.
 *
 * The `serverNameFor` callback lets callers group tools by their
 * owning MCP server when the map is flat (no built-in server tag).
 * If omitted, all tools get the hint.
 */
function patchToolDefinitions(toolMap, ctx, serverNameFor) {
  if (!toolMap || typeof toolMap !== 'object') {
    return toolMap;
  }
  for (const [name, tool] of Object.entries(toolMap)) {
    if (!tool) continue;
    const serverName = serverNameFor ? serverNameFor(name, tool) : ctx?.serverName;
    if (serverName && !isWorkspaceAwareServer(serverName)) {
      continue;
    }
    try {
      patchToolDescription(tool, { ...ctx, serverName });
    } catch (err) {
      logger.warn('[workspaceAwareTools] failed to patch tool', name, err?.message ?? err);
    }
  }
  return toolMap;
}

module.exports = {
  WORKSPACE_AWARE_MCP_SERVERS,
  isWorkspaceAwareServer,
  buildWorkspaceHint,
  patchToolDescription,
  patchToolDefinitions,
};
