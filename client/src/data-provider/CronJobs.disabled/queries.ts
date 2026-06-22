import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { QueryKeys, dataService } from 'librechat-data-provider';
import type {
  TCronJob,
  TCreateCronJobPayload,
  TListCronJobsResponse,
  TUpdateCronJobPayload,
} from 'librechat-data-provider';

/**
 * `useListCronJobsQuery` — list endpoint used by the panel. Phase 1
 * returns the full list (cap at 200 server-side); when this grows we'll
 * add cursor pagination mirroring `useSkillsInfiniteQuery`.
 */
export const useListCronJobsQuery = (params?: { enabled?: boolean }) => {
  return useQuery<TListCronJobsResponse>([QueryKeys.cronjobs, params?.enabled ?? false], () =>
    dataService.listCronJobs(params),
  );
};

export const useGetCronJobQuery = (id: string | null | undefined) => {
  return useQuery<{ job: TCronJob }>(
    [QueryKeys.cronjob, id],
    () => dataService.getCronJob(id as string),
    {
      enabled: !!id,
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );
};

export const useCreateCronJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (payload: TCreateCronJobPayload) => dataService.createCronJob(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.cronjobs]);
      },
    },
  );
};

export const useUpdateCronJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (variables: { id: string; payload: TUpdateCronJobPayload }) =>
      dataService.updateCronJob(variables),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries([QueryKeys.cronjobs]);
        queryClient.setQueryData([QueryKeys.cronjob, variables.id], data);
      },
    },
  );
};

export const useToggleCronJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (variables: { id: string; enabled: boolean }) => dataService.toggleCronJob(variables),
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries([QueryKeys.cronjobs]);
        queryClient.setQueryData([QueryKeys.cronjob, variables.id], data);
      },
    },
  );
};

export const useDeleteCronJobMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => dataService.deleteCronJob(id), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.cronjobs]);
    },
  });
};

export const useRunCronJobNowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => dataService.runCronJobNow(id), {
    onSuccess: (_data, id) => {
      // Refetch the job so the panel picks up the running entry.
      queryClient.invalidateQueries([QueryKeys.cronjob, id]);
      queryClient.invalidateQueries([QueryKeys.cronjobs]);
    },
  });
};
