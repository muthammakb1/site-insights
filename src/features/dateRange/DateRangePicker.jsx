import { useState, useRef, useEffect } from 'react';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { useDateRange } from '@hooks/useDateRange';
import { DATE_PRESETS } from '@utils/constants';
import { formatDate } from '@utils/formatters';
import './DateRangePicker.scss';

export function DateRangePicker() {
  const { dateRange, setPreset, setDateRange } = useDateRange();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handleStartChange(e) {
    setDateRange(e.target.value, dateRange.endDate);
  }

  function handleEndChange(e) {
    setDateRange(dateRange.startDate, e.target.value);
  }

  const label = `${formatDate(dateRange.startDate)} – ${formatDate(dateRange.endDate)}`;

  return (
    <div className={`drp ${open ? 'drp--open' : ''}`} ref={ref}>
      {/* Pill trigger */}
      <button
        type="button"
        className="drp__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <CalendarDays size={15} strokeWidth={1.75} className="drp__cal-icon" />
        <span className="drp__label">{label}</span>
        <ChevronDown size={14} strokeWidth={2} className="drp__chevron" />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="drp__panel" role="dialog" aria-label="Select date range">
          {/* Quick presets */}
          <ul className="drp__presets">
            {DATE_PRESETS.map((p) => (
              <li key={p.value}>
                <button
                  type="button"
                  className="drp__preset-btn"
                  onClick={() => { setPreset(p.value); setOpen(false); }}
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Custom range */}
          <div className="drp__custom">
            <label className="drp__field">
              <span className="drp__field-label">From</span>
              <input
                type="date"
                className="drp__input"
                value={dateRange.startDate}
                max={dateRange.endDate}
                onChange={handleStartChange}
                onKeyDown={(e) => { if (e.key !== 'Tab') e.preventDefault(); }}
              />
            </label>
            <span className="drp__sep">→</span>
            <label className="drp__field">
              <span className="drp__field-label">To</span>
              <input
                type="date"
                className="drp__input"
                value={dateRange.endDate}
                min={dateRange.startDate}
                onChange={handleEndChange}
                onKeyDown={(e) => { if (e.key !== 'Tab') e.preventDefault(); }}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
