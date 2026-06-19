import { Info } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import './DonutChartCard.scss';

const RADIAN = Math.PI / 180;

function SliceLabel({ cx, cy, midAngle, innerRadius, outerRadius, value }) {
  // Skip label if slice is too narrow to fit text without touching edges
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

export function DonutChartCard({ title, data }) {
  return (
    <div className="donut-chart-card">
      <div className="donut-chart-card__title-row">
        <h2 className="donut-chart-card__title">{title}</h2>
        <Info size={15} className="donut-chart-card__info-icon" />
      </div>

      <div className="donut-chart-card__body">
        <div className="donut-chart-card__chart-wrap">
          <PieChart width={130} height={130}>
            <Pie
              data={data}
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
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>
        </div>

        <ul className="donut-chart-card__legend">
          {data.map((item) => (
            <li key={item.name} className="donut-chart-card__legend-item">
              <span
                className="donut-chart-card__legend-dot"
                style={{ backgroundColor: item.color }}
              />
              <span className="donut-chart-card__legend-name">{item.name}</span>
              <span className="donut-chart-card__legend-stat">
                {item.pct}%{' '}
                <span className="donut-chart-card__legend-visits">({item.visits})</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
