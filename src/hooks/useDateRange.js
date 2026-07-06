import { useSelector, useDispatch } from 'react-redux';
import { useDebouncedValue } from './useDebouncedValue';
import {
  selectDateRange,
  setDateRange,
  setPreset,
} from '@features/dateRange/dateRangeSlice';
import { DEBOUNCE_MS } from '@utils/constants';

/**
 * Returns the date range from Redux (live + debounced) and action dispatchers.
 *
 * Usage in any component that calls an API:
 *   const { queryArgs } = useDateRange();
 *   const { data } = useGetTrafficOverviewQuery(queryArgs);
 *
 * queryArgs = { dateRange: { startDate, endDate } }
 * buildReportQuery formats this into "YYYY-MM-DDTHH:mm:ss.SSS/YYYY-MM-DDTHH:mm:ss.SSS"
 */
export function useDateRange() {
  const dispatch  = useDispatch();
  const dateRange = useSelector(selectDateRange);

  // Debounce prevents a burst of API calls while the user types a custom date.
  const debouncedDateRange = useDebouncedValue(dateRange, DEBOUNCE_MS);

  return {
    dateRange,
    debouncedDateRange,
    // Spread directly into any RTK Query hook argument
    queryArgs: { dateRange: debouncedDateRange },
    setDateRange: (startDate, endDate) => dispatch(setDateRange({ startDate, endDate })),
    setPreset:    (preset) => dispatch(setPreset(preset)),
  };
}
