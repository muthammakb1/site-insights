/**
 * Formatting utilities — number, currency, percentage, date.
 * All functions are pure and return strings ready for display.
 */

const compactFormatter = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const fullFormatter     = new Intl.NumberFormat('en-US');
const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const pctFormatter      = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 });

/** "142,850" → "142.9K" */
export const formatCompact = (n) => compactFormatter.format(n ?? 0);

/** 142850 → "142,850" */
export const formatNumber = (n) => fullFormatter.format(n ?? 0);

/** 412640 → "$412,640.00" */
export const formatCurrency = (n) => currencyFormatter.format(n ?? 0);

/** 0.382 → "38.2%" */
export const formatPercent = (n) => pctFormatter.format(n ?? 0);

/** Change between two periods as a signed percentage string "+8.9%" / "-5.2%" */
export function formatChange(current, previous) {
  if (!previous) return '—';
  const delta = (current - previous) / Math.abs(previous);
  const sign  = delta >= 0 ? '+' : '';
  return `${sign}${(delta * 100).toFixed(1)}%`;
}

/** Whether a change is positive (higher is better for most metrics) */
export function isPositiveChange(current, previous, lowerIsBetter = false) {
  const delta = current - previous;
  return lowerIsBetter ? delta < 0 : delta > 0;
}

/** "2024-01-15" → "Jan 15, 2024" */
export function formatDate(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

/** "2024-01-15" → "Jan 15" (short, for chart axes) */
export function formatDateShort(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });
}
