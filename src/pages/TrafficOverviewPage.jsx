import { Users, User, UserRoundPlus, RefreshCcw, FileText, Clock3, Globe } from 'lucide-react';
import { KpiCard } from '@features/kpiCards/KpiCards';
import { DonutChartCard } from '@components/DonutChartCard/DonutChartCard';
import { TopPagesTable } from '@components/TopPagesTable/TopPagesTable';
import { TopCitiesMap } from '@components/TopCitiesMap/TopCitiesMap';
import '@features/kpiCards/kpiCards.scss';
import './TrafficOverviewPage.scss';

const TRAFFIC_KPIS = [
  { id: 'visits',             label: 'Visits',             value: '4.2M',  Icon: Users      },
  { id: 'unique-visitors',    label: 'Unique Visitors',    value: '3.1M',  Icon: User       },
  { id: 'new-visitors',       label: 'New Visitors',       value: '72%',   Icon: UserRoundPlus },
  { id: 'returning-visitors', label: 'Returning Visitors', value: '28%',   Icon: RefreshCcw },
  { id: 'pages-per-session',  label: 'Pages / Session',    value: '2.45',  Icon: FileText   },
  { id: 'bounce-rate',        label: 'Bounce Rate',        value: '32%',   Icon: Clock3     },
];

const CHANNEL_DATA = [
  { name: 'Organic Search', pct: 41, visits: '1.7M', color: '#6C63FF' },
  { name: 'Direct',         pct: 26, visits: '1.1M', color: '#FF5BA6' },
  { name: 'Paid Search',    pct: 17, visits: '720K', color: '#FF9F40' },
  { name: 'Social',         pct: 9,  visits: '360K', color: '#1CB5B2' },
  { name: 'Referral',       pct: 6,  visits: '240K', color: '#34C759' },
];

const DEVICE_DATA = [
  { name: 'Mobile',  pct: 69, visits: '2.9M', color: '#6C63FF' },
  { name: 'Desktop', pct: 23, visits: '1.0M', color: '#1CB5B2' },
  { name: 'Tablet',  pct: 8,  visits: '320K', color: '#4B5563' },
];

const TOP_CITIES = [
  { rank: 1,  name: 'Mumbai',    pct: '10.2%', color: '#6C63FF' },
  { rank: 2,  name: 'Bengaluru', pct: '8.9%',  color: '#FF5BA6' },
  { rank: 3,  name: 'Delhi',     pct: '7.6%',  color: '#FF9F40' },
  { rank: 4,  name: 'Pune',      pct: '5.7%',  color: '#1CB5B2' },
  { rank: 5,  name: 'Hyderabad', pct: '5.1%',  color: '#34C759' },
  { rank: 6,  name: 'Chennai',   pct: '4.3%',  color: '#8B5CF6' },
  { rank: 7,  name: 'Kolkata',   pct: '3.8%',  color: '#3B82F6' },
  { rank: 8,  name: 'Ahmedabad', pct: '3.2%',  color: '#F59E0B' },
  { rank: 9,  name: 'Jaipur',    pct: '2.9%',  color: '#10B981' },
  { rank: 10, name: 'Surat',     pct: '2.4%',  color: '#EC4899' },
];

const TOP_PAGES_ROWS = [
  { page: '/',                       visits: '650K', pct: '14.8%', bounceRate: '32%' },
  { page: '/colour-catalogue',       visits: '550K', pct: '12.4%', bounceRate: '28%' },
  { page: '/safe-painting-service',  visits: '430K', pct: '10.0%', bounceRate: '29%' },
  { page: '/products',               visits: '340K', pct: '8.4%',  bounceRate: '27%' },
  { page: '/paint-calculator',       visits: '280K', pct: '6.7%',  bounceRate: '31%' },
  { page: '/find-a-dealer',          visits: '210K', pct: '5.2%',  bounceRate: '35%' },
  { page: '/about-us',               visits: '180K', pct: '4.4%',  bounceRate: '40%' },
  { page: '/careers',                visits: '145K', pct: '3.6%',  bounceRate: '38%' },
  { page: '/contact-us',             visits: '120K', pct: '2.9%',  bounceRate: '42%' },
  { page: '/blog',                   visits: '98K',  pct: '2.4%',  bounceRate: '45%' },
];

const TOP_PAGES_COLUMNS = [
  { key: 'page',        label: 'Landing Page' },
  { key: 'visits',      label: 'Visits' },
  { key: 'pct',         label: '% of Total' },
  { key: 'bounceRate',  label: 'Bounce Rate' },
];

export function TrafficOverviewPage() {
  return (
    <>
      <section className="kpi-cards" aria-label="Traffic overview metrics">
        {TRAFFIC_KPIS.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </section>
      <div className="traffic-overview__charts">
        <DonutChartCard title="Traffic by Channel" data={CHANNEL_DATA} />
        <DonutChartCard title="Traffic by Device"  data={DEVICE_DATA}  />
      </div>
      <div className="traffic-overview__bottom">
        <TopPagesTable
          title="Top Landing Pages"
          Icon={Globe}
          iconBg="#F0FDFA"
          iconColor="#0D9488"
          columns={TOP_PAGES_COLUMNS}
          rows={TOP_PAGES_ROWS}
          rowKey="page"
        />
        <TopCitiesMap
          title="Top Cities by Users"
          cities={TOP_CITIES}
        />
      </div>
    </>
  );
}
