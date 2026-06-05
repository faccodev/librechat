import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, dataService } from 'librechat-data-provider';
import type { UseMutationResult, UseQueryOptions, QueryObserverResult } from '@tanstack/react-query';
import type * as t from 'librechat-data-provider';

export function useUserWorkspace(
  userId: string,
  config?: UseQueryOptions<t.UserWorkspaceResponse>,
): QueryObserverResult<t.UserWorkspaceResponse> {
  return useQuery<t.UserWorkspaceResponse>(
    [QueryKeys.userWorkspace, userId],
    () => dataService.getUserWorkspace(userId),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      enabled: !!userId,
      ...config,
    },
  );
}

export function useSetUserWorkspace(
  userId: string,
  options?: {
    onSuccess?: (data: t.UserWorkspaceResponse, variables: string | null, context: unknown) => void;
    onError?: (error: unknown, variables: string | null, context: unknown) => void;
  },
): UseMutationResult<t.UserWorkspaceResponse, unknown, string | null, unknown> {
  const queryClient = useQueryClient();
  return useMutation<t.UserWorkspaceResponse, unknown, string | null, unknown>(
    (workspaceSubdir: string | null) => dataService.setUserWorkspace(userId, workspaceSubdir),
    {
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries([QueryKeys.userWorkspace, userId]);
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
      onError: (error, variables, context) => {
        if (options?.onError) {
          options.onError(error, variables, context);
        }
      },
    },
  );
}
