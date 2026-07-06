/**
 * @param {object} opts
 * @param {{ startDate: string, endDate: string }} opts.dateRange  YYYY-MM-DD strings
 * @param {string[]} opts.metrics    e.g. ['pageviews', 'visitors']
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
      metrics: metrics.map((id) => ({ id: `metrics/${id}` })),
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
