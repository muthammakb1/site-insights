import { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Card } from '@components/Card/Card';
import { ChartWrapper } from '@components/ChartWrapper/ChartWrapper';
import { useGetTrafficOverviewQuery, useGetTrafficTrendQuery } from '@api/adobeAnalyticsApi';
import { useDateRange } from '@hooks/useDateRange';
import { formatCompact, formatPercent, formatChange, isPositiveChange, formatDateShort } from '@utils/formatters';
import { CHART_COLORS } from '@utils/constants';
import './trafficOverview.scss';

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatTile({ label, value, previous, lowerIsBetter = false }) {
  const change = previous != null ? formatChange(value, previous) : null;
  const positive = previous != null ? isPositiveChange(value, previous, lowerIsBetter) : null;

  return (
    <div className="traffic-stat">
      <span className="traffic-stat__label">{label}</span>
      <span className="traffic-stat__value">{value}</span>
      {change && (
        <span className={`traffic-stat__change traffic-stat__change--${positive ? 'up' : 'down'}`}>
          {change}
        </span>
      )}
    </div>
  );
}

// ─── Custom tooltip for recharts ──────────────────────────────────────────────

function TrendTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__date">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="chart-tooltip__row" style={{ color: entry.color }}>
          {entry.name}: {formatCompact(entry.value)}
        </p>
      ))}
    </div>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────

export function TrafficOverview() {
  const { queryArgs } = useDateRange();

  const overviewQuery = useGetTrafficOverviewQuery(queryArgs);
  const trendQuery    = useGetTrafficTrendQuery(queryArgs);

  // Memoize transformed chart data — keeps the render body clean
  const chartData = useMemo(() => {
    if (!trendQuery.data?.rows) return [];
    return trendQuery.data.rows.map((row) => ({
      ...row,
      dateLabel: formatDateShort(row.date),
    }));
  }, [trendQuery.data]);

  const totals   = overviewQuery.data?.totals;
  const previous = overviewQuery.data?.previousPeriod;

  return (
    <section className="traffic-overview" aria-labelledby="traffic-heading" id="traffic">
      <h2 id="traffic-heading" className="section-heading">Traffic Overview</h2>

      {/* KPI tiles */}
      <div className="traffic-overview__stats">
        <ChartWrapper isLoading={overviewQuery.isLoading} isError={overviewQuery.isError} height={80}>
          {totals && (
            <>
              <StatTile label="Visits"          value={formatCompact(totals.visits)}         previous={previous?.visits} />
              <StatTile label="Pageviews"        value={formatCompact(totals.pageviews)}       previous={previous?.pageviews} />
              <StatTile label="Unique Visitors"  value={formatCompact(totals.uniqueVisitors)}  previous={previous?.uniqueVisitors} />
              <StatTile label="Bounce Rate"      value={formatPercent(totals.bounceRate)}       previous={previous?.bounceRate} lowerIsBetter />
            </>
          )}
        </ChartWrapper>
      </div>

      {/* Trend area chart */}
      <Card title="Visits & Pageviews — 30 day trend">
        <ChartWrapper isLoading={trendQuery.isLoading} isError={trendQuery.isError} height={280}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="grad-visits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="grad-pageviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={CHART_COLORS.orange} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_COLORS.orange} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-page)" vertical={false} />
              <XAxis
                dataKey="dateLabel"
                tick={{ fontSize: 11, fill: '#7B8794' }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#7B8794' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCompact}
              />
              <Tooltip content={<TrendTooltip />} />
              <Area
                type="monotone"
                dataKey="visits"
                name="Visits"
                stroke={CHART_COLORS.primary}
                strokeWidth={2}
                fill="url(#grad-visits)"
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Area
                type="monotone"
                dataKey="pageviews"
                name="Pageviews"
                stroke={CHART_COLORS.orange}
                strokeWidth={2}
                fill="url(#grad-pageviews)"
                dot={false}
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </Card>
    </section>
  );
}
