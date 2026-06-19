import { Component } from 'react';
import './ErrorBoundary.scss';

/**
 * Class component required for error boundary (React has no hook equivalent yet).
 * Wrap each dashboard widget in this so one broken widget doesn't crash the page.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Replace with your real error reporting (Sentry, etc.)
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary" role="alert">
          <span className="error-boundary__icon" aria-hidden="true">⚠</span>
          <p className="error-boundary__message">
            {this.props.fallbackMessage ?? 'Something went wrong loading this widget.'}
          </p>
          <button
            className="error-boundary__retry"
            onClick={() => this.setState({ error: null })}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
