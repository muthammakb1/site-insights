import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import './SearchesTrendChart.scss';

// Weekly data points across 3 months — 4 points per month
const TREND_DATA = [
  { w: 0,  searches: 45200 },
  { w: 1,  searches: 49800 },
  { w: 2,  searches: 47600 },
  { w: 3,  searches: 52400 },
  { w: 4,  searches: 58100 },
  { w: 5,  searches: 63400 },
  { w: 6,  searches: 60200 },
  { w: 7,  searches: 67800 },
  { w: 8,  searches: 71200 },
  { w: 9,  searches: 68400 },
  { w: 10, searches: 73900 },
  { w: 11, searches: 69500 },
];

const MONTH_LABELS   = { 0: 'Apr', 4: 'May', 8: 'Jun' };
// Apr → rose-red, May → amber-gold, Jun → emerald-green — vivid and distinct
const MONTH_COLORS = ['#F43F5E', '#F59E0B', '#10B981'];

const LEGEND_ITEMS = [
  { label: 'Apr 2024', color: '#F43F5E' },
  { label: 'May 2024', color: '#F59E0B' },
  { label: 'Jun 2024', color: '#10B981' },
];

function formatK(v) {
  return v >= 1000 ? `${Math.round(v / 1000)}K` : String(v);
}

function CustomDot({ cx, cy, index }) {
  const isMonthStart = index % 4 === 0;

  if (isMonthStart) {
    const color = MONTH_COLORS[Math.floor(index / 4)];
    return (
      <g key={`dot-${index}`}>
        {/* outer halo ring */}
        <circle cx={cx} cy={cy} r={10} fill={color} fillOpacity={0.18} />
        {/* solid dot */}
        <circle cx={cx} cy={cy} r={5} fill={color} stroke="#fff" strokeWidth={2} />
      </g>
    );
  }

  return (
    <circle
      key={`dot-${index}`}
      cx={cx}
      cy={cy}
      r={3}
      fill="#8B5CF6"
      stroke="#fff"
      strokeWidth={1.5}
    />
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const month = MONTH_LABELS[label];
  return (
    <div className="searches-trend__tooltip">
      {month && <p className="searches-trend__tooltip-month">{month}</p>}
      <p className="searches-trend__tooltip-val">
        {payload[0].value.toLocaleString()} searches
      </p>
    </div>
  );
}

export function SearchesTrendChart() {
  return (
    <div className="searches-trend">
      <div className="searches-trend__header">
        <h2 className="searches-trend__title">Searches Over Time</h2>
        <div className="searches-trend__legend">
          {LEGEND_ITEMS.map(({ label, color }) => (
            <span key={label} className="searches-trend__legend-item">
              <span className="searches-trend__legend-line" style={{ '--dot-color': color }} />
              <span className="searches-trend__legend-label">{label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="searches-trend__chart-area">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={TREND_DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="searchAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#A5B4FC" stopOpacity={0.5}  />
              <stop offset="60%"  stopColor="#C4B5FD" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#E0E7FF" stopOpacity={0}    />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#E9EDF3" vertical={false} />

          <XAxis
            dataKey="w"
            type="number"
            domain={[0, 11]}
            ticks={[0, 4, 8]}
            tickFormatter={(v) => MONTH_LABELS[v] ?? ''}
            tick={{ fontSize: 9, fill: '#7B8794' }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            width={32}
            tick={{ fontSize: 9, fill: '#7B8794' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatK}
          />

          <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#E9EDF3', strokeWidth: 1 }} />

          <Area
            type="monotone"
            dataKey="searches"
            stroke="#7C3AED"
            strokeWidth={2.5}
            fill="url(#searchAreaGrad)"
            dot={<CustomDot />}
            activeDot={{ r: 6, fill: '#FF5BA6', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
