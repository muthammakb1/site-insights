/**
 * RTK Query endpoints for conversion metrics.
 *
 * Like trafficEndpoints.js, these POST to '/reports', which resolves via
 * adobeAnalyticsApi's baseUrl to the Netlify Function proxy in front of
 * Adobe Analytics — see adobeAnalyticsApi.js for why the browser can't call
 * Adobe directly.
 *
 * Both endpoints below are only consumed by
 * src/features/conversionFunnel/ConversionFunnel.jsx, which is not currently
 * imported/rendered by any page — PageRouter.jsx's 'funnels' route still
 * renders a PlaceholderPage. Neither endpoint is live on the dashboard yet;
 * wire ConversionFunnel.jsx into that route to enable them.
 */
import { buildReportQuery } from '@utils/adobeQueryBuilder';

export function injectConversionEndpoints(baseApi) {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      // Per-page breakdown of visits/orders/revenue, used to build the
      // funnel visualization (the funnel steps themselves are derived from
      // this row data in the ConversionFunnel feature, not here).
      getConversionFunnel: builder.query({
        query: ({ dateRange }) => ({
          url:    '/reports',
          method: 'POST',
          body:   buildReportQuery({
            dateRange,
            metrics:   ['visits', 'orders', 'revenue'],
            dimension: 'page',
          }),
        }),
        providesTags: ['Conversion'],
        transformResponse: (response) => response?.rows ? response : null,
      }),

      // Site-wide conversion totals (no dimension, so Adobe returns one
      // summary row). Falls back to fixture data if Adobe returns nothing,
      // so the dashboard still renders something sensible.
      getConversionRate: builder.query({
        query: ({ dateRange }) => ({
          url:    '/reports',
          method: 'POST',
          body:   buildReportQuery({
            dateRange,
            metrics: ['conversionRate', 'orders', 'revenue', 'averageOrderValue'],
          }),
        }),
        providesTags: ['Conversion'],
        transformResponse: (response) => response ?? CONVERSION_RATE_MOCK,
      }),
    }),
    overrideExisting: false,
  });
}

// Referenced by getConversionRate's transformResponse above as a fallback.
const CONVERSION_RATE_MOCK = {
  totals: { conversionRate: 0.0362, orders: 5_180, revenue: 412_640, averageOrderValue: 79.66 },
};

// Not currently referenced anywhere — kept as a reference shape for the
// funnel visualization if it's ever moved server-side or given its own
// fallback, the way CONVERSION_RATE_MOCK is used above.
const CONVERSION_FUNNEL_MOCK = {
  steps: [
    { label: 'Product View', value: 48_200 },
    { label: 'Add to Cart',  value: 18_750 },
    { label: 'Checkout',     value: 9_340  },
    { label: 'Purchase',     value: 5_180  },
  ],
};
