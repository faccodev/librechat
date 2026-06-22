import { CheckCircle2, XCircle, Loader2, Clock } from 'lucide-react';
import type { TCronJobRun } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';

/**
 * Compact, scannable run history. The newest run is on top; each row
 * shows status icon, duration, timestamp, and a one-line preview of
 * the output (clamped). Click a row to see the full transcript inline.
 *
 * `runs` is bounded server-side (50 by default); phase 1 does not
 * paginate the history.
 */
export default function RunHistory({ runs }: { runs: TCronJobRun[] }) {
  const localize = useLocalize();

  if (runs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-light py-12 text-text-secondary">
        <Clock className="size-8 opacity-50" aria-hidden="true" />
        <p className="text-xs">{localize('com_ui_cronjobs_no_runs')}</p>
      </div>
    );
  }

  // Newest first — the schema inserts at the tail so reverse the array.
  const ordered = [...runs].reverse();

  return (
    <ul className="flex flex-col divide-y divide-border-light rounded-xl border border-border-light bg-surface-primary">
      {ordered.map((run, idx) => (
        <RunRow key={`${run.startedAt}-${idx}`} run={run} />
      ))}
    </ul>
  );
}

function RunRow({ run }: { run: TCronJobRun }) {
  const localize = useLocalize();
  const Icon =
    run.status === 'running'
      ? Loader2
      : run.status === 'success'
        ? CheckCircle2
        : XCircle;
  const color =
    run.status === 'running'
      ? 'text-blue-500'
      : run.status === 'success'
        ? 'text-emerald-500'
        : 'text-red-500';

  const preview =
    run.status === 'error' && run.error
      ? run.error.slice(0, 120)
      : (run.output ?? '').slice(0, 120);

  return (
    <li className="flex flex-col gap-1 px-4 py-3 text-xs">
      <div className="flex items-center gap-2 text-text-primary">
        <Icon
          className={`size-4 ${color} ${run.status === 'running' ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
        <span className="font-medium">{localize(`com_ui_cronjobs_status_${run.status}`)}</span>
        {run.durationMs != null && (
          <span className="text-text-secondary">· {(run.durationMs / 1000).toFixed(1)}s</span>
        )}
        <span className="ml-auto text-text-secondary">
          {new Date(run.startedAt).toLocaleString()}
        </span>
      </div>
      {run.provider && run.model && (
        <div className="text-text-secondary">
          {run.provider} / {run.model}
        </div>
      )}
      {preview && (
        <pre className="mt-1 max-h-32 overflow-y-auto whitespace-pre-wrap break-words rounded bg-surface-tertiary p-2 text-[11px] text-text-primary">
          {preview}
          {preview.length >= 120 && '...'}
        </pre>
      )}
    </li>
  );
}
