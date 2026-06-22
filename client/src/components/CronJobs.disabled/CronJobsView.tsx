import { useMemo } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Spinner } from '@librechat/client';
import { SystemRoles } from 'librechat-data-provider';
import { useAuthContext, useLocalize } from '~/hooks';
import CronJobList from './CronJobList';
import CronJobDetail from './CronJobDetail';
import CronJobForm from './CronJobForm';

/**
 * /cronjobs route entry.
 *
 * Phase 1 uses a single route + search params (not nested routes):
 * - `/cronjobs` — list view (default)
 * - `/cronjobs?new=1` — create form
 * - `/cronjobs/:id` — detail / edit view
 *
 * Auth: admin-only (cronjobs are a global, admin-managed feature). The
 * middleware on the backend enforces the same check — this is just UX.
 */
export default function CronJobsView() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const localize = useLocalize();

  const isCreate = useMemo(() => searchParams.get('new') === '1', [searchParams]);

  if (user?.role !== SystemRoles.ADMIN) {
    return <Navigate to="/c/new" replace />;
  }

  if (isCreate) {
    return (
      <div className="flex h-full w-full flex-col overflow-y-auto bg-presentation">
        <CronJobForm />
      </div>
    );
  }

  if (id) {
    return (
      <div className="flex h-full w-full flex-col overflow-y-auto bg-presentation">
        <CronJobDetail id={id} />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-presentation">
      <header className="border-b border-border-light px-6 py-4">
        <div className="flex items-center gap-2">
          <Clock className="size-5 text-text-primary" aria-hidden="true" />
          <h1 className="text-base font-semibold text-text-primary">
            {localize('com_ui_cronjobs_title')}
          </h1>
        </div>
        <p className="mt-1 text-xs text-text-secondary">
          {localize('com_ui_cronjobs_subtitle')}
        </p>
      </header>
      <div className="flex-1 p-6">
        <CronJobList />
      </div>
    </div>
  );
}

export { CronJobList, CronJobDetail, CronJobForm };

/**
 * Re-exported so route-level tests can mount a single component
 * without pulling in the whole view (e.g. for an isolated list test).
 */
export const CronJobsLoading = () => (
  <div className="flex h-full w-full items-center justify-center bg-presentation">
    <Spinner className="text-text-secondary" aria-label={localize ? localize('com_ui_loading') : 'Loading'} />
  </div>
);
