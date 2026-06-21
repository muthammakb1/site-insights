import {
  Users,
  User,
  Target,
  ChartNoAxesCombined,
  RefreshCcw,
  Clock3,
} from 'lucide-react';
import sparklineImg from '@assets/images/sparkline.svg';
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
  'visits':             { bg: '#FFFBEB', color: '#D97706' }, // amber
  'unique-visitors':    { bg: '#ECFDF5', color: '#059669' }, // emerald
  'new-visitors':       { bg: '#F7FEE7', color: '#65A30D' }, // lime
  'returning-visitors': { bg: '#EDE9FE', color: '#7C3AED' }, // violet
  'pages-per-session':  { bg: '#FCE7F3', color: '#DB2777' }, // pink
  'leads':              { bg: '#FFF7ED', color: '#EA580C' }, // orange
  'conversion-rate':    { bg: '#F0FDFA', color: '#0D9488' }, // teal
  'bounce-rate':        { bg: '#FFF1F2', color: '#E11D48' }, // rose
  'avg-engagement':     { bg: '#FDF4FF', color: '#A21CAF' }, // fuchsia

  // Search Insights
  'total-searches':         { bg: '#EFF6FF', color: '#2563EB' }, // blue
  'search-start':           { bg: '#FFF7ED', color: '#EA580C' }, // orange
  'search-conversion-rate': { bg: '#ECFDF5', color: '#059669' }, // emerald
  'no-search-result':       { bg: '#FFF1F2', color: '#E11D48' }, // rose
  'search-users':           { bg: '#FFFBEB', color: '#D97706' }, // amber
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
  return (
    <section className="kpi-cards" aria-label="Key performance indicators">
      {KPI_DATA.map((kpi) => (
        <KpiCard key={kpi.id} {...kpi} />
      ))}
    </section>
  );
}
