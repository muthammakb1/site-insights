import { buildReportQuery } from '@utils/adobeQueryBuilder';

export function injectAudienceEndpoints(baseApi) {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getAudienceBreakdown: builder.query({
        query: ({ dateRange, reportSuiteId }) => ({
          url: '/reports',
          method: 'POST',
          body: buildReportQuery({
            reportSuiteId,
            dateRange,
            metrics: ['visits', 'uniqueVisitors'],
            dimensions: ['country'],
          }),
        }),
        providesTags: ['Audience'],
        transformResponse: (response) => response ?? AUDIENCE_BREAKDOWN_MOCK,
      }),

      getAudienceDevices: builder.query({
        query: ({ dateRange, reportSuiteId }) => ({
          url: '/reports',
          method: 'POST',
          body: buildReportQuery({
            reportSuiteId,
            dateRange,
            metrics: ['visits'],
            dimensions: ['mobileDeviceType'],
          }),
        }),
        providesTags: ['Audience'],
        transformResponse: (response) => response ?? AUDIENCE_DEVICES_MOCK,
      }),
    }),
    overrideExisting: false,
  });
}

const AUDIENCE_BREAKDOWN_MOCK = {
  rows: [
    { country: 'United States', visits: 58_420, uniqueVisitors: 41_300 },
    { country: 'United Kingdom', visits: 14_210, uniqueVisitors: 9_870 },
    { country: 'Germany',        visits: 9_840,  uniqueVisitors: 7_210 },
    { country: 'France',         visits: 7_650,  uniqueVisitors: 5_490 },
    { country: 'Canada',         visits: 6_980,  uniqueVisitors: 4_820 },
    { country: 'Other',          visits: 45_750, uniqueVisitors: 29_751 },
  ],
};

const AUDIENCE_DEVICES_MOCK = {
  rows: [
    { device: 'Desktop', visits: 82_350 },
    { device: 'Mobile',  visits: 49_120 },
    { device: 'Tablet',  visits: 11_380 },
  ],
};
