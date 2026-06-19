import './Loader.scss';

/** Full-area shimmer placeholder while a widget loads. */
export function Loader({ height = 200 }) {
  return <div className="loader-shimmer" style={{ height }} aria-busy="true" aria-label="Loading" />;
}

/** Inline spinner for buttons / small contexts. */
export function Spinner({ size = 20 }) {
  return (
    <span
      className="spinner"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}
