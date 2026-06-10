import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { matchSorter } from 'match-sorter';
import {
  Ellipsis,
  FilePlus2,
  FolderPlus,
  RefreshCw,
  Search,
  Upload,
  X,
} from 'lucide-react';
import type { WorkspaceNode, TFile } from 'librechat-data-provider';
import {
  megabyte,
  mergeFileConfig,
  checkOpenAIStorage,
  isAssistantsEndpoint,
  getEndpointFileConfig,
  fileConfig as defaultFileConfig,
} from 'librechat-data-provider';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  FilterInput,
  Spinner,
  useToastContext,
} from '@librechat/client';
import { useLocalize, useUpdateFiles } from '~/hooks';
import { useChatContext } from '~/Providers';
import { useFileManagerPath } from './hooks/useFileManagerPath';
import { mainTextareaId } from '~/common';
import { insertTextAtCursor } from '~/utils/textarea';
import {
  useCreateWorkspaceDirectory,
  useCreateWorkspaceFile,
  useDeleteWorkspaceNodes,
  useMoveWorkspaceNode,
  useRenameWorkspaceNode,
  useUploadWorkspaceFile,
} from '~/data-provider/Files/workspaceMutations';
import { useWorkspaceTree, useGetFileConfig, useGetFiles } from '~/data-provider';
import Breadcrumb from './Breadcrumb';
import NodeList from './NodeList';
import PreviewModal from './PreviewModal';
import EditorModal from './EditorModal';
import SearchResultsView from './SearchResultsView';
import NewNameDialog from './dialogs/NewNameDialog';
import DeleteConfirmDialog from './dialogs/DeleteConfirmDialog';
import MoveDialog from './dialogs/MoveDialog';
import BulkActionBar from './BulkActionBar';

type DialogState =
  | { kind: 'none' }
  | { kind: 'newFile' }
  | { kind: 'newFolder' }
  | { kind: 'rename'; node: WorkspaceNode }
  | { kind: 'delete'; nodes: WorkspaceNode[] }
  | { kind: 'preview'; node: WorkspaceNode }
  | { kind: 'edit'; node: WorkspaceNode }
  | { kind: 'move'; node: WorkspaceNode }
  | { kind: 'move-bulk'; nodes: WorkspaceNode[] };

/** Min chars before we switch from local filter to the recursive search. */
const SEARCH_MIN_CHARS = 3;

