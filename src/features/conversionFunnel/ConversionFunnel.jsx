import { useMemo } from 'react';
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip,
} from 'recharts';
import { Card } from '@components/Card/Card';
import { ChartWrapper } from '@components/ChartWrapper/ChartWrapper';
import { useGetConversionFunnelQuery, useGetConversionRateQuery } from '@api/adobeAnalyticsApi';
import { useDateRange } from '@hooks/useDateRange';
import { formatCompact, formatCurrency, formatPercent } from '@utils/formatters';
import { CHART_SERIES_COLORS } from '@utils/constants';
import './conversionFunnel.scss';

export function ConversionFunnel() {
  const { queryArgs } = useDateRange();

  const funnelQuery = useGetConversionFunnelQuery(queryArgs);
  const rateQuery   = useGetConversionRateQuery(queryArgs);

  const funnelData = useMemo(() => {
    if (!funnelQuery.data?.steps) return [];
    return funnelQuery.data.steps.map((step, i) => ({
      name:  step.label,
      value: step.value,
      fill:  CHART_SERIES_COLORS[i % CHART_SERIES_COLORS.length],
    }));
  }, [funnelQuery.data]);

  const kpis = rateQuery.data?.totals;

  return (
    <section className="conversion-funnel" aria-labelledby="conversion-heading" id="conversion">
      <h2 id="conversion-heading" className="section-heading">Conversion Funnel</h2>

      {kpis && (
        <div className="conversion-funnel__kpis">
          <div className="conversion-kpi">
            <span className="conversion-kpi__label">Conversion Rate</span>
            <span className="conversion-kpi__value">{formatPercent(kpis.conversionRate)}</span>
          </div>
          <div className="conversion-kpi">
            <span className="conversion-kpi__label">Orders</span>
            <span className="conversion-kpi__value">{formatCompact(kpis.orders)}</span>
          </div>
          <div className="conversion-kpi">
            <span className="conversion-kpi__label">Revenue</span>
            <span className="conversion-kpi__value">{formatCurrency(kpis.revenue)}</span>
          </div>
          <div className="conversion-kpi">
            <span className="conversion-kpi__label">Avg. Order Value</span>
            <span className="conversion-kpi__value">{formatCurrency(kpis.averageOrderValue)}</span>
          </div>
        </div>
      )}

      <Card title="Purchase funnel">
        <ChartWrapper isLoading={funnelQuery.isLoading} isError={funnelQuery.isError} height={280}>
          <ResponsiveContainer width="100%" height={280}>
            <FunnelChart>
              <Tooltip formatter={(v) => formatCompact(v)} />
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                <LabelList position="right" fill="var(--color-text-secondary)" fontSize={12} />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </Card>
    </section>
  );
}
