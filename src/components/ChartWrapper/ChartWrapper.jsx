import { Loader } from '@components/Loader/Loader';
import './ChartWrapper.scss';

/**
 * Standardised shell for every chart widget.
 * Handles the loading / error states so individual charts stay data-only.
 */
export function ChartWrapper({ isLoading, isError, errorMessage, height = 300, children }) {
  if (isLoading) return <Loader height={height} />;

  if (isError) {
    return (
      <div className="chart-wrapper chart-wrapper--error" style={{ height }} role="alert">
        <span className="chart-wrapper__error-icon" aria-hidden="true">⚠</span>
        <p className="chart-wrapper__error-msg">{errorMessage ?? 'Failed to load data.'}</p>
      </div>
    );
  }

  return (
    <div className="chart-wrapper" style={{ height }}>
      {children}
    </div>
  );
}
