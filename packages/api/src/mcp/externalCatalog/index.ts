/**
 * Barrel export for the external MCP catalog integration.
 *
 * Re-exports the public surface consumed by the Express admin route
 * (`api/server/routes/admin/mcpExternalCatalog.js`). Internal helpers
 * (like `toListItem`) are intentionally NOT re-exported.
 */

export {
  RegistryClient,
  RegistryClientError,
  getRegistryClient,
  __resetRegistryClient,
} from './client';

export {
  adaptRegistryServer,
  detectOAuth,
  pickRemote,
} from './adapter';

export type {
  AdapterMode,
  AdapterOptions,
  AdapterResult,
  AdapterSuccess,
  AdapterFailure,
} from './adapter';

export type {
  RegistryListItem,
  RegistryListResponse,
  RegistryListResponseNormalized,
  RegistryPackage,
  RegistryPreviewResponse,
  RegistryRemote,
  RegistryRemoteType,
  RegistryRepository,
  RegistryServer,
  RegistryServerMeta,
  RegistryErrorResponse,
} from './types';

export { TTLCache } from './cache';
export type { CacheStats } from './cache';