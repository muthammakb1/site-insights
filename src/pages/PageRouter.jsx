import { ExecutiveSummaryPage }      from './ExecutiveSummaryPage';
import { TrafficOverviewPage }       from './TrafficOverviewPage';
import { SearchInsightsPage }        from './SearchInsightsPage';
import { ChannelCampaignGeoPage }    from './ChannelCampaignGeoPage';
import { PlaceholderPage }           from './PlaceholderPage';

const PAGE_MAP = {
  'executive-summary':    <ExecutiveSummaryPage />,
  'traffic-overview':     <TrafficOverviewPage />,
  'funnels':              <PlaceholderPage title="Funnels" />,
  'search-insights':      <SearchInsightsPage />,
  'channel-campaign-geo': <ChannelCampaignGeoPage />,
  'calculators-tools':    <PlaceholderPage title="Calculators & Tools" />,
  'blogs-performance':    <PlaceholderPage title="Blogs Performance" />,
  'experience-health':    <PlaceholderPage title="Experience Health" />,
  'reports':              <PlaceholderPage title="Reports" />,
  'settings':             <PlaceholderPage title="Settings" />,
};

export function PageRouter({ activeId }) {
  return PAGE_MAP[activeId] ?? PAGE_MAP['executive-summary'];
}
