import { Download } from 'lucide-react';
import { DateRangePicker } from '@features/dateRange/DateRangePicker';
import './Header.scss';

export function Header({ title, subtitle }) {
  return (
    <header className="header">
      {/* Left — product name + page title + subtitle */}
      <div className="header__brand">
        <span className="header__product-name">Site Insights</span>
        <h1 className="header__title">{title}</h1>
        <p className="header__subtitle">{subtitle}</p>
      </div>

      {/* Right — date picker + download */}
      <div className="header__controls">
        <DateRangePicker />
        <button type="button" className="header__download-btn">
          <Download size={15} strokeWidth={2} />
          Download Report
        </button>
      </div>
    </header>
  );
}
