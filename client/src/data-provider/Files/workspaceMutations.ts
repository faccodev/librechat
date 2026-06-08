import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService, QueryKeys, MutationKeys } from 'librechat-data-provider';
import type {
  WorkspaceCreateDirectoryBody,
  WorkspaceCreateFileBody,
  WorkspaceDeleteBody,
  WorkspaceMoveBody,
  WorkspaceRenameBody,
  WorkspaceWriteContentBody,
  WorkspaceNode,
  WorkspaceDeleteResult,
} from 'librechat-data-provider';

const invalidateWorkspace = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: [QueryKeys.workspaceTree] });
  queryClient.invalidateQueries({ queryKey: [QueryKeys.workspaceSearch] });
  queryClient.invalidateQueries({ queryKey: [QueryKeys.files] });
};

const useInvalidateWorkspace = () => {
  const queryClient = useQueryClient();
  return useCallback(() => invalidateWorkspace(queryClient), [queryClient]);
};

export const useCreateWorkspaceDirectory = (options?: {
  onSuccess?: (node: WorkspaceNode) => void;
  onError?: (error: unknown) => void;
}) => {
  const invalidate = useInvalidateWorkspace();
  return useMutation<WorkspaceNode, unknown, WorkspaceCreateDirectoryBody>({
    mutationKey: [MutationKeys.createWorkspaceDirectory],
    mutationFn: (body) => dataService.createWorkspaceDirectory(body),
    onSuccess: (node) => {
      invalidate();
      options?.onSuccess?.(node);
    },
    onError: (err) => options?.onError?.(err),
  });
};

export const useCreateWorkspaceFile = (options?: {
  onSuccess?: (node: WorkspaceNode) => void;
  onError?: (error: unknown) => void;
}) => {
  const invalidate = useInvalidateWorkspace();
  return useMutation<WorkspaceNode, unknown, WorkspaceCreateFileBody>({
    mutationKey: [MutationKeys.createWorkspaceFile],
    mutationFn: (body) => dataService.createWorkspaceFile(body),
    onSuccess: (node) => {
      invalidate();
      options?.onSuccess?.(node);
    },
    onError: (err) => options?.onError?.(err),
  });
};

export const useWriteWorkspaceContent = (options?: {
  onSuccess?: (node: WorkspaceNode) => void;
  onError?: (error: unknown) => void;
}) => {
  const invalidate = useInvalidateWorkspace();
  return useMutation<WorkspaceNode, unknown, WorkspaceWriteContentBody>({
    mutationKey: [MutationKeys.writeWorkspaceContent],
    mutationFn: (body) => dataService.writeWorkspaceContent(body),
    onSuccess: (node) => {
      invalidate();
      options?.onSuccess?.(node);
    },
    onError: (err) => options?.onError?.(err),
  });
};

export const useUploadWorkspaceFile = (options?: {
  onSuccess?: (node: WorkspaceNode) => void;
  onError?: (error: unknown) => void;
}) => {
  const invalidate = useInvalidateWorkspace();
  return useMutation<WorkspaceNode, unknown, { parentPath: string; formData: FormData }>({
    mutationKey: [MutationKeys.uploadWorkspaceFile],
    mutationFn: ({ parentPath, formData }) =>
      dataService.uploadWorkspaceFile(parentPath, formData),
    onSuccess: (node) => {
      invalidate();
      options?.onSuccess?.(node);
    },
    onError: (err) => options?.onError?.(err),
  });
};

export const useRenameWorkspaceNode = (options?: {
  onSuccess?: (node: WorkspaceNode) => void;
  onError?: (error: unknown) => void;
}) => {
  const invalidate = useInvalidateWorkspace();
  return useMutation<WorkspaceNode, unknown, WorkspaceRenameBody>({
    mutationKey: [MutationKeys.renameWorkspaceNode],
    mutationFn: (body) => dataService.renameWorkspaceNode(body),
    onSuccess: (node) => {
      invalidate();
      options?.onSuccess?.(node);
    },
    onError: (err) => options?.onError?.(err),
  });
};

export const useMoveWorkspaceNode = (options?: {
  onSuccess?: (node: WorkspaceNode) => void;
  onError?: (error: unknown) => void;
}) => {
  const invalidate = useInvalidateWorkspace();
  return useMutation<WorkspaceNode, unknown, WorkspaceMoveBody>({
    mutationKey: [MutationKeys.moveWorkspaceNode],
    mutationFn: (body) => dataService.moveWorkspaceNode(body),
    onSuccess: (node) => {
      invalidate();
      options?.onSuccess?.(node);
    },
    onError: (err) => options?.onError?.(err),
  });
};

export const useDeleteWorkspaceNodes = (options?: {
  onSuccess?: (result: WorkspaceDeleteResult) => void;
  onError?: (error: unknown) => void;
}) => {
  const invalidate = useInvalidateWorkspace();
  return useMutation<WorkspaceDeleteResult, unknown, WorkspaceDeleteBody>({
    mutationKey: [MutationKeys.deleteWorkspaceNodes],
    mutationFn: (body) => dataService.deleteWorkspaceNodes(body),
    onSuccess: (result) => {
      invalidate();
      options?.onSuccess?.(result);
    },
    onError: (err) => options?.onError?.(err),
  });
};
