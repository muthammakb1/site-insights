import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { KpiCards } from '@features/kpiCards/KpiCards';

export function ExecutiveSummaryPage() {
  return (
    <ErrorBoundary fallbackMessage="KPI cards failed to load.">
      <KpiCards />
    </ErrorBoundary>
  );
}
