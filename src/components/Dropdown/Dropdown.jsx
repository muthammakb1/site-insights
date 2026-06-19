import { useState, useRef, useEffect } from 'react';
import './Dropdown.scss';

export function Dropdown({ label, options, value, onChange }) {
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

  const selected = options.find((o) => o.value === value);

  return (
    <div className={`dropdown ${open ? 'dropdown--open' : ''}`} ref={ref}>
      <button
        type="button"
        className="dropdown__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{selected?.label ?? label}</span>
        <span className="dropdown__caret" aria-hidden="true">▾</span>
      </button>

      {open && (
        <ul className="dropdown__menu" role="listbox" aria-label={label}>
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`dropdown__item ${opt.value === value ? 'dropdown__item--active' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
