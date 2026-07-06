import {
  Users,
  User,
  Target,
  ChartNoAxesCombined,
  RefreshCcw,
  Clock3,
} from 'lucide-react';
import sparklineImg from '@assets/images/sparkline.svg';
import { useGetTrafficOverviewQuery } from '@api/adobeAnalyticsApi';
import { useDateRange } from '@hooks/useDateRange';
import { formatCompact } from '@utils/formatters';
import { KPI_DATA } from './kpiMockData';
import './kpiCards.scss';

const ICON_MAP = {
  'visits':          Users,
  'unique-visitors': User,
  'leads':           Target,
  'conversion-rate': ChartNoAxesCombined,
  'bounce-rate':     RefreshCcw,
  'avg-engagement':  Clock3,
};

const ICON_COLORS = {
  'visits':             { bg: '#FFFBEB', color: '#D97706' },
  'unique-visitors':    { bg: '#ECFDF5', color: '#059669' },
  'new-visitors':       { bg: '#F7FEE7', color: '#65A30D' },
  'returning-visitors': { bg: '#EDE9FE', color: '#7C3AED' },
  'pages-per-session':  { bg: '#FCE7F3', color: '#DB2777' },
  'leads':              { bg: '#FFF7ED', color: '#EA580C' },
  'conversion-rate':    { bg: '#F0FDFA', color: '#0D9488' },
  'bounce-rate':        { bg: '#FFF1F2', color: '#E11D48' },
  'avg-engagement':     { bg: '#FDF4FF', color: '#A21CAF' },
  'total-searches':         { bg: '#EFF6FF', color: '#2563EB' },
  'search-start':           { bg: '#FFF7ED', color: '#EA580C' },
  'search-conversion-rate': { bg: '#ECFDF5', color: '#059669' },
  'no-search-result':       { bg: '#FFF1F2', color: '#E11D48' },
  'search-users':           { bg: '#FFFBEB', color: '#D97706' },
};

export function KpiCard({ id, label, value, Icon: IconProp }) {
  const Icon = IconProp ?? ICON_MAP[id];
  const iconStyle = ICON_COLORS[id] ?? {};

  return (
    <div className="kpi-card" data-id={id}>
      <div className="kpi-card__header">
        <span className="kpi-card__icon-wrap" aria-hidden="true" style={{ backgroundColor: iconStyle.bg, color: iconStyle.color }}>
          <Icon size={16} strokeWidth={1.75} />
        </span>
        <span className="kpi-card__label">{label}</span>
      </div>

      <p className="kpi-card__value">{value}</p>

      <div className="kpi-card__spark" aria-hidden="true">
        <img src={sparklineImg} alt="" />
      </div>
    </div>
  );
}

export function KpiCards() {
  const { queryArgs } = useDateRange();
  const { data } = useGetTrafficOverviewQuery(queryArgs);

  return (
    <section className="kpi-cards" aria-label="Key performance indicators">
      {KPI_DATA.map((kpi) => {
        const value = kpi.id === 'visits'
          ? (data?.visits != null ? formatCompact(data.visits) : '--')
          : kpi.value;
        return <KpiCard key={kpi.id} {...kpi} value={value} />;
      })}
    </section>
  );
}
