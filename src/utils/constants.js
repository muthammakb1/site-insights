export const DATE_PRESETS = [
  { label: 'Last 7 days',   value: 'last7' },
  { label: 'Last 30 days',  value: 'last30' },
  { label: 'Last 90 days',  value: 'last90' },
  { label: 'This month',    value: 'thisMonth' },
  { label: 'Last month',    value: 'lastMonth' },
];

// Fixed chart palette — matches CSS custom properties in _variables.scss
export const CHART_COLORS = {
  primary: '#3B4DFF',   // --chart-1 / --ap-primary-700
  pink:    '#FF5BA6',   // --chart-2
  orange:  '#FF9F40',   // --chart-3
  teal:    '#1CB5B2',   // --chart-4
  green:   '#34C759',   // --chart-5
  purple:  '#8B5CF6',   // --chart-6
  blue:    '#3B82F6',   // --chart-7
  muted:   '#AAB4C5',   // --ap-gray-400
};

// Ordered series — use index to assign colours consistently across all charts
export const CHART_SERIES_COLORS = [
  '#3B4DFF', '#FF5BA6', '#FF9F40', '#1CB5B2', '#34C759', '#8B5CF6', '#3B82F6',
];

export const DEBOUNCE_MS = 400;
