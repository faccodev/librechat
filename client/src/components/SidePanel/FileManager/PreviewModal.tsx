import { useCallback } from 'react';
import {
  Download,
  Edit3,
  FileQuestion,
  Loader2,
  Trash2,
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
} from '@librechat/client';
import { useLocalize } from '~/hooks';
import {
  MAX_PREVIEW_TEXT_BYTES,
  previewKindFromNode,
  truncatePreviewText,
  useWorkspacePreview,
} from '~/data-provider';
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

/**
 * Opens a modal preview for any file. The header is intentionally
 * minimal (title + meta + close X) so the close button has the
 * expected spot in the top-right; primary actions (Download, Edit,
 * Delete) live in the footer. The body delegates to `PreviewBody`,
 * which is also exported so the editor modal can reuse it.
 */
const PreviewModal = ({ node, open, onOpenChange, onEdit, onDelete }: PreviewModalProps) => {
  const localize = useLocalize();
  const { showToast } = useToastContext();
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

  const canEdit = !!node && kind === 'text';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] w-full max-w-4xl flex-col gap-0 overflow-hidden p-0 sm:rounded-lg"
      >
        {node && (
          <>
            <DialogHeader className="border-b border-border-light p-4">
              <DialogTitle className="truncate text-base" title={node.name}>
                {node.name}
              </DialogTitle>
              <p className="truncate text-xs text-text-secondary">
                {formatBytes(node.size)}
                {node.mime ? ` · ${node.mime}` : ''}
                {' · '}
                {formatRelative(node.modifiedAt)}
              </p>
            </DialogHeader>
            <div className="min-h-[200px] flex-1 overflow-auto bg-gray-50 p-4 dark:bg-gray-950">
              <PreviewBody node={node} kind={kind} query={query} />
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
};

export const PreviewBody = ({ node, kind, query }: PreviewBodyProps) => {
  const localize = useLocalize();
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
        className="h-[70vh] w-full rounded border border-border-light bg-white dark:bg-gray-900"
      />
    );
  }

  if (kind === 'text') {
    const text = data?.text ?? '';
    const { text: clipped, truncated } = truncatePreviewText(text);
    return (
      <div className="flex flex-col">
        <pre className="max-h-[70vh] overflow-auto rounded border border-border-light bg-white p-3 font-mono text-xs text-text-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
          {clipped}
        </pre>
        {truncated && (
          <p className="mt-2 text-xs text-text-secondary">
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
