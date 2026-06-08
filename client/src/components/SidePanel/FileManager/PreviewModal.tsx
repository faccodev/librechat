import { useCallback, useState, useContext } from 'react';
import {
  Download,
  Edit3,
  FileQuestion,
  Loader2,
  Trash2,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';
import type { WorkspaceNode } from 'librechat-data-provider';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Spinner,
  useToastContext,
  ThemeContext,
  isDark,
} from '@librechat/client';
import MonacoEditor from '@monaco-editor/react';
import Markdown from '~/components/Chat/Messages/Content/Markdown';
import { useLocalize } from '~/hooks';
import {
  MAX_PREVIEW_TEXT_BYTES,
  previewKindFromNode,
  truncatePreviewText,
  useWorkspacePreview,
} from '~/data-provider';
import { cn } from '~/utils';
import { formatBytes, formatRelative } from './utils/format';
import { downloadWorkspaceFile } from './utils/download';

export type PreviewModalProps = {
  node: WorkspaceNode | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional hooks for additional actions rendered in the footer. */
  onEdit?: (node: WorkspaceNode) => void;
  onDelete?: (node: WorkspaceNode) => void;
};

export function getLanguageFromFilename(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'js':
    case 'jsx':
    case 'mjs':
      return 'javascript';
    case 'ts':
    case 'tsx':
    case 'mts':
      return 'typescript';
    case 'py':
      return 'python';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    case 'json':
      return 'json';
    case 'yaml':
    case 'yml':
      return 'yaml';
    case 'md':
    case 'mdx':
      return 'markdown';
    case 'sh':
    case 'bash':
    case 'zsh':
      return 'shell';
    case 'sql':
      return 'sql';
    case 'c':
      return 'c';
    case 'cpp':
    case 'h':
    case 'hpp':
      return 'cpp';
    case 'cs':
      return 'csharp';
    case 'xml':
      return 'xml';
    default:
      return 'plaintext';
  }
}

/**
 * Opens a modal preview for any file. The header has controls to toggle
 * fullscreen mode and close the modal. Primary actions (Download, Edit,
 * Delete) live in the footer.
 */
