/**
 * @param {object} opts
 * @param {{ startDate: string, endDate: string }} opts.dateRange  YYYY-MM-DD strings
 * @param {(string|{id: string, name?: string, filters?: string[]})[]} opts.metrics
 *   e.g. ['pageviews', 'visitors'], or an object for a named/segmented metric
 *   e.g. { id: 'visits', filters: ['seg_mobile_phone_id'], name: 'Mobile Visits' }
 *   — `filters` entries reference `id`s defined in opts.metricFilters.
 * @param {object[]} [opts.metricFilters]  segment definitions referenced by
 *   metrics[].filters, e.g. { id: 'seg_mobile_phone_id', type: 'segment', segmentId: '...' }
 * @param {string}   [opts.dimension]  e.g. 'evar6'  (single dimension variable name)
 * @param {number}   [opts.limit]    rows per page (default 10, ignored if includeSettings is false)
 * @param {number}   [opts.page]     0-indexed page (default 0, ignored if includeSettings is false)
 * @param {string}   [opts.searchClause]  e.g. "(MATCH 'https://www.asianpaints.com/')"
 * @param {boolean}  [opts.includeSettings]  set false to omit `settings` entirely (default true)
 * @returns {object} Adobe Reporting API 2.0 request body
 *
 * Note: when `dimension` is omitted, Adobe returns site-wide totals in
 * `summaryData.totals` instead of a `rows` array — callers relying on
 * `rows[i].data` need a dimension (or must read summaryData instead).
 */
export function buildReportQuery({
  dateRange,
  metrics,
  metricFilters,
  dimension,
  limit = 10,
  page  = 0,
  searchClause,
  includeSettings = true,
}) {
  const { startDate, endDate } = dateRange;

  return {
    rsid: process.env.REACT_APP_REPORT_SUITE_ID,
    globalFilters: [
      {
        type:      'dateRange',
        dateRange: `${startDate}T00:00:00.000/${endDate}T23:59:59.999`,
      },
    ],
    metricContainer: {
      metrics: metrics.map((m) =>
        typeof m === 'string' ? { id: `metrics/${m}` } : { ...m, id: `metrics/${m.id}` }
      ),
      ...(metricFilters && { metricFilters }),
    },
    ...(dimension && { dimension: `variables/${dimension}` }),
    ...(includeSettings && { settings: { limit, page } }),
    ...(searchClause && { search: { clause: searchClause } }),
  };
}

/**
 * Formats a dateRange slice state into a compact string for RTK Query cache keys.
 */
export function dateRangeToString({ startDate, endDate }) {
  return `${startDate}/${endDate}`;
}
