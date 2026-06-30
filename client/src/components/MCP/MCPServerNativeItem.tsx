import { MCPIcon } from '@librechat/client';
import MCPServerStatusIcon from './MCPServerStatusIcon';
import { getStatusColor, getStatusTextKey } from './mcpServerUtils';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import type { MCPServerDefinition } from '~/hooks/MCP/useMCPServerManager';
import type { MCPServerStatusIconProps } from './MCPServerStatusIcon';
import type { ConnectionStatusMap } from './mcpServerUtils';

/**
 * Read-only MCP server entry used for auto-injected ("native") servers.
 *
 * Unlike MCPServerMenuItem, this is not a checkbox — native servers are
 * always on (their tools are auto-injected by the api) and the user can
 * only see them, not toggle selection. The "Nativo" badge communicates
 * the "always available" semantics.
 */
interface MCPServerNativeItemProps {
  server: MCPServerDefinition;
  connectionStatus?: ConnectionStatusMap;
  isInitializing?: (serverName: string) => boolean;
  statusIconProps?: MCPServerStatusIconProps | null;
}

export default function MCPServerNativeItem({
  server,
  connectionStatus,
  isInitializing,
  statusIconProps,
}: MCPServerNativeItemProps) {
  const localize = useLocalize();
  const displayName = server.config?.title || server.serverName;
  const statusColor = getStatusColor(server.serverName, connectionStatus, isInitializing);
  const statusTextKey = getStatusTextKey(server.serverName, connectionStatus, isInitializing);
  const statusText = localize(statusTextKey as Parameters<typeof localize>[0]);
  const accessibleLabel = `${displayName}, ${localize('com_ui_mcp_native_badge') || 'Nativo'}, ${statusText}`;

  return (
    <div
      role="status"
      aria-label={accessibleLabel}
      className={cn(
        'flex w-full cursor-default items-center gap-3 rounded-lg px-2.5 py-2',
        'bg-surface-alt/50',
      )}
    >
      <div className="relative flex-shrink-0">
        {server.config?.iconPath ? (
          <img
            src={server.config.iconPath}
            className="h-8 w-8 rounded-lg object-cover opacity-90"
            alt=""
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-tertiary">
            <MCPIcon className="h-5 w-5 text-text-secondary" />
          </div>
        )}
        <div
          aria-hidden="true"
          className={cn(
            'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface-secondary',
            statusColor,
          )}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-medium text-text-primary">{displayName}</span>
          <span
            className={cn(
              'inline-flex items-center rounded-full border border-border-light',
              'bg-surface-tertiary px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
              'text-text-secondary',
            )}
            aria-hidden="true"
          >
            {localize('com_ui_mcp_native_badge') || 'Nativo'}
          </span>
        </div>
        {server.config?.description && (
          <p className="truncate text-xs text-text-secondary">{server.config.description}</p>
        )}
      </div>

      {statusIconProps && (
        <div className="flex-shrink-0">
          <MCPServerStatusIcon {...statusIconProps} />
        </div>
      )}
    </div>
  );
}
