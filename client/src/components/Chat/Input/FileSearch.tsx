import { memo, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { FileText } from 'lucide-react';
import { AutoSizer, List } from 'react-virtualized';
import { Spinner } from '@librechat/client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import type { WorkspaceSearchResult } from 'librechat-data-provider';
import type { ExtendedFile, FileSetter, MentionOption } from '~/common';
import useInitPopoverInput from '~/hooks/Input/useInitPopoverInput';
import useDebounce from '~/hooks/Input/useDebounce';
import { useLocalize } from '~/hooks';
import { useWorkspaceSearch } from '~/data-provider';
import { fuzzyRank } from '~/utils/fuzzyMatch';
import { removeCharIfLast } from '~/utils';
import MentionItem from './MentionItem';
import store from '~/store';

const commandChar = '@';
const ROW_HEIGHT = 44;
const fileIcon = <FileText className="icon-md text-blue-500" />;
const SEARCH_DEBOUNCE_MS = 300;
/** Backend's `useWorkspaceSearch` already gates on `>= 3` chars; the
 *  client-side threshold must match or the spinner shows on every
 *  keystroke under 3 chars. */
const MIN_QUERY_LENGTH = 3;

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

function FileSearchContent({
  index,
  textAreaRef,
  setFiles,
}: {
  index: number;
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  setFiles: FileSetter;
}) {
  const localize = useLocalize();
  const setShowFileSearchPopover = useSetRecoilState(store.showFileSearchPopoverFamily(index));

  const [rawQuery, setRawQuery] = useState('');
  const debouncedQuery = useDebounce(rawQuery, SEARCH_DEBOUNCE_MS);
  // The backend hook only fires when the debounced query hits the
  // 3-char threshold. Below that threshold we treat the input as
  // "no query" so the dropdown shows the empty-state hint instead of
  // a previous query's stale results.
  const effectiveQuery = debouncedQuery.trim().length >= MIN_QUERY_LENGTH ? debouncedQuery : '';
  const {
    data: searchResult,
    isLoading,
    isError,
  } = useWorkspaceSearch<WorkspaceSearchResult>(effectiveQuery);

  const fileOptions: MentionOption[] = useMemo(() => {
    const nodes = searchResult?.matches ?? [];
    // Re-rank the (already substring-filtered) backend hits with the
    // local fuzzy scorer so that, e.g., `@olivchpro` floats
    // `oliver-chatbot-prompt.md` to the top.
    const ranked = fuzzyRank(effectiveQuery, nodes, (node) => node.name);
    return ranked.map((node) => ({
      label: node.name,
      // The backend returns workspace-relative POSIX paths; the
      // picker just needs a stable, unique value to identify the
      // chosen entry.
      value: node.path,
      description:
        node.type === 'file' && typeof node.size === 'number'
          ? formatBytes(node.size)
          : node.path,
      type: 'mention',
      icon: fileIcon,
    }));
  }, [searchResult, effectiveQuery]);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const matches = fileOptions;

  const initInputRef = useInitPopoverInput({
    inputRef,
    textAreaRef,
    commandChar,
    setSearchValue: setRawQuery,
    setOpen,
  });

  const handleSelect = useCallback(
    (mention?: MentionOption) => {
      if (!mention) {
        return;
      }

      setRawQuery('');
      setOpen(false);
      setShowFileSearchPopover(false);

      if (textAreaRef.current) {
        removeCharIfLast(textAreaRef.current, commandChar);
      }

      const nodes = searchResult?.matches ?? [];
      const selectedNode = nodes.find((n) => n.path === mention.value);
      if (selectedNode) {
        // Map the workspace `WorkspaceNode` into the chat's
        // `ExtendedFile` shape. Workspace files don't have a backing
        // `file_id` from the messages DB, so we synthesize one from
        // the path. The chat uses this id only as a local map key.
        const syntheticFileId = `workspace:${selectedNode.path}`;
        const extendedFile: ExtendedFile = {
          file_id: syntheticFileId,
          file: undefined,
          type: selectedNode.mime ?? 'application/octet-stream',
          progress: 1,
          size: selectedNode.size ?? 0,
          filename: selectedNode.name,
          filepath: selectedNode.path,
          source: 'workspace',
          embedded: undefined,
          preview: undefined,
        };

        setFiles((prev) => {
          const updated = new Map(prev);
          updated.set(extendedFile.file_id, extendedFile);
          return updated;
        });
      }

      textAreaRef.current?.focus();
    },
    [setOpen, setShowFileSearchPopover, textAreaRef, searchResult, setFiles],
  );

  useEffect(() => {
    if (!open) {
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, Math.max(matches.length - 1, 0)));
  }, [matches.length]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const el = document.getElementById(`file-item-${activeIndex}`);
    el?.scrollIntoView({ behavior: 'instant', block: 'nearest' });
  }, [activeIndex]);

  const rowRenderer = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: React.CSSProperties;
  }) => {
    const mention = matches[index] as MentionOption;
    return (
      <MentionItem
        index={index}
        type="mention"
        key={key}
        style={style}
        onClick={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = null;
          handleSelect(mention);
        }}
        name={mention.label ?? ''}
        icon={mention.icon}
        description={mention.description}
        isActive={index === activeIndex}
      />
    );
  };

  // States for the empty / loading region. Splitting them makes the
  // UX predictable: the spinner only appears once a real query is in
  // flight, not while the user is just opening the picker.
  const hasQuery = effectiveQuery.length > 0;
  const showInitialHint = !hasQuery;
  const showLoading = hasQuery && isLoading && matches.length === 0;
  const showError = hasQuery && !isLoading && isError;
  const showEmpty = hasQuery && !isLoading && !isError && matches.length === 0;
  const showResults = matches.length > 0;

  return (
    <div className="absolute bottom-28 z-10 w-full space-y-2">
      <div className="popover border-token-border-light rounded-2xl border bg-surface-tertiary-alt p-2 shadow-lg">
        <input
          ref={initInputRef}
          placeholder={localize('com_files_filter')}
          className="mb-1 w-full border-0 bg-surface-tertiary-alt p-2 text-sm focus:outline-none dark:text-gray-200"
          autoComplete="off"
          value={rawQuery}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false);
              setShowFileSearchPopover(false);
              textAreaRef.current?.focus();
              return;
            }
            if (e.key === 'ArrowDown') {
              if (matches.length === 0) {
                return;
              }
              setActiveIndex((prevIndex) => (prevIndex + 1) % matches.length);
            } else if (e.key === 'ArrowUp') {
              if (matches.length === 0) {
                return;
              }
              setActiveIndex((prevIndex) => (prevIndex - 1 + matches.length) % matches.length);
            } else if (e.key === 'Enter' || e.key === 'Tab') {
              if (matches.length === 0) {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
                setOpen(false);
                setShowFileSearchPopover(false);
                textAreaRef.current?.focus();
                return;
              }
              e.preventDefault();
              handleSelect(matches[activeIndex] as MentionOption | undefined);
            } else if (e.key === 'Backspace' && rawQuery === '') {
              setOpen(false);
              setShowFileSearchPopover(false);
              textAreaRef.current?.focus();
            }
          }}
          onChange={(e) => setRawQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            timeoutRef.current = setTimeout(() => {
              setOpen(false);
              setShowFileSearchPopover(false);
            }, 150);
          }}
        />
        {open && showInitialHint && (
          <div className="p-4 text-center text-sm text-text-secondary">
            {localize('com_files_search_hint')}
          </div>
        )}
        {open && showLoading && (
          <div className="flex h-32 items-center justify-center text-text-primary">
            <Spinner />
          </div>
        )}
        {open && showError && (
          <div className="p-4 text-center text-sm text-text-secondary">
            {localize('com_files_download_failed')}
          </div>
        )}
        {open && showEmpty && (
          <div className="p-4 text-center text-sm text-text-secondary">
            {localize('com_files_no_results')}
          </div>
        )}
        {open && showResults && (
          <>
            {searchResult?.truncated && (
              <div className="px-2 pb-1 text-xs text-text-secondary">
                {localize('com_files_search_truncated')}
              </div>
            )}
            <div className="max-h-40">
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    width={width}
                    overscanRowCount={5}
                    rowHeight={ROW_HEIGHT}
                    rowCount={matches.length}
                    rowRenderer={rowRenderer}
                    scrollToIndex={activeIndex}
                    height={Math.min(matches.length * ROW_HEIGHT, 160)}
                  />
                )}
              </AutoSizer>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const FileSearch = memo(function FileSearch({
  index,
  textAreaRef,
  setFiles,
}: {
  index: number;
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  setFiles: FileSetter;
}) {
  const show = useRecoilValue(store.showFileSearchPopoverFamily(index));
  if (!show) {
    return null;
  }
  return (
    <FileSearchContent
      index={index}
      textAreaRef={textAreaRef}
      setFiles={setFiles}
    />
  );
});

export default FileSearch;
