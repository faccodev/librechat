import { Fragment } from 'react';
import { ChevronRight, Folder, Home } from 'lucide-react';
import { useLocalize } from '~/hooks';

const ROOT_KEY = 'com_fm_breadcrumb_root';

type BreadcrumbProps = {
  path: string;
  onNavigate: (path: string) => void;
};

/**
 * Renders the workspace path as a clickable breadcrumb. Each segment
 * is a button that jumps to the corresponding ancestor; the last
 * segment is the current location and is rendered as plain text.
 */
const Breadcrumb = ({ path, onNavigate }: BreadcrumbProps) => {
  const localize = useLocalize();
  const segments = path ? path.split('/').filter(Boolean) : [];
  const crumbs = segments.map((segment, index) => {
    const cumulative = segments.slice(0, index + 1).join('/');
    return { label: segment, path: cumulative };
  });

  return (
    <nav aria-label={localize('com_fm_breadcrumb_aria')} className="flex min-w-0 items-center">
      <button
        type="button"
        onClick={() => onNavigate('')}
        className="flex items-center gap-1 rounded px-1.5 py-0.5 text-xs text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
        aria-label={localize(ROOT_KEY)}
      >
        <Home className="size-3.5" aria-hidden="true" />
        <span>{localize(ROOT_KEY)}</span>
      </button>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <Fragment key={crumb.path}>
            <ChevronRight
              className="mx-0.5 size-3.5 shrink-0 text-text-secondary/60"
              aria-hidden="true"
            />
            {isLast ? (
              <span
                aria-current="page"
                className="flex items-center gap-1 truncate rounded px-1.5 py-0.5 text-xs font-medium text-text-primary"
              >
                <Folder className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{crumb.label}</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate(crumb.path)}
                className="flex items-center gap-1 truncate rounded px-1.5 py-0.5 text-xs text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
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
