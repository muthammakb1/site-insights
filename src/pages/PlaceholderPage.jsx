import './PlaceholderPage.scss';

export function PlaceholderPage({ title }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__inner">
        <span className="placeholder-page__icon" aria-hidden="true">🚧</span>
        <h2 className="placeholder-page__title">{title}</h2>
        <p className="placeholder-page__body">This section is under construction.</p>
      </div>
    </div>
  );
}
