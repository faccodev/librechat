import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys, dataService } from 'librechat-data-provider';
import type { QueryObserverResult, UseQueryOptions } from '@tanstack/react-query';
import type { WorkspaceListResult, WorkspaceSearchResult } from 'librechat-data-provider';
import store from '~/store';

/**
 * Lazy loader for one level of the user's workspace tree. The path
 * argument is the workspace-relative POSIX path ('' for the root).
 *
 * The query is *always* keyed by the path, so navigating to a folder
 * triggers a fetch while the previous level stays cached. Combine with
 * the `staleTime` default to keep recently-visited folders snappy.
 */
export const useWorkspaceTree = <TData = WorkspaceListResult>(
  path: string,
  config?: UseQueryOptions<WorkspaceListResult, unknown, TData>,
): QueryObserverResult<TData, unknown> => {
  const queriesEnabled = useRecoilValue<boolean>(store.queriesEnabled);
  return useQuery<WorkspaceListResult, unknown, TData>(
    [QueryKeys.workspaceTree, path],
    () => dataService.getWorkspaceTree(path),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: 30 * 1000,
      ...config,
      enabled: (config?.enabled ?? true) === true && queriesEnabled,
    },
  );
};

/**
 * Recursive workspace search. Disabled by default to avoid hitting the
 * server on every keystroke; components enable it once the user has
 * typed at least a few characters.
 */
export const useWorkspaceSearch = <TData = WorkspaceSearchResult>(
  query: string,
  config?: UseQueryOptions<WorkspaceSearchResult, unknown, TData>,
): QueryObserverResult<TData, unknown> => {
  const queriesEnabled = useRecoilValue<boolean>(store.queriesEnabled);
  const trimmed = query.trim();
  return useQuery<WorkspaceSearchResult, unknown, TData>(
    [QueryKeys.workspaceSearch, trimmed],
    () => dataService.getWorkspaceSearch(trimmed),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: 60 * 1000,
      ...config,
      enabled:
        (config?.enabled ?? true) === true && queriesEnabled && trimmed.length >= 3,
    },
  );
};
