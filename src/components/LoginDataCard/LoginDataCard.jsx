import { Info } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import './LoginDataCard.scss';

const RADIAN = Math.PI / 180;

function SliceLabel({ cx, cy, midAngle, innerRadius, outerRadius, value }) {
  if (value < 12) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={9}
      fontWeight={700}
    >
      {value}%
    </text>
  );
}

export function LoginDataCard({ title, icon: Icon, iconStyle, statLabel, statValue, chartTitle, chartData }) {
  return (
    <div className="login-data-card">
      <div className="login-data-card__title-row">
        <span className="login-data-card__icon-wrap" aria-hidden="true" style={iconStyle}>
          <Icon size={14} strokeWidth={1.75} />
        </span>
        <h2 className="login-data-card__title">{title}</h2>
        <Info size={15} className="login-data-card__info-icon" />
      </div>

      <div className="login-data-card__body">
        <div className="login-data-card__stat">
          <p className="login-data-card__stat-label">{statLabel}</p>
          <p className="login-data-card__stat-value">{statValue}</p>
        </div>

        <div className="login-data-card__chart-section">
          {chartTitle && <p className="login-data-card__chart-title">{chartTitle}</p>}
          <div className="login-data-card__chart-body">
            <div className="login-data-card__chart-wrap">
              <PieChart width={130} height={130}>
                <Pie
                  data={chartData}
                  dataKey="pct"
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={62}
                  startAngle={90}
                  endAngle={-270}
                  labelLine={false}
                  label={SliceLabel}
                >
                  {chartData.map((item) => (
                    <Cell key={item.name} fill={item.color} stroke="#fff" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </div>

            <ul className="login-data-card__legend">
              {chartData.map((item) => (
                <li key={item.name} className="login-data-card__legend-item">
                  <span
                    className="login-data-card__legend-dot"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="login-data-card__legend-name">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
