import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const today = dayjs();

const initialState = {
  startDate: today.subtract(30, 'day').format('YYYY-MM-DD'),
  endDate:   today.format('YYYY-MM-DD'),
  // Which Adobe report suite is active
  reportSuiteId: process.env.REACT_APP_REPORT_SUITE_ID || 'mock-report-suite',
};

const dateRangeSlice = createSlice({
  name: 'dateRange',
  initialState,
  reducers: {
    setDateRange(state, action) {
      state.startDate = action.payload.startDate;
      state.endDate   = action.payload.endDate;
    },
    setReportSuite(state, action) {
      state.reportSuiteId = action.payload;
    },
    setPreset(state, action) {
      const today = dayjs();
      const presets = {
        last7:   { startDate: today.subtract(7,  'day').format('YYYY-MM-DD'), endDate: today.format('YYYY-MM-DD') },
        last30:  { startDate: today.subtract(30, 'day').format('YYYY-MM-DD'), endDate: today.format('YYYY-MM-DD') },
        last90:  { startDate: today.subtract(90, 'day').format('YYYY-MM-DD'), endDate: today.format('YYYY-MM-DD') },
        thisMonth: {
          startDate: today.startOf('month').format('YYYY-MM-DD'),
          endDate:   today.format('YYYY-MM-DD'),
        },
        lastMonth: {
          startDate: today.subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
          endDate:   today.subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
        },
      };
      const preset = presets[action.payload];
      if (preset) {
        state.startDate = preset.startDate;
        state.endDate   = preset.endDate;
      }
    },
  },
});

export const { setDateRange, setReportSuite, setPreset } = dateRangeSlice.actions;

// Selectors
export const selectDateRange    = (state) => state.dateRange;
export const selectStartDate    = (state) => state.dateRange.startDate;
export const selectEndDate      = (state) => state.dateRange.endDate;
export const selectReportSuiteId = (state) => state.dateRange.reportSuiteId;

export default dateRangeSlice.reducer;