const FileManagerPanel = () => {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { path, setPath } = useFileManagerPath();
  const [filter, setFilter] = useState('');
  const [dialog, setDialog] = useState<DialogState>({ kind: 'none' });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const tree = useWorkspaceTree(path);
  const { data, isLoading, isError, isFetching, refetch } = tree;

  const { files, setFiles, conversation } = useChatContext();
  const { addFile } = useUpdateFiles(setFiles);
  const { data: fileConfig = null } = useGetFileConfig({
    select: (data) => mergeFileConfig(data),
  });
  const { data: dbFiles = [] } = useGetFiles<TFile[]>();

  const [, setSelected] = useState<WorkspaceNode | null>(null);

  const allNodes = data?.nodes ?? [];
  const truncated = data?.truncated ?? false;
  const workspacePath = data?.workspacePath;

  const trimmedFilter = filter.trim();
  const searchMode = trimmedFilter.length >= SEARCH_MIN_CHARS;

  /** Local fast-filter applied to the current directory only. */
  const visibleNodes = useMemo(() => {
    if (!trimmedFilter) return allNodes;
    return matchSorter(allNodes, trimmedFilter, { keys: ['name'] });
  }, [allNodes, trimmedFilter]);

  /** Bulk-select state. Lives in this component (not Recoil) because it's
   * scoped to the FileManager and clears on every mount, which is what
   * the user wants when navigating between folders. */
  const [selectMode, setSelectMode] = useState(false);
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
  /** Clear selection whenever the user navigates to a different folder. */
  useEffect(() => {
    setSelectedPaths(new Set());
  }, [path]);
  /** Leaving select mode also clears the selection. */
  const exitSelectMode = useCallback(() => {
    setSelectMode(false);
    setSelectedPaths(new Set());
  }, []);
  const handleToggleSelect = useCallback((nodePath: string) => {
    setSelectedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(nodePath)) {
        next.delete(nodePath);
      } else {
        next.add(nodePath);
      }
      return next;
    });
  }, []);
  const handleToggleSelectAll = useCallback(() => {
    setSelectedPaths((prev) => {
      if (prev.size === visibleNodes.length && visibleNodes.length > 0) {
        return new Set();
      }
      return new Set(visibleNodes.map((n) => n.path));
    });
  }, [visibleNodes]);
  /** Resolve selected WorkspaceNode objects from the path set, dropping
   * any that are no longer visible (e.g. after a filter change). */
  const selectedNodes = useMemo<WorkspaceNode[]>(
    () => visibleNodes.filter((n) => selectedPaths.has(n.path)),
    [visibleNodes, selectedPaths],
  );
  const handleEnterSelectMode = useCallback((node: WorkspaceNode) => {
    setSelectMode(true);
    setSelectedPaths(new Set([node.path]));
  }, []);

  const handleBulkDelete = useCallback(() => {
    if (selectedNodes.length === 0) return;
    setDialog({ kind: 'delete', nodes: selectedNodes });
  }, [selectedNodes]);
  const handleBulkMove = useCallback(() => {
    if (selectedNodes.length === 0) return;
    setDialog({ kind: 'move-bulk', nodes: selectedNodes });
  }, [selectedNodes]);

  const createDirectory = useCreateWorkspaceDirectory({
    onSuccess: (node) => {
      showToast({ message: localize('com_fm_action_folder_created'), status: 'success' });
      setDialog({ kind: 'none' });
      setPath(node.path);
    },
    onError: (err) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        localize('com_fm_action_folder_create_failed');
      showToast({ message, status: 'error' });
    },
  });

  const createFile = useCreateWorkspaceFile({
    onSuccess: (node) => {
      showToast({ message: localize('com_fm_action_file_created'), status: 'success' });
      setDialog({ kind: 'none' });
      setTimeout(() => setDialog({ kind: 'edit', node }), 0);
    },
    onError: (err) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        localize('com_fm_action_file_create_failed');
      showToast({ message, status: 'error' });
    },
  });

  const renameNode = useRenameWorkspaceNode({
    onSuccess: () => {
      showToast({ message: localize('com_fm_action_renamed'), status: 'success' });
      setDialog({ kind: 'none' });
    },
    onError: (err) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        localize('com_fm_action_rename_failed');
      showToast({ message, status: 'error' });
    },
  });

  const deleteNodes = useDeleteWorkspaceNodes({
    onSuccess: (result) => {
      if (result.failed.length > 0) {
        showToast({
          message: localize('com_fm_action_delete_partial', {
            deleted: result.deleted.length,
            failed: result.failed.length,
          }),
          status: 'warning',
        });
      } else {
        showToast({ message: localize('com_fm_action_deleted'), status: 'success' });
      }
      setDialog({ kind: 'none' });
    },
    onError: (err) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        localize('com_fm_action_delete_failed');
      showToast({ message, status: 'error' });
    },
  });

  const moveNode = useMoveWorkspaceNode({
    onSuccess: (node) => {
      showToast({ message: localize('com_fm_action_moved'), status: 'success' });
      setDialog({ kind: 'none' });
      /** After moving into a folder, navigate there so the user sees the
       * new location right away. The server echoes back the new path. */
      if (dialog.kind === 'move') {
        const parent = node.path.split('/').slice(0, -1).join('/');
        if (parent) {
          setPath(parent);
        }
      }
    },
    onError: (err) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        localize('com_fm_action_move_failed');
      showToast({ message, status: 'error' });
    },
  });

  const upload = useUploadWorkspaceFile({
    onSuccess: () => {
      showToast({ message: localize('com_fm_action_uploaded'), status: 'success' });
    },
    onError: (err) => {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        localize('com_fm_action_upload_failed');
      showToast({ message, status: 'error' });
    },
  });

  const handleEnterDir = useCallback(
    (node: WorkspaceNode) => {
      if (node.type !== 'dir') return;
      setSelected(null);
      setPath(node.path);
    },
    [setPath],
  );

  const handleSelect = useCallback(
    (node: WorkspaceNode) => {
      if (node.type === 'dir') {
        setPath(node.path);
        return;
      }
      setDialog({ kind: 'preview', node });
    },
    [setPath],
  );

  const handleView = useCallback((node: WorkspaceNode) => {
    setDialog({ kind: 'preview', node });
  }, []);

  const handleEdit = useCallback(
    (node: WorkspaceNode) => {
      if (node.type === 'dir') {
        setPath(node.path);
        return;
      }
      setDialog({ kind: 'edit', node });
    },
    [setPath],
  );

  const handleAttach = useCallback(
    (node: WorkspaceNode) => {
      if (node.type !== 'file') {
        return;
      }
      if (!conversation?.endpoint) {
        showToast({
          message: localize('com_ui_attach_error'),
          status: 'error',
        });
        return;
      }

      const file = dbFiles.find((f) => f.filename === node.path);
      if (!file) {
        showToast({
          message: localize('com_ui_attach_error'),
          status: 'error',
        });
        return;
      }

      const endpoint = conversation.endpoint;
      const endpointType = conversation.endpointType;
      const isOpenAIStorage = checkOpenAIStorage(file.source ?? '');
      const isAssistants = isAssistantsEndpoint(endpoint);

      if (isOpenAIStorage && !isAssistants) {
        showToast({
          message: localize('com_ui_attach_error_openai'),
          status: 'error',
        });
        return;
      }

      if (!isOpenAIStorage && isAssistants) {
        showToast({
          message: localize('com_ui_attach_warn_endpoint'),
          status: 'warning',
        });
      }

      const endpointFileConfig = getEndpointFileConfig({
        fileConfig,
        endpoint,
        endpointType,
      });

      if (endpointFileConfig.disabled === true) {
        showToast({
          message: localize('com_ui_attach_error_disabled'),
          status: 'error',
        });
        return;
      }

      if (endpointFileConfig.fileLimit && files.size >= endpointFileConfig.fileLimit) {
        showToast({
          message: `${localize('com_ui_attach_error_limit')} ${endpointFileConfig.fileLimit} files (${endpoint})`,
          status: 'error',
        });
        return;
      }

      if (file.bytes >= (endpointFileConfig.fileSizeLimit ?? Number.MAX_SAFE_INTEGER)) {
        showToast({
          message: `${localize('com_ui_attach_error_size')} ${
            (endpointFileConfig.fileSizeLimit ?? 0) / megabyte
          } MB (${endpoint})`,
          status: 'error',
        });
        return;
      }

      /* Mime type check is bypassed to allow attaching any file from the File Manager as requested */
      /*
      if (!defaultFileConfig.checkType(file.type, endpointFileConfig.supportedMimeTypes ?? [])) {
        showToast({
          message: `${localize('com_ui_attach_error_type')} ${file.type} (${endpoint})`,
          status: 'error',
        });
        return;
      }
      */

      if (endpointFileConfig.totalSizeLimit) {
        const existing = files.get(file.file_id);
        let currentTotalSize = 0;
        for (const f of files.values()) {
          currentTotalSize += f.size;
        }
        currentTotalSize -= existing?.size ?? 0;
        if (currentTotalSize + file.bytes > endpointFileConfig.totalSizeLimit) {
          showToast({
            message: `${localize('com_ui_attach_error_total_size')} ${
              endpointFileConfig.totalSizeLimit / megabyte
            } MB (${endpoint})`,
            status: 'error',
          });
          return;
        }
      }

      addFile({
        progress: 1,
        attached: true,
        file_id: file.file_id,
        filepath: file.filepath,
        preview: file.filepath,
        type: file.type,
        height: file.height,
        width: file.width,
        filename: file.filename,
        source: file.source,
        size: file.bytes,
        metadata: file.metadata,
      });
    },
    [addFile, files, dbFiles, conversation, localize, showToast, fileConfig],
  );

  /**
   * Insert the file/folder path as text into the main chat textarea (instead
   * of attaching the file as a binary upload). The path appears at the cursor
   * position, ready for the user to keep typing around it.
   */
  const handleCopyPath = useCallback(
    (node: WorkspaceNode) => {
      const textarea = document.getElementById(mainTextareaId) as HTMLTextAreaElement | null;
      if (!textarea) {
        showToast({
          message: localize('com_fm_copy_path_no_input'),
          status: 'error',
        });
        return;
      }
      /** Prefix with a leading space when the textarea is non-empty and the
       * last character isn't whitespace — keeps adjacent words separated. */
      const lastChar = textarea.value[textarea.value.length - 1] ?? '';
      const prefix = textarea.value.length > 0 && !/\s/.test(lastChar) ? ' ' : '';
      insertTextAtCursor(textarea, `${prefix}${node.path}`);
      showToast({
        message: localize('com_fm_copy_path_success', { name: node.name }),
        status: 'success',
      });
    },
    [localize, showToast],
  );

  const handleGoUp = useCallback(() => {
    if (!path) return;
    const segments = path.split('/').filter(Boolean);
    segments.pop();
    setPath(segments.join('/'));
  }, [path, setPath]);

  const handleClearFilter = useCallback(() => setFilter(''), []);

  const handleUpload = useCallback(
    async (files: FileList) => {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        await upload.mutateAsync({ parentPath: path, formData });
      }
    },
    [path, upload],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleUpload(e.target.files).finally(() => {
          if (fileInputRef.current) fileInputRef.current.value = '';
        });
      }
    },
    [handleUpload],
  );

  const handleDropFiles = useCallback(
    (files: FileList) => {
      void handleUpload(files);
    },
    [handleUpload],
  );

  /** Open a search result: dirs navigate, files navigate to parent + open preview. */
  const handleOpenSearchDir = useCallback(
    (target: string) => {
      setFilter('');
      setPath(target);
    },
    [setPath],
  );

  const handleOpenSearchFile = useCallback(
    (node: WorkspaceNode) => {
      setFilter('');
      const lastSlash = node.path.lastIndexOf('/');
      const parent = lastSlash > 0 ? node.path.slice(0, lastSlash) : '';
      setPath(parent);
      setDialog({ kind: 'preview', node });
    },
    [setPath],
  );

  return (
    <div
      role="region"
      aria-label={localize('com_sidepanel_file_manager')}
      className="flex h-full w-full flex-col"
    >
      <div className="flex flex-col gap-1.5 px-3 pt-2">
        {/* Search bar + actions menu */}
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <FilterInput
              inputId="fm-filter"
              label={localize('com_fm_filter_placeholder')}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              containerClassName="w-full"
            />
            {filter ? (
              <button
                type="button"
                onClick={handleClearFilter}
                aria-label={localize('com_ui_clear')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            ) : (
              <Search
                className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-text-secondary"
                aria-hidden="true"
              />
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-9 shrink-0 bg-transparent"
                aria-label={localize('com_fm_actions_menu_aria')}
                disabled={upload.isLoading}
              >
                {upload.isLoading ? (
                  <Spinner className="size-4" />
                ) : (
                  <Ellipsis className="size-4" aria-hidden="true" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              <DropdownMenuItem onSelect={() => setTimeout(() => setDialog({ kind: 'newFile' }), 0)}>
                <FilePlus2 className="mr-2 size-4" aria-hidden="true" />
                {localize('com_fm_action_new_file')}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTimeout(() => setDialog({ kind: 'newFolder' }), 0)}>
                <FolderPlus className="mr-2 size-4" aria-hidden="true" />
                {localize('com_fm_action_new_folder')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => fileInputRef.current?.click()}
                disabled={upload.isLoading}
              >
                <Upload className="mr-2 size-4" aria-hidden="true" />
                {localize('com_fm_action_upload')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => refetch()} disabled={isFetching}>
                <RefreshCw
                  className={isFetching ? 'mr-2 size-4 animate-spin' : 'mr-2 size-4'}
                  aria-hidden="true"
                />
                {localize('com_ui_refresh')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        <Breadcrumb path={path} onNavigate={setPath} />
      </div>

      {searchMode ? (
        <SearchResultsView
          query={trimmedFilter}
          onOpenDir={handleOpenSearchDir}
          onOpenFile={handleOpenSearchFile}
        />
      ) : (
        <NodeList
          isLoading={isLoading}
          isError={isError}
          isFetching={isFetching}
          path={path}
          nodes={visibleNodes}
          truncated={truncated}
          onEnterDir={handleEnterDir}
          onSelect={handleSelect}
          onGoUp={handleGoUp}
          onRetry={() => refetch()}
          onDropFiles={handleDropFiles}
          onView={handleView}
          onEdit={handleEdit}
          onRename={(node) => setDialog({ kind: 'rename', node })}
          onDelete={(node) => setDialog({ kind: 'delete', nodes: [node] })}
          onAttach={handleAttach}
          onCopyPath={handleCopyPath}
          onMove={(node) => setDialog({ kind: 'move', node })}
          onEnterSelectMode={handleEnterSelectMode}
          selectMode={selectMode}
          selectedPaths={selectedPaths}
          onToggleSelect={handleToggleSelect}
        />
      )}

      {workspacePath && !searchMode && !selectMode && (
        <p
          className="mx-3 mt-1 truncate border-t border-border-light pt-2 font-mono text-[10px] text-text-secondary"
          title={workspacePath}
        >
          {workspacePath}
        </p>
      )}

      {selectMode && (
        <BulkActionBar
          selectedCount={selectedNodes.length}
          totalCount={visibleNodes.length}
          onSelectAll={handleToggleSelectAll}
          onCancel={exitSelectMode}
          onMove={handleBulkMove}
          onDelete={handleBulkDelete}
        />
      )}

      <PreviewModal
        node={dialog.kind === 'preview' ? dialog.node : null}
        open={dialog.kind === 'preview'}
        onOpenChange={(open) => {
          if (!open) setDialog({ kind: 'none' });
        }}
        onEdit={(node) => {
          setDialog({ kind: 'none' });
          setTimeout(() => setDialog({ kind: 'edit', node }), 0);
        }}
        onDelete={(node) => {
          setDialog({ kind: 'none' });
          setTimeout(() => setDialog({ kind: 'delete', nodes: [node] }), 0);
        }}
        onCopyPath={handleCopyPath}
        onMove={(node) => {
          setDialog({ kind: 'none' });
          setTimeout(() => setDialog({ kind: 'move', node }), 0);
        }}
      />

      <EditorModal
        node={dialog.kind === 'edit' ? dialog.node : null}
        open={dialog.kind === 'edit'}
        onOpenChange={(open) => {
          if (!open) setDialog({ kind: 'none' });
        }}
      />

      <NewNameDialog
        open={dialog.kind === 'newFolder'}
        onOpenChange={(open) => {
          if (!open) setDialog({ kind: 'none' });
        }}
        mode="folder"
        onSubmit={(name) => createDirectory.mutate({ parentPath: path, name })}
        isSubmitting={createDirectory.isLoading}
      />

      <NewNameDialog
        open={dialog.kind === 'newFile'}
        onOpenChange={(open) => {
          if (!open) setDialog({ kind: 'none' });
        }}
        mode="file"
        onSubmit={(name) => createFile.mutate({ parentPath: path, name })}
        isSubmitting={createFile.isLoading}
      />

      <NewNameDialog
        open={dialog.kind === 'rename'}
        onOpenChange={(open) => {
          if (!open) setDialog({ kind: 'none' });
        }}
        mode="rename"
        initialValue={dialog.kind === 'rename' ? dialog.node.name : ''}
        onSubmit={(newName) => {
          if (dialog.kind !== 'rename') return;
          renameNode.mutate({ path: dialog.node.path, newName });
        }}
        isSubmitting={renameNode.isLoading}
      />

      <DeleteConfirmDialog
        open={dialog.kind === 'delete'}
        onOpenChange={(open) => {
          if (!open) setDialog({ kind: 'none' });
        }}
        nodes={dialog.kind === 'delete' ? dialog.nodes : []}
        onConfirm={() => {
          if (dialog.kind !== 'delete') return;
          deleteNodes.mutate({ paths: dialog.nodes.map((n) => n.path) });
        }}
        isSubmitting={deleteNodes.isLoading}
      />

      <MoveDialog
        open={dialog.kind === 'move' || dialog.kind === 'move-bulk'}
        onOpenChange={(open) => {
          if (!open) setDialog({ kind: 'none' });
        }}
        {...(dialog.kind === 'move' ? { node: dialog.node } : {})}
        {...(dialog.kind === 'move-bulk' ? { nodes: dialog.nodes } : {})}
        onSubmit={(toParent) => {
          if (dialog.kind === 'move') {
            moveNode.mutate({ from: dialog.node.path, toParent });
          } else if (dialog.kind === 'move-bulk') {
            /** Fire one move per selected node. The backend endpoint is
             * single-node; we loop client-side and show the usual
             * invalidation toast at the end. Per-item failures bubble
             * up through each mutate's onError (already wired). */
            dialog.nodes.forEach((n) => {
              moveNode.mutate({ from: n.path, toParent });
            });
            /** Exit select mode so the user is dropped back to the
             * regular tree once the moves are kicked off. */
            exitSelectMode();
          }
        }}
        isSubmitting={moveNode.isLoading}
      />
    </div>
  );
};

export default FileManagerPanel;
