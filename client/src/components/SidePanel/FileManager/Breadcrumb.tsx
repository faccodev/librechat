import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronRight, Ellipsis, Folder, Home, Loader2 } from 'lucide-react';
import { useLocalize } from '~/hooks';

const ROOT_KEY = 'com_fm_breadcrumb_root';
const ELLIPSIS_KEY = 'com_fm_breadcrumb_collapsed';

type BreadcrumbProps = {
  path: string;
  onNavigate: (path: string) => void;
  /**
   * When true, render an inline spinner next to the active segment.
   * The file manager passes its `isFetching` from the workspace tree
   * query so the user gets a visible cue while the next level is
   * being loaded after a click.
   */
  isLoading?: boolean;
};

/**
 * Compute which segments to render when the path is wider than the
 * container can comfortably show. We always show:
 *   1. the root button
 *   2. an ellipsis button (when there are middle segments hidden)
 *   3. the last 2 segments
 * Hidden middle segments are revealed in a popover on click of the
 * ellipsis button. This mirrors the "..." truncation pattern in
 * VS Code, Cursor, and Finder breadcrumbs.
 */
const VISIBLE_TAIL = 2;

const computeVisibleSegments = (
  crumbs: Array<{ label: string; path: string }>,
  showAll: boolean,
): { visible: typeof crumbs; hidden: typeof crumbs } => {
  if (showAll || crumbs.length <= VISIBLE_TAIL + 1) {
    return { visible: crumbs, hidden: [] };
  }
  const hidden = crumbs.slice(0, crumbs.length - VISIBLE_TAIL);
  const visible = crumbs.slice(crumbs.length - VISIBLE_TAIL);
  return { visible, hidden };
};

/**
 * Renders the workspace path as a clickable breadcrumb. Each segment
 * is a button that jumps to the corresponding ancestor; the last
 * segment is the current location and is rendered as plain text.
 *
 * When the path has many segments, the middle ones are collapsed into
 * a single ellipsis button that opens a popover with the full chain —
 * keeps the breadcrumb on a single line instead of forcing a horizontal
 * scrollbar or an illegible chain of `...` truncations.
 */
const Breadcrumb = ({ path, onNavigate, isLoading = false }: BreadcrumbProps) => {
  const localize = useLocalize();
  const segments = path ? path.split('/').filter(Boolean) : [];
  const crumbs = segments.map((segment, index) => {
    const cumulative = segments.slice(0, index + 1).join('/');
    return { label: segment, path: cumulative };
  });

  const [showAll, setShowAll] = useState(false);
  const [ellipsisOpen, setEllipsisOpen] = useState(false);
  const ellipsisRef = useRef<HTMLDivElement | null>(null);

  // Reset the "show all" state whenever the user navigates to a new
  // path. Otherwise clicking into a deeper folder keeps the previous
  // override and the breadcrumb stays expanded.
  useEffect(() => {
    setShowAll(false);
    setEllipsisOpen(false);
  }, [path]);

  // Close the ellipsis popover on outside click so the breadcrumb
  // behaves like a normal popover (Escape key and blur also close it).
  useEffect(() => {
    if (!ellipsisOpen) {
      return;
    }
    const onClick = (event: MouseEvent) => {
      if (!ellipsisRef.current) {
        return;
      }
      if (!ellipsisRef.current.contains(event.target as Node)) {
        setEllipsisOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEllipsisOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [ellipsisOpen]);

  const { visible, hidden } = computeVisibleSegments(crumbs, showAll);

  return (
    <nav
      aria-label={localize('com_fm_breadcrumb_aria')}
      className="flex min-w-0 items-center gap-0.5"
    >
      <button
        type="button"
        onClick={() => onNavigate('')}
        className="flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-xs text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
        aria-label={localize(ROOT_KEY)}
      >
        <Home className="size-3.5" aria-hidden="true" />
        <span>{localize(ROOT_KEY)}</span>
      </button>

      {hidden.length > 0 && (
        <Fragment>
          <ChevronRight
            className="mx-0.5 size-3.5 shrink-0 text-text-secondary/60"
            aria-hidden="true"
          />
          <div ref={ellipsisRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setEllipsisOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={ellipsisOpen}
              aria-label={localize(ELLIPSIS_KEY)}
              className="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
            >
              <Ellipsis className="size-3.5" aria-hidden="true" />
            </button>
            {ellipsisOpen && (
              <ul
                role="menu"
                className="absolute left-0 top-full z-20 mt-1 max-h-64 w-56 overflow-y-auto rounded-md border border-border-light bg-surface-primary p-1 text-xs shadow-lg"
              >
                {hidden.map((crumb) => (
                  <li key={crumb.path} role="none">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setEllipsisOpen(false);
                        onNavigate(crumb.path);
                      }}
                      className="flex w-full items-center gap-1.5 truncate rounded px-2 py-1 text-left text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
                    >
                      <Folder
                        className="size-3.5 shrink-0 text-text-secondary/70"
                        aria-hidden="true"
                      />
                      <span className="truncate">{crumb.label}</span>
                    </button>
                  </li>
                ))}
                <li role="none" className="border-t border-border-light/60">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setEllipsisOpen(false);
                      setShowAll(true);
                    }}
                    className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-left text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
                  >
                    <span className="truncate">{localize(ELLIPSIS_KEY)}</span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </Fragment>
      )}

      {visible.map((crumb, index) => {
        const isLast = index === visible.length - 1;
        return (
          <Fragment key={crumb.path}>
            <ChevronRight
              className="mx-0.5 size-3.5 shrink-0 text-text-secondary/60"
              aria-hidden="true"
            />
            {isLast ? (
              <span
                aria-current="page"
                className="flex min-w-0 items-center gap-1 truncate rounded px-1.5 py-0.5 text-xs font-medium text-text-primary"
              >
                <Folder className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{crumb.label}</span>
                {isLoading && (
                  <Loader2
                    className="ml-0.5 size-3 shrink-0 animate-spin text-text-secondary"
                    aria-hidden="true"
                    data-testid="breadcrumb-loading"
                  />
                )}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate(crumb.path)}
                className="flex min-w-0 items-center gap-1 truncate rounded px-1.5 py-0.5 text-xs text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
              >
                <Folder className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{crumb.label}</span>
              </button>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
