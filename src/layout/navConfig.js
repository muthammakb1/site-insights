import {
  LayoutDashboard,
  BarChart3,
  Search,
  Network,
  Calculator,
  Newspaper,
  Settings,
  LogOut,
} from 'lucide-react';

export const NAV_ITEMS = [
  {
    id:       'executive-summary',
    label:    'Executive Summary',
    Icon:     LayoutDashboard,
    title:    'Executive Summary',
    subtitle: 'Overview of your website performance',
  },
  {
    id:       'traffic-overview',
    label:    'Traffic Overview',
    Icon:     BarChart3,
    title:    'Traffic Overview',
    subtitle: 'Understand your website traffic performance',
  },
  {
    id:       'search-insights',
    label:    'Search Insights',
    Icon:     Search,
    title:    'Search Insights',
    subtitle: 'Explore organic and paid search performance',
  },
  {
    id:       'channel-campaign-geo',
    label:    'Channel, Campaign & GEO',
    Icon:     Network,
    title:    'Channel, Campaign & GEO',
    subtitle: 'Break down traffic by channel, campaign and geography',
  },
  {
    id:       'calculators-tools',
    label:    'Calculators & Tools',
    Icon:     Calculator,
    title:    'Calculators & Tools',
    subtitle: 'Marketing and analytics calculation utilities',
  },
  {
    id:       'blogs-performance',
    label:    'Blogs Performance',
    Icon:     Newspaper,
    title:    'Blogs Performance',
    subtitle: 'Track engagement and reach across blog content',
  },
  {
    id:       'settings',
    label:    'Settings',
    Icon:     Settings,
    title:    'Settings',
    subtitle: 'Manage your dashboard preferences',
  },
];

export const LOGOUT_ITEM = { id: 'logout', label: 'Logout', Icon: LogOut };
