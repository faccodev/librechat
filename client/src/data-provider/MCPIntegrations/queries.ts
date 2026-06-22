import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, dataService } from 'librechat-data-provider';
import type { UseQueryOptions } from '@tanstack/react-query';
import type {
  MCPIntegrationDetail,
  MCPIntegrationListResponse,
  MCPIntegrationUpsertPayload,
} from 'librechat-data-provider';

/**
 * GET /api/admin/mcp-integrations
 *
 * Returns a redacted list — sensitive leaves (apiKey.key,
 * oauth.client_secret, literal env.* values) come back as
 * `••••••••` placeholders so the admin panel can render the list
 * without leaking plaintext credentials.
 */
export function useListMCPIntegrations(
  config?: UseQueryOptions<MCPIntegrationListResponse>,
) {
  return useQuery<MCPIntegrationListResponse>(
    [QueryKeys.mcpIntegrations],
    () => dataService.listMCPIntegrations(),
    {
      refetchOnWindowFocus: false,
      ...config,
    },
  );
}

/**
 * GET /api/admin/mcp-integrations/:name
 *
 * Returns the decrypted detail shape. Used by the edit dialog to
 * render the full config JSON before the admin tweaks it.
 */
export function useMCPIntegration(
  name: string | null | undefined,
  config?: UseQueryOptions<MCPIntegrationDetail>,
) {
  return useQuery<MCPIntegrationDetail>(
    [QueryKeys.mcpIntegration, name ?? ''],
    () => dataService.getMCPIntegration(name as string),
    {
      refetchOnWindowFocus: false,
      enabled: typeof name === 'string' && name.length > 0,
      ...config,
    },
  );
}

/**
 * PUT /api/admin/mcp-integrations/:name
 *
 * Creates or updates. Invalidates the list cache on success so the
 * list view reflects the new state.
 */
export function useUpsertMCPIntegration() {
  const queryClient = useQueryClient();
  return useMutation(
    (variables: { name: string; payload: MCPIntegrationUpsertPayload }) =>
      dataService.upsertMCPIntegration(variables),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([QueryKeys.mcpIntegrations]);
        queryClient.invalidateQueries([QueryKeys.mcpIntegration, data.name]);
      },
    },
  );
}

/**
 * DELETE /api/admin/mcp-integrations/:name
 */
export function useRemoveMCPIntegration() {
  const queryClient = useQueryClient();
  return useMutation(
    (name: string) => dataService.removeMCPIntegration(name),
    {
      onSuccess: (_data, name) => {
        queryClient.invalidateQueries([QueryKeys.mcpIntegrations]);
        queryClient.removeQueries([QueryKeys.mcpIntegration, name]);
      },
    },
  );
}
