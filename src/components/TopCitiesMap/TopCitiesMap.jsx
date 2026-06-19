import { useState, useEffect } from 'react';
import india from '@svg-maps/india';
import './TopCitiesMap.scss';

// Calibrated equirectangular projection for the @svg-maps/india viewBox (612 × 696).
// Reference point: Andaman Islands (lon≈92.7, lat≈11.7) → SVG (537, 685).
function project(lon, lat) {
  const x = (lon - 66.8) * 19.94;
  const y = (40.8 - lat) * 21.22;
  return { x, y };
}

async function fetchCoords(cityName) {
  const q = encodeURIComponent(`${cityName}, India`);
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1`,
    { headers: { Accept: 'application/json' } }
  );
  const data = await res.json();
  if (!data.length) return null;
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

/**
 * @param {string}   title
 * @param {Array<{ rank, name, pct }>} cities
 * @param {Function} [onViewAll]
 */
export function TopCitiesMap({ title = 'Top Cities by Users', cities, onViewAll }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadMarkers() {
      const results = await Promise.all(
        cities.map(async (city) => {
          try {
            const coords = await fetchCoords(city.name);
            if (!coords) return null;
            const { x, y } = project(coords.lon, coords.lat);
            return { ...city, x, y };
          } catch {
            return null;
          }
        })
      );
      if (!cancelled) setMarkers(results.filter(Boolean));
    }

    loadMarkers();
    return () => { cancelled = true; };
  }, [cities]);

  return (
    <div className="top-cities-map">
      <div className="top-cities-map__header">
        <h2 className="top-cities-map__title">{title}</h2>
        {onViewAll && (
          <button type="button" className="top-cities-map__view-all" onClick={onViewAll}>
            View All
          </button>
        )}
      </div>

      <div className="top-cities-map__body">
        <ol className="top-cities-map__list">
          {cities.map((city) => (
            <li key={city.name} className="top-cities-map__item">
              <span
                className="top-cities-map__color-dot"
                style={{ backgroundColor: city.color }}
              />
              <span className="top-cities-map__name">{city.name}</span>
              <span className="top-cities-map__pct">{city.pct}</span>
            </li>
          ))}
        </ol>

        <div className="top-cities-map__map-wrap">
          <svg
            viewBox={india.viewBox}
            aria-label="India map with city markers"
            className="top-cities-map__svg"
          >
            {india.locations.map((loc) => (
              <path
                key={loc.id}
                d={loc.path}
                fill="#E8EEF8"
                stroke="#FFFFFF"
                strokeWidth={1.5}
              />
            ))}

            {markers.map((m) => (
              <g key={m.name}>
                <circle cx={m.x} cy={m.y} r={10} fill={m.color} opacity={0.2} />
                <circle cx={m.x} cy={m.y} r={5}  fill={m.color} />
                <text
                  x={m.x + 8}
                  y={m.y + 4}
                  className="top-cities-map__label"
                >
                  {m.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
