import { useCallback } from 'react';

/** Creates a callback ref that focuses the popover input, transfers the command text as a search prefix, and clears the textarea. */
const useInitPopoverInput = ({
  inputRef,
  textAreaRef,
  commandChar,
  setSearchValue,
  setOpen,
}: {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  commandChar: string;
  setSearchValue: (value: string) => void;
  setOpen: (value: boolean) => void;
}) =>
  useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (!node) {
        return;
      }
      node.focus();
      setOpen(true);
      const textarea = textAreaRef.current;
      if (!textarea) {
        return;
      }
      const text = textarea.value;
      const cursor = textarea.selectionStart;
      if (cursor > 0) {
        // Find the trigger position going backwards
        const beforeCursor = text.slice(0, cursor);
        const lastTriggerIndex = beforeCursor.lastIndexOf(commandChar);
        if (lastTriggerIndex !== -1) {
          const searchPart = beforeCursor.slice(lastTriggerIndex + 1);
          setSearchValue(searchPart);
          
          // Remove the trigger character and everything after it up to the cursor
          const afterCursor = text.slice(cursor);
          textarea.value = text.slice(0, lastTriggerIndex) + afterCursor;
          textarea.setSelectionRange(lastTriggerIndex, lastTriggerIndex);
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    },
    [inputRef, textAreaRef, commandChar, setSearchValue, setOpen],
  );

export default useInitPopoverInput;
