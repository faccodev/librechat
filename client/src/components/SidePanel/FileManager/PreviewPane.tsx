import { useCallback } from 'react';
import { Download, FileQuestion, Loader2, X } from 'lucide-react';
import type { WorkspaceNode } from 'librechat-data-provider';
import { Button, Spinner, useToastContext } from '@librechat/client';
import { useLocalize } from '~/hooks';
import {
  MAX_PREVIEW_TEXT_BYTES,
  previewKindFromNode,
  truncatePreviewText,
  useWorkspacePreview,
} from '~/data-provider';
import { formatBytes, formatRelative } from './utils/format';
import { downloadWorkspaceFile } from './utils/download';

type PreviewPaneProps = {
  node: WorkspaceNode | null;
  onClose: () => void;
};

const PreviewPane = ({ node, onClose }: PreviewPaneProps) => {
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

  if (!node) return null;

  return (
    <aside
      role="region"
      aria-label={localize('com_fm_preview_aria')}
      className="flex h-full min-w-0 flex-col bg-surface-primary"
    >
      <header className="flex items-center gap-2 border-b border-border-light px-3 py-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-text-primary" title={node.name}>
            {node.name}
          </p>
          <p className="truncate text-xs text-text-secondary">
            {formatBytes(node.size)}
            {node.mime ? ` · ${node.mime}` : ''}
            {' · '}
            {formatRelative(node.modifiedAt)}
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="size-7 shrink-0 bg-transparent"
          aria-label={localize('com_fm_action_download')}
          onClick={handleDownload}
        >
          <Download className="size-3.5" aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-7 shrink-0 bg-transparent"
          aria-label={localize('com_fm_preview_close')}
          onClick={onClose}
        >
          <X className="size-3.5" aria-hidden="true" />
        </Button>
      </header>

      <div className="flex-1 overflow-auto p-3">
        <PreviewBody node={node} kind={kind} query={query} />
      </div>
    </aside>
  );
};

export default PreviewPane;

type PreviewBodyProps = {
  node: WorkspaceNode;
  kind: ReturnType<typeof previewKindFromNode>;
  query: ReturnType<typeof useWorkspacePreview>;
};

const PreviewBody = ({ node, kind, query }: PreviewBodyProps) => {
  const localize = useLocalize();
  const { isLoading, isError, data, error, refetch } = query;

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[120px] items-center justify-center text-text-secondary">
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
      <div className="flex h-full min-h-[120px] flex-col items-center justify-center gap-2 text-center text-sm text-text-secondary">
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
      <div className="flex h-full items-center justify-center">
        <img
          src={data.objectUrl}
          alt={node.name}
          className="max-h-full max-w-full rounded object-contain"
        />
      </div>
    );
  }

  if (kind === 'video' && data?.objectUrl) {
    return (
      <div className="flex h-full items-center justify-center">
        <video src={data.objectUrl} controls className="max-h-full max-w-full rounded" />
      </div>
    );
  }

  if (kind === 'audio' && data?.objectUrl) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
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
        className="h-full w-full rounded border border-border-light bg-white"
      />
    );
  }

  if (kind === 'text') {
    const text = data?.text ?? '';
    const { text: clipped, truncated } = truncatePreviewText(text);
    return (
      <div className="flex h-full flex-col">
        <pre className="flex-1 overflow-auto rounded bg-surface-secondary p-3 font-mono text-xs text-text-primary">
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
    <div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-2 text-center text-text-secondary">
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
