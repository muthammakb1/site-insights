import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthHeader } from './adobeAuth';
import { injectTrafficEndpoints } from './endpoints/trafficEndpoints';
import { injectConversionEndpoints } from './endpoints/conversionEndpoints';
import { injectAudienceEndpoints } from './endpoints/audienceEndpoints';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

// Single base API — all endpoints share cache tags and the same base client.
const baseApi = createApi({
  reducerPath: 'adobeAnalyticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/adobe`,
    prepareHeaders: (headers) => {
      const auth = getAuthHeader();
      if (auth) headers.set('Authorization', auth);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Traffic', 'Conversion', 'Audience'],
  // Endpoints are injected from their own files to keep this file thin.
  endpoints: () => ({}),
});

// Inject feature-specific endpoints
export const adobeAnalyticsApi = injectAudienceEndpoints(
  injectConversionEndpoints(
    injectTrafficEndpoints(baseApi)
  )
);

// Re-export individual hooks for convenience
export const {
  useGetTrafficOverviewQuery,
  useGetTrafficTrendQuery,
  useGetConversionFunnelQuery,
  useGetConversionRateQuery,
  useGetAudienceBreakdownQuery,
  useGetAudienceDevicesQuery,
} = adobeAnalyticsApi;
