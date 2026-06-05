import { logger } from '@librechat/data-schemas';
import { MCPManager } from '~/mcp/MCPManager';
import type { ParsedServerConfig } from '~/mcp/types';

/**
 * Retorna o nome único do MCP server do workspace de um usuário.
 */
export function getWorkspaceServerName(userId: string): string {
  return `ws_${userId}`;
}

/**
 * Ativa o MCP server do workspace para o usuário informado.
 */
export async function activateWorkspaceMCP(
  userId: string,
  absolutePath: string,
  mcpManager: MCPManager,
): Promise<void> {
  const serverName = getWorkspaceServerName(userId);

  try {
    const userConnections = mcpManager.getUserConnections(userId);
    const existingConnection = userConnections?.get(serverName);
    if (existingConnection && (await existingConnection.isConnected())) {
      logger.debug(`[Workspace MCP][User: ${userId}] Connection already active. Reusing.`);
      return;
    }
  } catch (error) {
    logger.debug(`[Workspace MCP][User: ${userId}] Error checking existing connection:`, error);
  }

  const serverConfig: ParsedServerConfig = {
    type: 'stdio' as const,
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', absolutePath],
  };

  logger.info(`[Workspace MCP][User: ${userId}] Activating workspace at ${absolutePath}`);

  await mcpManager.getUserConnection({
    user: { id: userId } as any,
    serverName,
    serverConfig,
  });

  logger.info(`[Workspace MCP][User: ${userId}] Workspace MCP successfully activated`);
}

/**
 * Desativa o MCP server do workspace para o usuário informado.
 */
export async function deactivateWorkspaceMCP(
  userId: string,
  mcpManager: MCPManager,
): Promise<void> {
  const serverName = getWorkspaceServerName(userId);
  try {
    logger.info(`[Workspace MCP][User: ${userId}] Deactivating workspace MCP connection`);
    await mcpManager.disconnectUserConnection(userId, serverName);
  } catch (error) {
    logger.warn(`[Workspace MCP][User: ${userId}] Failed to deactivate workspace MCP:`, error);
  }
}
