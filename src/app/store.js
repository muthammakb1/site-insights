import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { adobeAnalyticsApi } from '@api/adobeAnalyticsApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adobeAnalyticsApi.middleware),
});
