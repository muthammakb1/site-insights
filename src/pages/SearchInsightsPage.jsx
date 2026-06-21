import { Search, MousePointerClick, TrendingUp, SearchX, Users, Hash } from 'lucide-react';
import { KpiCard } from '@features/kpiCards/KpiCards';
import { TopPagesTable } from '@components/TopPagesTable/TopPagesTable';
import { SearchesTrendChart } from '@components/SearchesTrendChart/SearchesTrendChart';
import '@features/kpiCards/kpiCards.scss';
import './SearchInsightsPage.scss';

const SEARCH_KPIS = [
  { id: 'total-searches',         label: 'Total Searches',           value: '1.8M',  Icon: Search            },
  { id: 'search-start',           label: 'Search Start',             value: '2.4M',  Icon: MousePointerClick },
  { id: 'search-conversion-rate', label: 'Search to Conversion Rate', value: '14.3%', Icon: TrendingUp        },
  { id: 'no-search-result',       label: 'No Search Result',         value: '8.7%',  Icon: SearchX           },
  { id: 'search-users',           label: 'Search Users',             value: '920K',  Icon: Users             },
];

const KEYWORD_COLUMNS = [
  { key: 'term',  label: 'Search Term'  },
  { key: 'count', label: 'Search Count' },
];

const AUTO_SUGGEST_COLUMNS = [
  { key: 'card',   label: 'Clicked Card'  },
  { key: 'clicks', label: 'No of Clicks'  },
];

const AUTO_SUGGEST_ROWS = [
  { card: 'Royale Luxury Emulsion',   clicks: '28,400' },
  { card: 'Ace Exterior Emulsion',    clicks: '21,700' },
  { card: 'SmartCare Waterproofing',  clicks: '17,300' },
  { card: 'Wood Finish Melamine',     clicks: '13,900' },
  { card: 'Colour Catalogue 2024',    clicks: '9,600'  },
];

const KEYWORD_ROWS = [
  { term: 'exterior wall paint',        count: '124,500' },
  { term: 'interior paint colours',     count: '98,200'  },
  { term: 'waterproof paint',           count: '87,600'  },
  { term: 'wood finish',                count: '74,300'  },
  { term: 'paint price per litre',      count: '65,800'  },
  { term: 'texture paint design',       count: '54,100'  },
  { term: 'anti-fungal paint',          count: '43,700'  },
  { term: 'colour catalogue',           count: '38,900'  },
  { term: 'paint calculator',           count: '31,200'  },
  { term: 'royale luxury emulsion',     count: '24,600'  },
];

export function SearchInsightsPage() {
  return (
    <>
      <section
        className="kpi-cards"
        aria-label="Search insights metrics"
        style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}
      >
        {SEARCH_KPIS.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </section>

      <div className="search-insights__tables">
        <TopPagesTable
          title="Top Search Keywords"
          Icon={Hash}
          iconBg="#FFFBEB"
          iconColor="#D97706"
          columns={KEYWORD_COLUMNS}
          rows={KEYWORD_ROWS}
          rowKey="term"
        />
        <SearchesTrendChart />
        <TopPagesTable
          title="Top 5 Clicks on Auto Suggest"
          Icon={MousePointerClick}
          iconBg="#FFF1F2"
          iconColor="#E11D48"
          columns={AUTO_SUGGEST_COLUMNS}
          rows={AUTO_SUGGEST_ROWS}
          rowKey="card"
        />
      </div>
    </>
  );
}
