import { useSelector, useDispatch } from 'react-redux';
import { useDebouncedValue } from './useDebouncedValue';
import {
  selectDateRange,
  selectReportSuiteId,
  setDateRange,
  setPreset,
  setReportSuite,
} from '@features/dateRange/dateRangeSlice';
import { DEBOUNCE_MS } from '@utils/constants';

/**
 * Convenience hook that returns the debounced date range and report suite
 * ready to pass directly as RTK Query hook arguments.
 *
 * Also exposes action dispatchers so components don't need to import the slice.
 */
export function useDateRange() {
  const dispatch    = useDispatch();
  const dateRange   = useSelector(selectDateRange);
  const reportSuiteId = useSelector(selectReportSuiteId);

  // Debounce prevents a burst of API calls while the user drags a date picker.
  const debouncedDateRange = useDebouncedValue(dateRange, DEBOUNCE_MS);

  return {
    dateRange,
    debouncedDateRange,
    reportSuiteId,
    // Query args object — spread directly into any RTK Query hook
    queryArgs: { dateRange: debouncedDateRange, reportSuiteId },
    setDateRange: (startDate, endDate) => dispatch(setDateRange({ startDate, endDate })),
    setPreset:    (preset) => dispatch(setPreset(preset)),
    setReportSuite: (id) => dispatch(setReportSuite(id)),
  };
}
