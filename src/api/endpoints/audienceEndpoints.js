/**
 * RTK Query endpoints for audience metrics.
 *
 * Like trafficEndpoints.js, these POST to '/reports', which resolves via
 * adobeAnalyticsApi's baseUrl to the Netlify Function proxy in front of
 * Adobe Analytics — see adobeAnalyticsApi.js for why the browser can't call
 * Adobe directly.
 *
 * Both endpoints below are only consumed by
 * src/features/audienceBreakdown/AudienceBreakdown.jsx, which is not
 * currently imported/rendered by any page in PageRouter.jsx. Neither
 * endpoint is live on the dashboard yet; mount AudienceBreakdown.jsx on a
 * route to enable them.
 */
import { buildReportQuery } from '@utils/adobeQueryBuilder';

export function injectAudienceEndpoints(baseApi) {
  return baseApi.injectEndpoints({
    endpoints: (builder) => ({
      // Visits/visitors broken down by country, for the geo distribution view.
      getAudienceBreakdown: builder.query({
        query: ({ dateRange }) => ({
          url:    '/reports',
          method: 'POST',
          body:   buildReportQuery({
            dateRange,
            metrics:   ['visits', 'visitors'],
            dimension: 'country',
          }),
        }),
        providesTags: ['Audience'],
        transformResponse: (response) => response?.rows ? response : null,
      }),

      // Visits broken down by device type (desktop/mobile/tablet), for the
      // device-mix chart.
      getAudienceDevices: builder.query({
        query: ({ dateRange }) => ({
          url:    '/reports',
          method: 'POST',
          body:   buildReportQuery({
            dateRange,
            metrics:   ['visits'],
            dimension: 'mobileDeviceType',
          }),
        }),
        providesTags: ['Audience'],
        transformResponse: (response) => response?.rows ? response : null,
      }),
    }),
    overrideExisting: false,
  });
}

// ─── Mock data ──────────────────────────────────────────────────────────────
// Not currently referenced anywhere — kept as reference response shapes for
// offline/demo use. Wire in via transformResponse's fallback (as
// CONVERSION_RATE_MOCK is used in conversionEndpoints.js) if a "no API key"
// mode is ever needed here.

const AUDIENCE_BREAKDOWN_MOCK = {
  rows: [
    { country: 'United States',  visits: 58_420, uniqueVisitors: 41_300 },
    { country: 'United Kingdom', visits: 14_210, uniqueVisitors: 9_870  },
    { country: 'Germany',        visits: 9_840,  uniqueVisitors: 7_210  },
    { country: 'France',         visits: 7_650,  uniqueVisitors: 5_490  },
    { country: 'Canada',         visits: 6_980,  uniqueVisitors: 4_820  },
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
