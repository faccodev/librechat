import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { workspaceRaw } from 'librechat-data-provider';
import { QueryKeys } from 'librechat-data-provider';
import axios from 'axios';

const MAX_TEXT_PREVIEW_BYTES = 256 * 1024;

export type WorkspacePreviewKind = 'image' | 'video' | 'audio' | 'html' | 'text' | 'binary';

const detectKind = (mime?: string, name?: string): WorkspacePreviewKind => {
  if (mime?.startsWith('image/')) return 'image';
  if (mime?.startsWith('video/')) return 'video';
  if (mime?.startsWith('audio/')) return 'audio';
  if (mime === 'text/html' || mime === 'application/xhtml+xml') return 'html';
  if (mime?.startsWith('text/')) return 'text';
  if (
    mime === 'application/json' ||
    mime === 'application/xml' ||
    mime === 'application/javascript' ||
    mime === 'application/typescript' ||
    mime === 'application/x-yaml'
  ) {
    return 'text';
  }
  if (!mime && name) {
    const dot = name.lastIndexOf('.');
    if (dot > -1) {
      const ext = name.slice(dot + 1).toLowerCase();
      if (
        [
          'json',
          'xml',
          'js',
          'mjs',
          'ts',
          'tsx',
          'jsx',
          'yaml',
          'yml',
          'toml',
          'md',
          'mdx',
          'txt',
          'log',
          'csv',
          'tsv',
          'html',
          'css',
          'scss',
          'sql',
          'sh',
        ].includes(ext)
      ) {
        return 'text';
      }
    }
  }
  return 'binary';
};

/**
 * Fetches a workspace file's body as either a Blob (for media previews)
 * or a string (for text previews). Reuses React Query's caching so a
 * second preview of the same path skips the network round-trip.
 *
 * Auth piggybacks on the global axios instance — the Authorization
 * Bearer header is attached automatically. We can't use `<img src>`
 * directly because the endpoint validates the JWT, not cookies.
 */
export const useWorkspacePreview = (path: string | null, kind: WorkspacePreviewKind) => {
  const enabled = !!path;
  const url = path ? workspaceRaw({ path }) : '';

  const query = useQuery({
    queryKey: [QueryKeys.workspacePreview, path, kind],
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<{ objectUrl?: string; text?: string; size?: number }> => {
      if (!path) return {};
      if (kind === 'text') {
        const { data } = await axios.get<string>(url, { responseType: 'text' });
        return { text: data, size: data.length };
      }
      const { data } = await axios.get<Blob>(url, { responseType: 'blob' });
      return { objectUrl: URL.createObjectURL(data), size: data.size };
    },
  });

  // Revoke the previous object URL when the result changes or the
  // component unmounts. Using a ref so the cleanup has access to the
  // most recent URL even when the effect re-runs.
  const lastUrl = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (query.data?.objectUrl) {
      lastUrl.current = query.data.objectUrl;
    }
  }, [query.data?.objectUrl]);
  useEffect(() => {
    return () => {
      if (lastUrl.current) URL.revokeObjectURL(lastUrl.current);
    };
  }, []);

  return query;
};

/** Trim text previews to a sane cap; UI shows a "truncated" notice. */
export const truncatePreviewText = (text: string): { text: string; truncated: boolean } => {
  if (text.length <= MAX_TEXT_PREVIEW_BYTES) return { text, truncated: false };
  return { text: text.slice(0, MAX_TEXT_PREVIEW_BYTES), truncated: true };
};

export const previewKindFromNode = (
  node: { name: string; mime?: string } | null,
): WorkspacePreviewKind => detectKind(node?.mime, node?.name);

export const MAX_PREVIEW_TEXT_BYTES = MAX_TEXT_PREVIEW_BYTES;
