import { buildReportQuery } from '@utils/adobeQueryBuilder';

export function injectConversionEndpoints(baseApi) {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getConversionFunnel: builder.query({
        query: ({ dateRange, reportSuiteId }) => ({
          url: '/reports',
          method: 'POST',
          body: buildReportQuery({
            reportSuiteId,
            dateRange,
            metrics: ['visits', 'orders', 'revenue'],
            dimensions: ['page'],
          }),
        }),
        providesTags: ['Conversion'],
        transformResponse: (response) => response ?? CONVERSION_FUNNEL_MOCK,
      }),

      getConversionRate: builder.query({
        query: ({ dateRange, reportSuiteId }) => ({
          url: '/reports',
          method: 'POST',
          body: buildReportQuery({
            reportSuiteId,
            dateRange,
            metrics: ['conversionRate', 'orders', 'revenue', 'averageOrderValue'],
            dimensions: [],
          }),
        }),
        providesTags: ['Conversion'],
        transformResponse: (response) => response ?? CONVERSION_RATE_MOCK,
      }),
    }),
    overrideExisting: false,
  });
}

const CONVERSION_FUNNEL_MOCK = {
  steps: [
    { label: 'Product View',  value: 48_200 },
    { label: 'Add to Cart',   value: 18_750 },
    { label: 'Checkout',      value: 9_340 },
    { label: 'Purchase',      value: 5_180 },
  ],
};

const CONVERSION_RATE_MOCK = {
  totals: { conversionRate: 0.0362, orders: 5_180, revenue: 412_640, averageOrderValue: 79.66 },
};
