import type { TCustomConfig, TWorkspacesConfig } from 'librechat-data-provider';

export interface WorkspaceConfig {
  enabled: boolean;
  containerBasePath: string; // e.g. '/workspaces'
  sizeLimitMB: number;
}

/**
 * Lê a config de workspaces do appConfig (librechat.yaml)
 */
export function getWorkspaceConfig(appConfig: TCustomConfig): WorkspaceConfig {
  const ws = appConfig.workspaces as TWorkspacesConfig | undefined;
  return {
    enabled: ws?.enabled ?? false,
    containerBasePath: (ws?.containerBasePath ?? '/workspaces').replace(/\/$/, ''),
    sizeLimitMB: ws?.sizeLimitMB ?? 2048,
  };
}
