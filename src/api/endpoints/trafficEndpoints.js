/**
 * RTK Query endpoints for traffic metrics.
 *
 * Every `query` here builds an Adobe Reporting API 2.0 request body via
 * buildReportQuery() and POSTs it to '/reports'. That path is relative to
 * adobeAnalyticsApi's baseUrl, which resolves to the Netlify Function proxy
 * — not Adobe directly (see adobeAnalyticsApi.js for why).
 */
import { buildReportQuery } from '@utils/adobeQueryBuilder';

// Order here must match the `metrics` order passed to buildReportQuery in
// getTrafficOverview below — Adobe returns one row of positional values with
// no field names, so this array is what maps each position back to a key.
const OVERVIEW_METRIC_KEYS = [
  'pageviews',
  'visitors',
  'visits',
  'entries',
  'exits',
  'bounces',
  'event9',
  'event132',
  'timespentvisit',
  'timespentvisitor',
  'mobileVisits',
  'nonMobileVisits',
  'overallFaqClicks',
  'campaignFaqClick',
  'downloadClick',
  'videoPlayed',
  'event301',
  'event48',
  'mobileLogins',
  'nonMobileLogins',
];

// Segment definitions referenced by the `filters` entries on the metrics
// below (mobile-phone vs. non-mobile-phone traffic/logins, and an FAQ-click
// segment).
const OVERVIEW_METRIC_FILTERS = [
  { id: 'seg_mobile_phone_id', type: 'segment', segmentId: 's200000889_69660e058d4296479e9be08d' },
  { id: 'seg_nonmobile_id',    type: 'segment', segmentId: 's200000889_69660e1ea6005a2f7804f32b' },
  { id: 'seg_mobile_phone',    type: 'segment', segmentId: 's200000889_6a4b4df559314d1f94172735' },
  { id: 'seg_nonmobile',       type: 'segment', segmentId: 's200000889_6a4b4e429879a70c95e90d03' },
  { id: 'FAQs_click',          type: 'segment', segmentId: 's200000889_697327318864ef5c3c4f79f7' },
];

export function injectTrafficEndpoints(baseApi) {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      // Single-row summary of the 6 headline traffic metrics, site-wide (no
      // dimension/search scoping — previously restricted to the homepage
      // only via an evar6 dimension + search clause, removed to report
      // whole-site totals instead).
      //
      // Currently used on two routed pages (see PageRouter.jsx):
      //   - Executive Summary page, via src/features/kpiCards/KpiCards.jsx
      //   - Traffic Overview page, called directly in
      //     src/pages/TrafficOverviewPage.jsx
      getTrafficOverview: builder.query({
        query: ({ dateRange }) => ({
          url:    '/reports',
          method: 'POST',
          body:   buildReportQuery({
            dateRange,
            metrics: [
              'pageviews',
              'visitors',
              'visits',
              'entries',
              'exits',
              'bounces',
              'event9',
              'event132',
              'timespentvisit',
              'timespentvisitor',
              { id: 'visits',   filters: ['seg_mobile_phone_id'], name: 'Mobile Visits (Mobile Phone)' },
              { id: 'visits',   filters: ['seg_nonmobile_id'],    name: 'Non-Mobile Visits (Not Mobile Phone)' },
              { id: 'event143', filters: ['FAQs_click'],          name: 'Overall FAQs Click' },
              { id: 'event136', name: 'Campaign FAQ Click' },
              { id: 'event134', name: 'Download Click' },
              { id: 'event20',  name: 'Video played' },
              'event301',
              'event48',
              { id: 'event48', filters: ['seg_mobile_phone'], name: 'Mobile Logins(Mobile Phone)' },
              { id: 'event48', filters: ['seg_nonmobile'],    name: 'Non-Mobile Logins (Not Mobile Phone)' },
            ],
            metricFilters: OVERVIEW_METRIC_FILTERS,
            includeSettings: false,
          }),
        }),
        providesTags: ['Traffic'],
        // Without a `dimension`, Adobe omits `rows` entirely and returns
        // totals in summaryData.totals instead — a positional array in the
        // same order as the `metrics` above, which we zip with
        // OVERVIEW_METRIC_KEYS.
        transformResponse: (response) => {
          const totals = response?.summaryData?.totals;
          if (!totals) return null;
          return Object.fromEntries(
            OVERVIEW_METRIC_KEYS.map((key, i) => [key, Math.round(totals[i] ?? 0)])
          );
        },
      }),

      // Time series of visits/pageviews for the trend chart. `granularity`
      // is passed straight through as the Adobe dimension id, since Adobe's
      // day/week/month dimension ids happen to match our own naming.
      //
      // Only consumed by src/features/trafficOverview/TrafficOverview.jsx
      // (note: this is a different component from src/pages/TrafficOverviewPage.jsx
      // above — easy to mix up the two). That feature component isn't
      // currently imported/rendered by any page in PageRouter.jsx, so this
      // endpoint isn't live on the dashboard yet.
      getTrafficTrend: builder.query({
        query: ({ dateRange, granularity = 'day' }) => ({
          url:    '/reports',
          method: 'POST',
          body:   buildReportQuery({
            dateRange,
            metrics:   ['visits', 'pageviews'],
            dimension: granularity,
          }),
        }),
        providesTags: ['Traffic'],
        transformResponse: (response) => response ?? null,
      }),
    }),
    overrideExisting: false,
  });
}

// ─── Mock data ──────────────────────────────────────────────────────────────
// Not currently wired into the endpoints above (nothing references these
// constants) — kept as reference shapes for offline/demo use. If you want a
// working "no API key" mode, wire these in as a fallback in
// transformResponse, the way CONVERSION_RATE_MOCK is used in
// conversionEndpoints.js.

const TRAFFIC_OVERVIEW_MOCK = {
  pageviews:         487320,
  visitors:           98441,
  visits:            142850,
  entries:           120000,
  exits:               95000,
  bounces:             54000,
  event9:               2650,
  event132:             1840,
  timespentvisit:        185,
  timespentvisitor:      210,
  mobileVisits:        98420,
  nonMobileVisits:     44430,
  overallFaqClicks:     3200,
  campaignFaqClick:     1150,
  downloadClick:        6400,
  videoPlayed:          8900,
  event301:              720,
  event48:              5400,
  mobileLogins:         3900,
  nonMobileLogins:      1500,
};

const TRAFFIC_TREND_MOCK = {
  rows: Array.from({ length: 30 }, (_, i) => ({
    date:      new Date(Date.now() - (29 - i) * 86_400_000).toISOString().slice(0, 10),
    visits:    Math.floor(3_500 + Math.random() * 2_500),
    pageviews: Math.floor(12_000 + Math.random() * 6_000),
  })),
};