const PreviewModal = ({ node, open, onOpenChange, onEdit, onDelete }: PreviewModalProps) => {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const kind = previewKindFromNode(node);
  const query = useWorkspacePreview(node?.path ?? null, kind);

  const handleDownload = useCallback(async () => {
    if (!node) return;
    try {
      await downloadWorkspaceFile(node.path, node.name);
    } catch (err) {
      console.error('[FileManager] download failed:', err);
      showToast({ message: localize('com_fm_download_failed'), status: 'error' });
    }
  }, [node, showToast, localize]);

  const canEdit = !!node && !['image', 'video', 'audio', 'pdf'].includes(kind);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          isFullscreen
            ? 'fixed inset-0 z-[999] flex h-screen w-screen max-w-none max-h-none flex-col gap-0 overflow-hidden p-0 rounded-none sm:rounded-none left-0 top-0 -translate-x-0 -translate-y-0 transform-none border-0'
            : 'flex max-h-[90vh] w-full max-w-4xl flex-col gap-0 overflow-hidden p-0 sm:rounded-lg'
        )}
      >
        {node && (
          <>
            <DialogHeader className="relative border-b border-border-light p-4 pr-24">
              <DialogTitle className="truncate text-base" title={node.name}>
                {node.name}
              </DialogTitle>
              <p className="truncate text-xs text-text-secondary">
                {formatBytes(node.size)}
                {node.mime ? ` · ${node.mime}` : ''}
                {' · '}
                {formatRelative(node.modifiedAt)}
              </p>
              <div className="absolute right-4 top-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="rounded p-1 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
                  title={isFullscreen ? localize('com_ui_minimize') : localize('com_ui_fullscreen')}
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="rounded p-1 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
                  title={localize('com_ui_close')}
                >
                  <X size={16} />
                </button>
              </div>
            </DialogHeader>
            <div className={cn(
              "flex-1 overflow-auto bg-gray-50 p-4 dark:bg-gray-950",
              isFullscreen ? "h-[calc(100vh-130px)]" : "min-h-[200px]"
            )}>
              <PreviewBody node={node} kind={kind} query={query} isFullscreen={isFullscreen} />
            </div>
            <DialogFooter className="justify-end gap-2 border-t border-border-light p-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                aria-label={localize('com_fm_action_download')}
              >
                <Download className="mr-1.5 size-3.5" aria-hidden="true" />
                {localize('com_fm_action_download')}
              </Button>
              {canEdit && onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(node)}
                  aria-label={localize('com_fm_action_edit')}
                >
                  <Edit3 className="mr-1.5 size-3.5" aria-hidden="true" />
                  {localize('com_fm_action_edit')}
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(node)}
                  aria-label={localize('com_fm_action_delete')}
                  className="text-red-600 hover:text-red-600"
                >
                  <Trash2 className="mr-1.5 size-3.5" aria-hidden="true" />
                  {localize('com_fm_action_delete')}
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;

type PreviewBodyProps = {
  node: WorkspaceNode;
  kind: ReturnType<typeof previewKindFromNode>;
  query: ReturnType<typeof useWorkspacePreview>;
  isFullscreen?: boolean;
};

export const PreviewBody = ({ node, kind, query, isFullscreen = false }: PreviewBodyProps) => {
  const localize = useLocalize();
  const { theme } = useContext(ThemeContext);
  const isDarkMode = isDark(theme);
  const { isLoading, isError, data, error, refetch } = query;

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[200px] items-center justify-center text-text-secondary">
        <Spinner className="mr-2" />
        <span className="text-sm">{localize('com_fm_preview_loading')}</span>
      </div>
    );
  }

  if (isError) {
    const status =
      (error as { response?: { status?: number } } | null)?.response?.status ?? null;
    const message =
      status === 404
        ? localize('com_fm_preview_not_found')
        : localize('com_fm_preview_error');
    return (
      <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 text-center text-sm text-text-secondary">
        <p>{message}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          aria-label={localize('com_ui_retry')}
        >
          {localize('com_ui_retry')}
        </Button>
      </div>
    );
  }

  if (kind === 'image' && data?.objectUrl) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <img
          src={data.objectUrl}
          alt={node.name}
          className="max-h-[70vh] max-w-full rounded object-contain"
        />
      </div>
    );
  }

  if (kind === 'video' && data?.objectUrl) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <video
          src={data.objectUrl}
          controls
          className="max-h-[70vh] max-w-full rounded"
        />
      </div>
    );
  }

  if (kind === 'audio' && data?.objectUrl) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-3">
        <p className="text-sm text-text-secondary">{node.name}</p>
        <audio src={data.objectUrl} controls className="w-full max-w-md" />
      </div>
    );
  }

  if (kind === 'html' && data?.objectUrl) {
    return (
      <iframe
        title={node.name}
        src={data.objectUrl}
        sandbox=""
        className={cn("w-full rounded border border-border-light bg-white dark:bg-gray-900", isFullscreen ? "h-[calc(100vh-160px)]" : "h-[70vh]")}
      />
    );
  }

  if (kind === 'pdf' && data?.objectUrl) {
    return (
      <iframe
        title={node.name}
        src={data.objectUrl}
        className={cn("w-full rounded border border-border-light bg-white", isFullscreen ? "h-[calc(100vh-160px)]" : "h-[70vh]")}
      />
    );
  }

  if (kind === 'markdown') {
    const text = data?.text ?? '';
    return (
      <div className={cn(
        "prose dark:prose-invert max-w-none p-4 bg-white dark:bg-gray-900 rounded border border-border-light dark:border-gray-700 overflow-auto",
        isFullscreen ? "h-[calc(100vh-160px)]" : "max-h-[70vh]"
      )}>
        <Markdown content={text} isLatestMessage={false} />
      </div>
    );
  }

  if (kind === 'text') {
    const text = data?.text ?? '';
    const { text: clipped, truncated } = truncatePreviewText(text);
    return (
      <div className="flex flex-col gap-2">
        <div className="rounded border border-border-light dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
          <MonacoEditor
            height={isFullscreen ? "calc(100vh - 175px)" : "60vh"}
            language={getLanguageFromFilename(node.name)}
            theme={isDarkMode ? 'vs-dark' : 'light'}
            value={clipped}
            options={{
              readOnly: true,
              minimap: { enabled: !isFullscreen ? false : true },
              scrollBeyondLastLine: false,
              fontSize: 12,
              lineNumbers: 'on',
              automaticLayout: true,
            }}
          />
        </div>
        {truncated && (
          <p className="text-xs text-text-secondary">
            {localize('com_fm_preview_truncated', {
              size: formatBytes(MAX_PREVIEW_TEXT_BYTES),
            })}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 text-center text-text-secondary">
      <FileQuestion className="size-10" aria-hidden="true" />
      <p className="text-sm font-medium text-text-primary">
        {localize('com_fm_preview_no_preview')}
      </p>
      <p className="max-w-xs text-xs">
        {node.mime ? `${node.mime} · ` : ''}
        {formatBytes(node.size)}
      </p>
      <Loader2 className="hidden" aria-hidden="true" />
    </div>
  );
};
