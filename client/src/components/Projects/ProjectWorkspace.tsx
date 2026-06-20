import { useCallback, useId, useMemo, useState } from 'react';
import * as Ariakit from '@ariakit/react';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, ArrowUpDown, Check, Folder, Plus, Pencil } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { QueryKeys } from 'librechat-data-provider';
import type { ConversationListResponse } from 'librechat-data-provider';
import { Spinner, DropdownPopup, Button, OGDialog, OGDialogTemplate, useToastContext } from '@librechat/client';
import type { MenuItemProps, RenderProp } from '~/common';
import { useConversationsInfiniteQuery, useProjectQuery, useUpdateProjectMutation } from '~/data-provider';
import { useLocalize, useNewConvo } from '~/hooks';
import { cn, clearMessagesCache } from '~/utils';
import ProjectChatList from './ProjectChatList';
import WorkspacePathPicker from './WorkspacePathPicker';
import store from '~/store';

type ChatSortField = 'updatedAt' | 'createdAt';

function renderSortMenuItem(label: string, isSelected: boolean): RenderProp {
  return function SortMenuItem({ className, ...props }) {
    return (
      <div {...props} className={cn(className, 'justify-between gap-5')}>
        <span className="truncate">{label}</span>
        {isSelected ? (
          <Check className="h-4 w-4 shrink-0 text-text-primary" aria-hidden="true" />
        ) : (
          <span className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
      </div>
    );
  };
}

export default function ProjectWorkspace() {
  const localize = useLocalize();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { projectId = '' } = useParams();
  const [sortBy, setSortBy] = useState<ChatSortField>('updatedAt');
  const sortMenuId = useId();
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const { data: project, isLoading: isProjectLoading } = useProjectQuery(projectId);
  const conversation = useRecoilValue(store.conversationByIndex(0));
  const { newConversation } = useNewConvo();
  const activeProjectId = project?._id;

  const [isEditingPath, setIsEditingPath] = useState(false);
  const [editPath, setEditPath] = useState<string | null>(null);
  const updateProject = useUpdateProjectMutation();
  const { showToast } = useToastContext();

  const handleOpenEditPath = () => {
    setEditPath(project?.workspacePath ?? null);
    setIsEditingPath(true);
  };

  const handleSavePath = async () => {
    if (!activeProjectId) {
      return;
    }
    try {
      await updateProject.mutateAsync({
        projectId: activeProjectId,
        workspacePath: editPath || null,
      });
      setIsEditingPath(false);
      showToast({
        message: localize('com_ui_project_updated'),
        status: 'success',
      });
    } catch {
      showToast({
        message: localize('com_ui_project_workspace_path_save_error'),
        status: 'error',
      });
    }
  };

  const sortOptions = useMemo(
    () => [
      { value: 'updatedAt' as const, label: localize('com_ui_sort_updated') },
      { value: 'createdAt' as const, label: localize('com_ui_sort_created') },
    ],
    [localize],
  );
  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ?? localize('com_ui_sort_updated');
  const sortMenuItems = useMemo<MenuItemProps[]>(
    () =>
      sortOptions.map((option) => {
        const isSelected = sortBy === option.value;
        return {
          id: `project-chat-sort-${option.value}`,
          ariaLabel: option.label,
          ariaChecked: isSelected,
          onClick: () => setSortBy(option.value),
          render: renderSortMenuItem(option.label, isSelected),
        };
      }),
    [sortBy, sortOptions],
  );

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isConversationsLoading,
  } = useConversationsInfiniteQuery(
    {
      projectId: activeProjectId,
      sortBy,
      sortDirection: 'desc',
    },
    {
      enabled: Boolean(activeProjectId),
      staleTime: 30000,
      cacheTime: 300000,
    },
  );

  const conversations = useMemo(
    () => data?.pages.flatMap((page) => page.conversations) ?? [],
    [data?.pages],
  );

  const hasNextPage = useMemo(() => {
    const pages = data?.pages;
    if (!pages?.length) {
      return false;
    }
    const lastPage: ConversationListResponse = pages[pages.length - 1];
    return lastPage.nextCursor !== null;
  }, [data?.pages]);

  const startProjectChat = useCallback(() => {
    if (!activeProjectId) {
      return;
    }
    clearMessagesCache(queryClient, conversation?.conversationId);
    queryClient.invalidateQueries([QueryKeys.messages]);
    newConversation({ template: { chatProjectId: activeProjectId } });
  }, [activeProjectId, conversation?.conversationId, newConversation, queryClient]);

  if (isProjectLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner className="text-text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-text-secondary">
        {localize('com_ui_project_not_found')}
      </div>
    );
  }

  return (
    <main className="flex h-full min-h-0 flex-col overflow-y-auto bg-surface-primary text-text-primary">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-10 pt-4 md:px-6 lg:pt-8">
        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="-ml-1.5 inline-flex w-fit items-center gap-1.5 rounded-lg px-2 py-1 text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {localize('com_ui_all_projects')}
        </button>

        <header className="mt-5 flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-surface-secondary text-text-secondary">
            <Folder className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <h1 className="truncate text-2xl font-semibold tracking-tight text-text-primary">
              {project.name}
            </h1>
            {project.description ? (
              <p className="mt-0.5 line-clamp-2 text-sm text-text-secondary">
                {project.description}
              </p>
            ) : null}
            {project.workspacePath ? (
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-surface-secondary px-2.5 py-1 text-xs font-medium text-text-primary border border-border-medium">
                  <Folder className="h-3.5 w-3.5 text-text-secondary" />
                  <span className="truncate max-w-[250px]" title={project.workspacePath}>
                    {project.workspacePath}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={handleOpenEditPath}
                  className="rounded p-1 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors"
                  title={localize('com_ui_project_workspace_path_add')}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleOpenEditPath}
                className="mt-2 inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                <Plus className="h-3 w-3" />
                {localize('com_ui_project_workspace_path_add')}
              </button>
            )}
          </div>
        </header>

        <button
          type="button"
          onClick={startProjectChat}
          className={cn(
            'mt-6 flex w-full items-center gap-3 rounded-[26px] border border-border-medium bg-surface-secondary px-3.5 py-3 text-left shadow-sm transition-colors',
            'hover:bg-surface-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary',
          )}
          aria-label={localize('com_ui_new_chat_in_project', { name: project.name })}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-tertiary text-text-primary">
            <Plus className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1 truncate text-text-secondary">
            {localize('com_ui_new_chat_in_project', { name: project.name })}
          </span>
        </button>

        <section className="mt-8 flex min-h-0 flex-1 flex-col">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h2 className="flex items-baseline gap-2 text-sm font-medium text-text-primary">
              {localize('com_ui_chats')}
              <span className="text-text-secondary">{project.conversationCount}</span>
            </h2>
            <DropdownPopup
              portal={true}
              focusLoop={true}
              unmountOnHide={true}
              menuId={sortMenuId}
              isOpen={isSortMenuOpen}
              setIsOpen={setIsSortMenuOpen}
              className="z-[125] min-w-44"
              trigger={
                <Ariakit.MenuButton
                  aria-label={localize('com_ui_sort_chats_by')}
                  className={cn(
                    'inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary',
                    isSortMenuOpen && 'bg-surface-hover text-text-primary',
                  )}
                >
                  <ArrowUpDown className="h-4 w-4" aria-hidden="true" />
                  {selectedSortLabel}
                </Ariakit.MenuButton>
              }
              items={sortMenuItems}
            />
          </div>
          <ProjectChatList
            conversations={conversations}
            isLoading={isConversationsLoading}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            sortBy={sortBy}
            emptyLabel={localize('com_ui_no_project_chats')}
            loadMore={() => fetchNextPage()}
          />
        </section>
      </div>
      <OGDialog open={isEditingPath} onOpenChange={setIsEditingPath}>
        <OGDialogTemplate
          title={localize('com_ui_project_workspace_path')}
          showCloseButton={true}
          className="w-11/12 max-w-lg bg-surface-primary text-text-primary"
          main={
            <div className="py-4">
              <WorkspacePathPicker
                value={editPath}
                onChange={setEditPath}
                disabled={updateProject.isLoading}
              />
            </div>
          }
          buttons={
            <div className="flex gap-2 justify-end w-full">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditingPath(false)}
                disabled={updateProject.isLoading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="submit"
                onClick={handleSavePath}
                disabled={updateProject.isLoading}
              >
                {updateProject.isLoading ? <Spinner className="size-4" /> : 'Save'}
              </Button>
            </div>
          }
        />
      </OGDialog>
    </main>
  );
}
