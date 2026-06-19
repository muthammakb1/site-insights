import { combineReducers } from '@reduxjs/toolkit';
import { adobeAnalyticsApi } from '@api/adobeAnalyticsApi';
import dateRangeReducer from '@features/dateRange/dateRangeSlice';

const rootReducer = combineReducers({
  dateRange: dateRangeReducer,
  [adobeAnalyticsApi.reducerPath]: adobeAnalyticsApi.reducer,
});

export default rootReducer;
