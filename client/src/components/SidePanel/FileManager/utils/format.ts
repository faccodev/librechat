/** Human-readable byte sizes. Picks the largest unit that keeps the number >= 1. */
export const formatBytes = (bytes: number | undefined): string => {
  if (bytes == null || Number.isNaN(bytes)) return '—';
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
};

/** Compact relative timestamp using Intl.RelativeTimeFormat. */
export const formatRelative = (iso: string | undefined, now: Date = new Date()): string => {
  if (!iso) return '—';
  const then = new Date(iso);
  const diffMs = then.getTime() - now.getTime();
  const diffMin = Math.round(diffMs / 60_000);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute');
  const diffH = Math.round(diffMin / 60);
  if (Math.abs(diffH) < 24) return rtf.format(diffH, 'hour');
  const diffD = Math.round(diffH / 24);
  if (Math.abs(diffD) < 30) return rtf.format(diffD, 'day');
  const diffMo = Math.round(diffD / 30);
  if (Math.abs(diffMo) < 12) return rtf.format(diffMo, 'month');
  return rtf.format(Math.round(diffMo / 12), 'year');
};
