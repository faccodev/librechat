import { memo, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { FileText } from 'lucide-react';
import { AutoSizer, List } from 'react-virtualized';
import { Spinner, useCombobox } from '@librechat/client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import type { TFile } from 'librechat-data-provider';
import type { ExtendedFile, FileSetter } from '~/common';
import type { MentionOption } from '~/common';
import useInitPopoverInput from '~/hooks/Input/useInitPopoverInput';
import { useLocalize } from '~/hooks';
import { useGetFiles } from '~/data-provider';
import { removeCharIfLast } from '~/utils';
import MentionItem from './MentionItem';
import store from '~/store';

const commandChar = '@';
const ROW_HEIGHT = 44;
const fileIcon = <FileText className="icon-md text-blue-500" />;

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

  const { data: files = [], isLoading, isError } = useGetFiles<TFile[]>();

  const fileOptions: MentionOption[] = useMemo(() => {
    const options: MentionOption[] = [];
    for (const file of files) {
      options.push({
        label: file.filename,
        value: file.file_id,
        description: formatBytes(file.bytes),
        type: 'mention',
        icon: fileIcon,
      });
    }
    return options;
  }, [files]);

  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { open, setOpen, searchValue, setSearchValue, matches } = useCombobox({
    value: '',
    options: fileOptions,
  });

  const initInputRef = useInitPopoverInput({
    inputRef,
    textAreaRef,
    commandChar,
    setSearchValue,
    setOpen,
  });

  const handleSelect = useCallback(
    (mention?: MentionOption) => {
      if (!mention) {
        return;
      }

      setSearchValue('');
      setOpen(false);
      setShowFileSearchPopover(false);

      if (textAreaRef.current) {
        removeCharIfLast(textAreaRef.current, commandChar);
      }

      const selectedFile = files.find((f) => f.file_id === mention.value);
      if (selectedFile) {
        const extendedFile: ExtendedFile = {
          file_id: selectedFile.file_id,
          file: undefined,
          type: selectedFile.type,
          progress: 1,
          size: selectedFile.bytes,
          filename: selectedFile.filename,
          filepath: selectedFile.filepath,
          source: selectedFile.source,
          embedded: selectedFile.embedded,
          preview: selectedFile.preview,
        };

        setFiles((prev) => {
          const updated = new Map(prev);
          updated.set(extendedFile.file_id, extendedFile);
          return updated;
        });
      }

      textAreaRef.current?.focus();
    },
    [setSearchValue, setOpen, setShowFileSearchPopover, textAreaRef, files, setFiles],
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

  return (
    <div className="absolute bottom-28 z-10 w-full space-y-2">
      <div className="popover border-token-border-light rounded-2xl border bg-surface-tertiary-alt p-2 shadow-lg">
        <input
          ref={initInputRef}
          placeholder={localize('com_files_filter')}
          className="mb-1 w-full border-0 bg-surface-tertiary-alt p-2 text-sm focus:outline-none dark:text-gray-200"
          autoComplete="off"
          value={searchValue}
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
            } else if (e.key === 'Backspace' && searchValue === '') {
              setOpen(false);
              setShowFileSearchPopover(false);
              textAreaRef.current?.focus();
            }
          }}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            timeoutRef.current = setTimeout(() => {
              setOpen(false);
              setShowFileSearchPopover(false);
            }, 150);
          }}
        />
        {open && isLoading && matches.length === 0 && (
          <div className="flex h-32 items-center justify-center text-text-primary">
            <Spinner />
          </div>
        )}
        {open && isError && (
          <div className="p-4 text-center text-sm text-text-secondary">
            {localize('com_files_download_failed')}
          </div>
        )}
        {open && !isLoading && !isError && matches.length === 0 && (
          <div className="p-4 text-center text-sm text-text-secondary">
            {localize('com_files_no_results')}
          </div>
        )}
        {open && matches.length > 0 && (
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
