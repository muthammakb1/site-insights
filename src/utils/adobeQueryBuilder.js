/**
 * Constructs an Adobe Analytics Reporting API 2.0 request body.
 *
 * Centralising this prevents each feature from hand-rolling the JSON structure
 * and makes it easy to add global settings (locale, pagination, etc.) in one place.
 */

/**
 * @param {object} opts
 * @param {string}   opts.reportSuiteId
 * @param {{ startDate: string, endDate: string }} opts.dateRange  YYYY-MM-DD strings
 * @param {string[]} opts.metrics    e.g. ['visits', 'pageviews']
 * @param {string[]} opts.dimensions e.g. ['day', 'country']
 * @param {number}   [opts.limit]    rows per page (default 50)
 * @param {number}   [opts.page]     0-indexed page (default 0)
 * @param {object}   [opts.search]   optional dimension search clause
 * @returns {object} Adobe Reporting API 2.0 request body
 */
export function buildReportQuery({
  reportSuiteId,
  dateRange,
  metrics,
  dimensions = [],
  limit = 50,
  page = 0,
  search,
}) {
  const { startDate, endDate } = dateRange;

  return {
    rsid: reportSuiteId,
    globalFilters: [
      {
        type: 'dateRange',
        dateRange: `${startDate}T00:00:00.000/${endDate}T23:59:59.999`,
      },
    ],
    metricContainer: {
      metrics: metrics.map((id) => ({ columnId: id, id: `metrics/${id}` })),
    },
    dimension: dimensions.length ? `variables/${dimensions[0]}` : undefined,
    settings: {
      countRepeatInstances: true,
      limit,
      page,
      nonesBehavior: 'exclude-nones',
    },
    ...(search && { search }),
  };
}

/**
 * Formats a dateRange slice state object into the compact string used in the
 * Adobe dateRange filter (for building cache-key-friendly query args).
 */
export function dateRangeToString({ startDate, endDate }) {
  return `${startDate}/${endDate}`;
}
