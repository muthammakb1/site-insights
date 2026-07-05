import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { injectTrafficEndpoints } from './endpoints/trafficEndpoints';
import { injectConversionEndpoints } from './endpoints/conversionEndpoints';
import { injectAudienceEndpoints } from './endpoints/audienceEndpoints';

const baseApi = createApi({
  reducerPath: 'adobeAnalyticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}/.netlify/functions`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Traffic', 'Conversion', 'Audience'],
  endpoints: () => ({}),
});

export const adobeAnalyticsApi = injectAudienceEndpoints(
  injectConversionEndpoints(
    injectTrafficEndpoints(baseApi)
  )
);

export const {
  useGetTrafficOverviewQuery,
  useGetTrafficTrendQuery,
  useGetConversionFunnelQuery,
  useGetConversionRateQuery,
  useGetAudienceBreakdownQuery,
  useGetAudienceDevicesQuery,
} = adobeAnalyticsApi;
