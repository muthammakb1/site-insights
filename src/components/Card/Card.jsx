import './Card.scss';

export function Card({ title, subtitle, children, className = '', ...rest }) {
  return (
    <div className={`card ${className}`} {...rest}>
      {(title || subtitle) && (
        <div className="card__header">
          {title    && <h3 className="card__title">{title}</h3>}
          {subtitle && <p  className="card__subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card__body">{children}</div>
    </div>
  );
}
