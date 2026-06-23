import { ExecutiveSummaryPage }      from './ExecutiveSummaryPage';
import { TrafficOverviewPage }       from './TrafficOverviewPage';
import { SearchInsightsPage }        from './SearchInsightsPage';
import { ChannelCampaignGeoPage }    from './ChannelCampaignGeoPage';
import { BlogsPerformancePage }      from './BlogsPerformancePage';
import { CalculatorsToolsPage }      from './CalculatorsToolsPage';
import { PlaceholderPage }           from './PlaceholderPage';

const PAGE_MAP = {
  'executive-summary':    <ExecutiveSummaryPage />,
  'traffic-overview':     <TrafficOverviewPage />,
  'funnels':              <PlaceholderPage title="Funnels" />,
  'search-insights':      <SearchInsightsPage />,
  'channel-campaign-geo': <ChannelCampaignGeoPage />,
  'calculators-tools':    <CalculatorsToolsPage />,
  'blogs-performance':    <BlogsPerformancePage />,
  'experience-health':    <PlaceholderPage title="Experience Health" />,
  'reports':              <PlaceholderPage title="Reports" />,
  'settings':             <PlaceholderPage title="Settings" />,
};

export function PageRouter({ activeId }) {
  return PAGE_MAP[activeId] ?? PAGE_MAP['executive-summary'];
}
