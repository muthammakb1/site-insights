import { buildReportQuery } from '@utils/adobeQueryBuilder';

/**
 * Injects traffic-related endpoints into the base API slice.
 * Each endpoint takes { dateRange, reportSuiteId } as its query arg so that
 * RTK Query re-fetches automatically when the global date range changes.
 */
export function injectTrafficEndpoints(baseApi) {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getTrafficOverview: builder.query({
        query: ({ dateRange, reportSuiteId }) => ({
          url: '/reports',
          method: 'POST',
          body: buildReportQuery({
            reportSuiteId,
            dateRange,
            metrics: ['visits', 'pageviews', 'uniqueVisitors', 'bounceRate'],
            dimensions: [],
          }),
        }),
        providesTags: ['Traffic'],
        // Mock: when running without a backend, return stub data
        transformResponse: (response) => response ?? TRAFFIC_OVERVIEW_MOCK,
      }),

      getTrafficTrend: builder.query({
        query: ({ dateRange, reportSuiteId, granularity = 'day' }) => ({
          url: '/reports',
          method: 'POST',
          body: buildReportQuery({
            reportSuiteId,
            dateRange,
            metrics: ['visits', 'pageviews'],
            dimensions: [granularity],
          }),
        }),
        providesTags: ['Traffic'],
        transformResponse: (response) => response ?? TRAFFIC_TREND_MOCK,
      }),
    }),
    overrideExisting: false,
  });
}

// ─── Mock data (used when the backend proxy is not running) ───────────────────

const TRAFFIC_OVERVIEW_MOCK = {
  totals: { visits: 142_850, pageviews: 487_320, uniqueVisitors: 98_441, bounceRate: 0.382 },
  previousPeriod: { visits: 131_204, pageviews: 452_100, uniqueVisitors: 89_230, bounceRate: 0.401 },
};

const TRAFFIC_TREND_MOCK = {
  rows: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86_400_000).toISOString().slice(0, 10),
    visits: Math.floor(3_500 + Math.random() * 2_500),
    pageviews: Math.floor(12_000 + Math.random() * 6_000),
  })),
};
