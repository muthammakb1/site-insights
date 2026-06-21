import { Activity, Target } from 'lucide-react';
import { TopPagesTable } from '@components/TopPagesTable/TopPagesTable';
import { AiTrafficCard } from '@components/AiTrafficCard/AiTrafficCard';
import './ChannelCampaignGeoPage.scss';

const PERF_COLUMNS = [
  { key: 'channel',        label: 'Channel'         },
  { key: 'visits',         label: 'Visits'          },
  { key: 'bounce',         label: 'Bounce'          },
  { key: 'leads',          label: 'Leads'           },
  { key: 'conversionRate', label: 'Conversion Rate' },
];

const CHANNEL_PERF_ROWS = [
  { channel: 'Organic Search', visits: '1.2M',  bounce: '38%', leads: '28,400', conversionRate: '2.4%' },
  { channel: 'Direct',         visits: '850K',  bounce: '32%', leads: '19,700', conversionRate: '2.3%' },
  { channel: 'Paid Search',    visits: '620K',  bounce: '45%', leads: '15,300', conversionRate: '2.5%' },
  { channel: 'Social',         visits: '430K',  bounce: '52%', leads: '8,900',  conversionRate: '2.1%' },
  { channel: 'Referral',       visits: '290K',  bounce: '41%', leads: '6,200',  conversionRate: '2.1%' },
  { channel: 'Email',          visits: '180K',  bounce: '29%', leads: '5,800',  conversionRate: '3.2%' },
  { channel: 'Display',        visits: '120K',  bounce: '61%', leads: '2,100',  conversionRate: '1.8%' },
];

const CAMPAIGN_COLUMNS = [
  { key: 'campaign',       label: 'Campaign'        },
  { key: 'visits',         label: 'Visits'          },
  { key: 'bounce',         label: 'Bounce'          },
  { key: 'leads',          label: 'Leads'           },
  { key: 'conversionRate', label: 'Conversion Rate' },
];

const TOP_CAMPAIGNS_ROWS = [
  { campaign: 'Royale Luxury — Brand',   visits: '420K', bounce: '31%', leads: '10,200', conversionRate: '2.4%' },
  { campaign: 'Exterior Paint — Search', visits: '310K', bounce: '44%', leads: '7,800',  conversionRate: '2.5%' },
  { campaign: 'Monsoon Waterproof',      visits: '245K', bounce: '48%', leads: '5,600',  conversionRate: '2.3%' },
  { campaign: 'Wood Finish Promo',       visits: '198K', bounce: '39%', leads: '4,400',  conversionRate: '2.2%' },
  { campaign: 'Colour Catalogue 2025',   visits: '162K', bounce: '35%', leads: '4,100',  conversionRate: '2.5%' },
  { campaign: 'SmartCare — Retargeting', visits: '134K', bounce: '42%', leads: '3,200',  conversionRate: '2.4%' },
  { campaign: 'Ace Exterior — Display',  visits: '98K',  bounce: '58%', leads: '1,700',  conversionRate: '1.7%' },
];

export function ChannelCampaignGeoPage() {
  return (
    <>
      <div className="channel-campaign-geo__tables">
        <TopPagesTable
          title="Channel Performance"
          Icon={Activity}
          iconBg="#ECFDF5"
          iconColor="#059669"
          columns={PERF_COLUMNS}
          rows={CHANNEL_PERF_ROWS}
          rowKey="channel"
        />
        <TopPagesTable
          title="Top Campaigns"
          Icon={Target}
          iconBg="#FDF4FF"
          iconColor="#A21CAF"
          columns={CAMPAIGN_COLUMNS}
          rows={TOP_CAMPAIGNS_ROWS}
          rowKey="campaign"
        />
      </div>
      <div className="channel-campaign-geo__ai-section">
        <AiTrafficCard />
      </div>
    </>
  );
}
