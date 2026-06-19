import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card } from '@components/Card/Card';
import { ChartWrapper } from '@components/ChartWrapper/ChartWrapper';
import { DataTable } from '@components/DataTable/DataTable';
import { useGetAudienceBreakdownQuery, useGetAudienceDevicesQuery } from '@api/adobeAnalyticsApi';
import { useDateRange } from '@hooks/useDateRange';
import { formatCompact, formatNumber } from '@utils/formatters';
import { CHART_SERIES_COLORS } from '@utils/constants';
import './audienceBreakdown.scss';

const DEVICE_COLUMNS = [
  { key: 'device',  label: 'Device' },
  { key: 'visits',  label: 'Visits',  render: (v) => formatNumber(v) },
  { key: 'share',   label: 'Share',   render: (v) => `${v}%` },
];

export function AudienceBreakdown() {
  const { queryArgs } = useDateRange();

  const countryQuery = useGetAudienceBreakdownQuery(queryArgs);
  const deviceQuery  = useGetAudienceDevicesQuery(queryArgs);

  const pieData = useMemo(() => {
    if (!countryQuery.data?.rows) return [];
    return countryQuery.data.rows.map((r) => ({ name: r.country, value: r.visits }));
  }, [countryQuery.data]);

  const deviceRows = useMemo(() => {
    if (!deviceQuery.data?.rows) return [];
    const total = deviceQuery.data.rows.reduce((s, r) => s + r.visits, 0);
    return deviceQuery.data.rows.map((r) => ({
      ...r,
      share: total ? ((r.visits / total) * 100).toFixed(1) : '—',
    }));
  }, [deviceQuery.data]);

  return (
    <section className="audience-breakdown" aria-labelledby="audience-heading" id="audience">
      <h2 id="audience-heading" className="section-heading">Audience</h2>

      <Card title="Visits by country">
        <ChartWrapper isLoading={countryQuery.isLoading} isError={countryQuery.isError} height={260}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Tooltip formatter={(v) => formatCompact(v)} />
              <Legend iconType="circle" iconSize={10} />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={55}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={CHART_SERIES_COLORS[i % CHART_SERIES_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </Card>

      <Card title="Device breakdown">
        <ChartWrapper isLoading={deviceQuery.isLoading} isError={deviceQuery.isError} height={120}>
          {deviceRows.length > 0 && (
            <DataTable columns={DEVICE_COLUMNS} rows={deviceRows} rowKey="device" caption="Device breakdown" />
          )}
        </ChartWrapper>
      </Card>
    </section>
  );
}
