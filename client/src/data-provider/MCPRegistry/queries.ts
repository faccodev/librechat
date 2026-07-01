import { useQuery, useMutation } from '@tanstack/react-query';
import { QueryKeys, dataService } from 'librechat-data-provider';
import type { UseQueryOptions } from '@tanstack/react-query';
import type {
  RegistryListResponse,
  RegistryPreviewResponse,
  RegistryHealthResponse,
  RegistryPreviewRequest,
} from 'librechat-data-provider';

/**
 * GET /api/admin/mcp-external-catalog/servers?search=&cursor=&limit=
 *
 * List the Official MCP Registry catalog (normalized shape the UI
 * consumes). `enabled` defaults to `false` so the Browse Registry
 * tab does not hammer the upstream proxy when the panel first mounts
 * — the tab flips it to `true` when the user opens it.
 */
export function useSearchExternalCatalog(
  params: { search?: string; cursor?: string; limit?: number } = {},
  config?: UseQueryOptions<RegistryListResponse>,
) {
  return useQuery<RegistryListResponse>(
    [
      QueryKeys.mcpExternalCatalog,
      params.search ?? '',
      params.cursor ?? '',
      params.limit ?? 30,
    ],
    () =>
      dataService.listExternalCatalog({
        search: params.search,
        cursor: params.cursor,
        limit: params.limit,
      }),
    {
      refetchOnWindowFocus: false,
      ...config,
    },
  );
}

/**
 * GET /api/admin/mcp-external-catalog/servers/:name
 *
 * Fetch the raw registry entry for a single server. The card "Details"
 * drawer uses this to show fields the adapter does not consume
 * (icons, websiteUrl, package hints).
 */
export function useExternalCatalogServer(
  name: string | null | undefined,
  config?: UseQueryOptions<unknown>,
) {
  return useQuery<unknown>(
    [QueryKeys.mcpExternalCatalogServer, name ?? ''],
    () => dataService.getExternalCatalogServer(name as string),
    {
      refetchOnWindowFocus: false,
      enabled: typeof name === 'string' && name.length > 0,
      ...config,
    },
  );
}

/**
 * POST /api/admin/mcp-external-catalog/servers/:name/preview
 *
 * Convert a registry entry to an MCPOptions-shaped config. Does NOT
 * persist — the caller decides whether to push the preview to the
 * admin or user MCP creation endpoint.
 */
export function usePreviewExternalCatalogInstall() {
  return useMutation(
    (variables: { name: string; payload: RegistryPreviewRequest }) =>
      dataService.previewExternalCatalogInstall(variables.name, variables.payload),
  );
}

/**
 * GET /api/admin/mcp-external-catalog/health
 *
 * Diagnostic only — surfaces feature-flag state + cache stats. Used
 * by the operator-only "Status" indicator in the Browse Registry tab.
 */
export function useExternalCatalogHealth(
  config?: UseQueryOptions<RegistryHealthResponse>,
) {
  return useQuery<RegistryHealthResponse>(
    [QueryKeys.mcpExternalCatalogHealth],
    () => dataService.getExternalCatalogHealth(),
    {
      refetchOnWindowFocus: false,
      staleTime: 30 * 1000,
      ...config,
    },
  );
}