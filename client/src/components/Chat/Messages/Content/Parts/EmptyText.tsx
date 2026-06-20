import { memo } from 'react';
import { Spinner } from '@librechat/client';

/** Streaming cursor placeholder — no bottom margin to match Container's structure and prevent CLS */
const EmptyTextPart = memo(() => {
  return (
    <div className="text-message flex min-h-[20px] flex-col items-start gap-3 overflow-visible">
      <div className="markdown prose dark:prose-invert light w-full break-words dark:text-gray-100">
        <div className="flex items-center pt-1">
          <Spinner className="size-4 text-text-secondary" />
        </div>
      </div>
    </div>
  );
});

export default EmptyTextPart;
