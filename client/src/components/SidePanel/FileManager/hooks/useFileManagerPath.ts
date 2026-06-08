import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Reads/writes the current workspace-relative path to a `?path=...`
 * search param so the file-manager location survives reloads and
 * back/forward navigation. Paths with embedded slashes are preserved
 * verbatim because `useSearchParams` round-trips the raw value.
 */
export const useFileManagerPath = (): {
  path: string;
  setPath: (next: string) => void;
  resetPath: () => void;
} => {
  const [searchParams, setSearchParams] = useSearchParams();
  const path = searchParams.get('path') ?? '';

  const setPath = useCallback(
    (next: string) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          if (next) {
            params.set('path', next);
          } else {
            params.delete('path');
          }
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const resetPath = useCallback(() => setPath(''), [setPath]);

  return useMemo(() => ({ path, setPath, resetPath }), [path, setPath, resetPath]);
};
