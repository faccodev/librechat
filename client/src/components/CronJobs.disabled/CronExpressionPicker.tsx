import { useMemo, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input, Label, Button } from '@librechat/client';
import { useLocalize } from '~/hooks';

/**
 * Visual cron expression picker.
 *
 * Two surfaces:
 * 1. **Preset chips** for the common cases (every minute, hourly,
 *    daily, weekly, monthly) — clicking applies the 5-field expression.
 * 2. **Visual builder** with dropdowns for minute / hour / day-of-month
 *    / month / day-of-week. Mirrors the standard 5-field cron.
 *
 * The free-form `schedule` input is always visible at the bottom so
 * power users can paste raw expressions. The visual builder and the
 * text input share state via react-hook-form — whichever changes last
 * wins.
 */
export default function CronExpressionPicker() {
  const localize = useLocalize();
  const { control, setValue, watch } = useFormContext<{ schedule: string }>();
  const [preset, setPreset] = useState<string>('custom');

  const currentSchedule = watch('schedule');

  const applyPreset = (key: string, expression: string) => {
    setPreset(key);
    setValue('schedule', expression, { shouldValidate: true, shouldDirty: true });
  };

  const presets: Array<{ key: string; label: string; expr: string }> = useMemo(
    () => [
      { key: 'every-minute', label: localize('com_ui_cronjobs_preset_every_minute'), expr: '* * * * *' },
      { key: 'every-5-min', label: localize('com_ui_cronjobs_preset_every_5_min'), expr: '*/5 * * * *' },
      { key: 'every-15-min', label: localize('com_ui_cronjobs_preset_every_15_min'), expr: '*/15 * * * *' },
      { key: 'every-hour', label: localize('com_ui_cronjobs_preset_every_hour'), expr: '0 * * * *' },
      { key: 'every-day-9am', label: localize('com_ui_cronjobs_preset_every_day_9am'), expr: '0 9 * * *' },
      { key: 'every-mon-9am', label: localize('com_ui_cronjobs_preset_every_mon_9am'), expr: '0 9 * * 1' },
      { key: 'first-day-month', label: localize('com_ui_cronjobs_preset_first_day_month'), expr: '0 0 1 * *' },
    ],
    [localize],
  );

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border-light bg-surface-primary p-4">
      <Label className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
        {localize('com_ui_cronjobs_recurrence')}
      </Label>

      {/* Preset chips */}
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => applyPreset(p.key, p.expr)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              preset === p.key
                ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                : 'border-border-light text-text-secondary hover:border-border-heavy hover:text-text-primary'
            }`}
          >
            {p.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPreset('custom')}
          className={`rounded-full border px-3 py-1 text-xs transition-colors ${
            preset === 'custom'
              ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
              : 'border-border-light text-text-secondary hover:border-border-heavy hover:text-text-primary'
          }`}
        >
          {localize('com_ui_cronjobs_preset_custom')}
        </button>
      </div>

      {/* Visual builder — kept simple for phase 1 */}
      {preset === 'custom' && (
        <Controller
          control={control}
          name="schedule"
          render={({ field }) => (
            <VisualBuilder
              value={field.value ?? currentSchedule ?? ''}
              onChange={(v) => field.onChange(v)}
            />
          )}
        />
      )}

      {/* Raw expression input — always visible */}
      <Controller
        control={control}
        name="schedule"
        rules={{
          validate: (v) =>
            !v || isValidCron(v) || localize('com_ui_cronjobs_invalid_cron'),
        }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col gap-1">
            <Input
              {...field}
              placeholder="*/5 * * * *"
              className="font-mono"
              aria-invalid={fieldState.invalid ? 'true' : 'false'}
            />
            {fieldState.error && (
              <span className="text-xs text-red-500">{fieldState.error.message}</span>
            )}
            <p className="text-[10px] text-text-secondary">
              {localize('com_ui_cronjobs_schedule_help')}
            </p>
          </div>
        )}
      />
    </div>
  );
}

function VisualBuilder({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  // Parse a 5-field cron expression; fall back to all-`*` if invalid.
  const parts = (value ?? '').trim().split(/\s+/);
  const safe = parts.length === 5 ? parts : ['*', '*', '*', '*', '*'];
  const [minute, hour, dom, month, dow] = safe;

  const update = (idx: number, v: string) => {
    const next = [...safe];
    next[idx] = v || '*';
    onChange(next.join(' '));
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      <Field
        label="Min"
        value={minute}
        options={['*', '0', '15', '30', '45']}
        onChange={(v) => update(0, v)}
      />
      <Field
        label="Hour"
        value={hour}
        options={['*', '0', '6', '9', '12', '18']}
        onChange={(v) => update(1, v)}
      />
      <Field
        label="Day"
        value={dom}
        options={['*', '1', '15']}
        onChange={(v) => update(2, v)}
      />
      <Field
        label="Month"
        value={month}
        options={['*', '1', '6', '12']}
        onChange={(v) => update(3, v)}
      />
      <Field
        label="Dow"
        value={dow}
        options={['*', '0', '1', '2', '3', '4', '5', '6']}
        onChange={(v) => update(4, v)}
      />
    </div>
  );
}

function Field({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-border-light bg-surface-primary px-2 py-1 text-xs text-text-primary"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Lightweight cron validator. Reuses the same 5-field standard as
 * `node-cron` — checks that we have 5 space-separated fields and that
 * each field looks plausible (digits, `*`, `,`, `-`, `/`). Server
 * does the authoritative check via `node-cron.validate`.
 */
function isValidCron(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  const fields = value.trim().split(/\s+/);
  if (fields.length !== 5) {
    return false;
  }
  const pattern = /^[\d*/,\-]+$/;
  return fields.every((f) => pattern.test(f));
}
