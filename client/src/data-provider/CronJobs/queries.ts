import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { QueryKeys, dataService } from 'librechat-data-provider';
import type {
  CronJob,
  CronJobListResponse,
  CronJobSingleResponse,
  CreateCronJobPayload,
  UpdateCronJobPayload,
  CronJobTogglePayload,
} from 'librechat-data-provider';

/**
 * GET /api/cronjobs
 *
 * Admin-only — returns the full list (capped at 200 by the server).
 * The `nextRunAt` field is hydrated by the server from the in-memory
 * scheduler registry, so the panel can show "next fire" without an
 * extra round trip.
 */
export function useListCronJobs(config?: UseQueryOptions<CronJobListResponse>) {
  return useQuery<CronJobListResponse>(
    [QueryKeys.cronJobs],
    () => dataService.listCronJobs(),
    {
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000,
      ...config,
    },
  );
}

/**
 * GET /api/cronjobs/:id
 *
 * Disabled when `id` is empty. Refreshes the runs history so the
 * panel can show the last 50 executions.
 */
export function useCronJob(
  id: string | null | undefined,
  config?: UseQueryOptions<CronJobSingleResponse>,
) {
  return useQuery<CronJobSingleResponse>(
    [QueryKeys.cronJob, id ?? ''],
    () => dataService.getCronJob(id as string),
    {
      refetchOnWindowFocus: false,
      enabled: typeof id === 'string' && id.length > 0,
      ...config,
    },
  );
}

/**
 * POST /api/cronjobs
 *
 * Invalidates the list cache on success.
 */
export function useCreateCronJobMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: CreateCronJobPayload) => dataService.createCronJob(payload),
    {
      onSuccess: (data: CronJobSingleResponse) => {
        queryClient.invalidateQueries([QueryKeys.cronJobs]);
        queryClient.setQueryData<CronJobSingleResponse>(
          [QueryKeys.cronJob, data.job._id],
          data,
        );
      },
    },
  );
}

/**
 * PATCH /api/cronjobs/:id
 *
 * Updates list + item caches on success so the panel reflects the
 * change without a manual refetch.
 */
export function useUpdateCronJobMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    (variables: { id: string; payload: UpdateCronJobPayload }) =>
      dataService.updateCronJob(variables),
    {
      onSuccess: (data: CronJobSingleResponse, variables) => {
        queryClient.invalidateQueries([QueryKeys.cronJobs]);
        queryClient.setQueryData<CronJobSingleResponse>(
          [QueryKeys.cronJob, variables.id],
          data,
        );
      },
    },
  );
}

/**
 * POST /api/cronjobs/:id/toggle
 *
 * Optimistic update on the list cache — the panel flips the toggle
 * immediately, then we reconcile when the server responds. On
 * failure we roll back to the previous value.
 */
export function useToggleCronJobMutation() {
  const queryClient = useQueryClient();
  return useMutation(
    (variables: { id: string; payload: CronJobTogglePayload }) =>
      dataService.toggleCronJob(variables),
    {
      onMutate: async ({ id, payload }) => {
        await queryClient.cancelQueries([QueryKeys.cronJobs]);
        const previous = queryClient.getQueryData<CronJobListResponse>([QueryKeys.cronJobs]);
        if (previous) {
          queryClient.setQueryData<CronJobListResponse>([QueryKeys.cronJobs], {
            jobs: previous.jobs.map((job: CronJob) =>
              job._id === id ? { ...job, enabled: payload.enabled } : job,
            ),
          });
        }
        return { previous };
      },
      onError: (_err, _variables, context) => {
        if (context?.previous) {
          queryClient.setQueryData([QueryKeys.cronJobs], context.previous);
        }
      },
      onSettled: (data) => {
        queryClient.invalidateQueries([QueryKeys.cronJobs]);
        if (data?.job?._id) {
          queryClient.invalidateQueries([QueryKeys.cronJob, data.job._id]);
        }
      },
    },
  );
}

/**
 * DELETE /api/cronjobs/:id
 */
export function useDeleteCronJobMutation() {
  const queryClient = useQueryClient();
  return useMutation((id: string) => dataService.deleteCronJob(id), {
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries([QueryKeys.cronJobs]);
      queryClient.removeQueries([QueryKeys.cronJob, id]);
    },
  });
}

/**
 * POST /api/cronjobs/:id/run
 *
 * The server returns 202 immediately; the actual run is enqueued and
 * executed asynchronously. We invalidate the item so the panel can
 * pick up the new "running" run entry.
 */
export function useRunCronJobNowMutation() {
  const queryClient = useQueryClient();
  return useMutation((id: string) => dataService.runCronJobNow(id), {
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries([QueryKeys.cronJob, id]);
      queryClient.invalidateQueries([QueryKeys.cronJobs]);
    },
  });
}
