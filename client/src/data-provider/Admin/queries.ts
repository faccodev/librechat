import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, dataService } from 'librechat-data-provider';
import type { UseMutationResult, UseQueryOptions } from '@tanstack/react-query';
import type * as t from 'librechat-data-provider';

const PAGE_SIZE = 20;

/** GET /api/admin/users — paginated list of all users */
export function useAdminUsers(
  params?: { limit?: number; offset?: number },
  config?: UseQueryOptions<t.AdminUsersListResponse>,
) {
  return useQuery<t.AdminUsersListResponse>(
    [QueryKeys.adminUsers, params?.offset ?? 0, params?.limit ?? PAGE_SIZE],
    () => dataService.listAdminUsers(params),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      ...config,
    },
  );
}

/** GET /api/admin/users/search?q= — search users by name/email */
export function useAdminUsersSearch(
  query: string,
  config?: UseQueryOptions<t.AdminUsersSearchResponse>,
) {
  return useQuery<t.AdminUsersSearchResponse>(
    [QueryKeys.adminUsers, 'search', query],
    () => dataService.searchAdminUsers(query, 20),
    {
      refetchOnWindowFocus: false,
      enabled: query.trim().length >= 2,
      ...config,
    },
  );
}

/** GET /api/admin/users/:id/workspace */
export { useUserWorkspace, useSetUserWorkspace } from '../Workspaces/queries';

/** Invalidate admin user list */
export function useInvalidateAdminUsers() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries([QueryKeys.adminUsers]);
}

/** POST /api/admin/users — create a new user */
export function useCreateAdminUser() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: {
      email: string;
      password?: string;
      name: string;
      username?: string;
      role?: string;
      workspaceSubdir?: string | null;
    }) => dataService.createAdminUser(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.adminUsers]);
      },
    },
  );
}

/** PUT /api/admin/users/:id/role — update user role */
export function useUpdateAdminUserRole(userId: string) {
  const queryClient = useQueryClient();
  return useMutation(
    (role: string) => dataService.updateAdminUserRole(userId, role),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.adminUsers]);
      },
    },
  );
}

