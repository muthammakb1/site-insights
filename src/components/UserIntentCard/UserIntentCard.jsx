import { Info } from 'lucide-react';
import './UserIntentCard.scss';

const DATA = [
  { name: 'Product Research',    traffic: 1200, forms: 18 },
  { name: 'Colour Discovery',    traffic: 980,  forms: 16 },
  { name: 'Price & Offers',      traffic: 760,  forms: 12 },
  { name: 'Store Locator',       traffic: 620,  forms: 9  },
  { name: 'Painting Services',   traffic: 410,  forms: 7  },
  { name: 'Inspiration & Ideas', traffic: 230,  forms: 5  },
  { name: 'Professional Connect',traffic: 120,  forms: 2  },
  { name: 'Others',              traffic: 90,   forms: 1  },
];

const MAX_TRAFFIC = Math.max(...DATA.map((d) => d.traffic));
const MAX_FORMS   = Math.max(...DATA.map((d) => d.forms));

function fmt(v) {
  return v >= 1000 ? `${(v / 1000).toFixed(1).replace('.0', '')}M` : `${v}K`;
}

export function UserIntentCard() {
  return (
    <div className="user-intent-card">
      <div className="user-intent-card__title-row">
        <h2 className="user-intent-card__title">User Intent Distribution</h2>
        <Info size={15} className="user-intent-card__info-icon" />
        <div className="user-intent-card__legend">
          <span className="user-intent-card__legend-item">
            <span className="user-intent-card__dot user-intent-card__dot--traffic" />
            Traffic
          </span>
          <span className="user-intent-card__legend-item">
            <span className="user-intent-card__dot user-intent-card__dot--forms" />
            Form Submissions
          </span>
        </div>
      </div>

      <ul className="user-intent-card__list">
        {DATA.map((row) => (
          <li key={row.name} className="user-intent-card__row">
            <span className="user-intent-card__name">{row.name}</span>

            <div className="user-intent-card__bars">
              <div className="user-intent-card__bar-row">
                <div className="user-intent-card__bar-track">
                  <div
                    className="user-intent-card__bar user-intent-card__bar--traffic"
                    style={{ width: `${(row.traffic / MAX_TRAFFIC) * 100}%` }}
                  />
                </div>
                <span className="user-intent-card__value">{fmt(row.traffic)}</span>
              </div>
              <div className="user-intent-card__bar-row">
                <div className="user-intent-card__bar-track">
                  <div
                    className="user-intent-card__bar user-intent-card__bar--forms"
                    style={{ width: `${(row.forms / MAX_FORMS) * 100}%` }}
                  />
                </div>
                <span className="user-intent-card__value">{fmt(row.forms)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
