import { BookOpen, TrendingUp } from 'lucide-react';
import { DataTable } from '@components/DataTable/DataTable';
import './BlogsPerformancePage.scss';

const CATEGORY_BADGE = {
  'Colour Ideas':  { bg: '#FFEDD5', color: '#C2410C' },
  'Painting Tips': { bg: '#E0F2FE', color: '#0284C7' },
  'Trends':        { bg: '#DCFCE7', color: '#16A34A' },
  'Product Review':{ bg: '#EDE9FE', color: '#7C3AED' },
  'Home Care':     { bg: '#FFF1F2', color: '#E11D48' },
};

const TOP_BLOGS = [
  { rank: 1,  title: 'What is Colour Psychology in Home Painting?',           visits: '45.2K', category: 'Colour Ideas',   conversion: '3.24%' },
  { rank: 2,  title: 'Top 10 Royal Blue Colour Combinations for Your Home',   visits: '32.8K', category: 'Colour Ideas',   conversion: '2.91%' },
  { rank: 3,  title: 'How to Choose the Right Paint Finish for Your Walls',   visits: '28.6K', category: 'Painting Tips',  conversion: '2.48%' },
  { rank: 4,  title: 'Best Wall Colours for Small Rooms to Make Them Look Bigger', visits: '24.1K', category: 'Colour Ideas', conversion: '2.35%' },
  { rank: 5,  title: 'How to Paint Your Home Like a Professional',            visits: '21.7K', category: 'Painting Tips',  conversion: '2.18%' },
  { rank: 6,  title: 'Latest Exterior Paint Trends for 2024',                 visits: '18.9K', category: 'Trends',         conversion: '1.92%' },
  { rank: 7,  title: 'Why Primer is Important Before Painting Walls?',        visits: '16.4K', category: 'Painting Tips',  conversion: '1.78%' },
  { rank: 8,  title: 'Top 10 Neutral Wall Colours for a Timeless Home',       visits: '14.2K', category: 'Colour Ideas',   conversion: '1.63%' },
  { rank: 9,  title: 'Asian Paints Royale Play Range – Full Review',     visits: '12.7K', category: 'Product Review', conversion: '1.54%' },
  { rank: 10, title: 'How to Maintain Your Walls for Long-Lasting Beauty',    visits: '11.3K', category: 'Home Care',      conversion: '1.42%' },
];

const MAX_VISITS = 156200;

const TOP_CATEGORIES = [
  { id: 'colour-ideas',   name: 'Colour Ideas',    visits: '156.2K', visitCount: 156200, pct: '32.5%', conversion: '2.65%' },
  { id: 'painting-tips',  name: 'Painting Tips',   visits: '128.7K', visitCount: 128700, pct: '26.8%', conversion: '2.31%' },
  { id: 'trends',         name: 'Trends',          visits: '68.4K',  visitCount: 68400,  pct: '14.2%', conversion: '2.09%' },
  { id: 'product-review', name: 'Product Review',  visits: '45.6K',  visitCount: 45600,  pct: '9.5%',  conversion: '1.88%' },
  { id: 'home-decor',     name: 'Home Decor',      visits: '30.7K',  visitCount: 30700,  pct: '6.4%',  conversion: '1.76%' },
  { id: 'home-care',      name: 'Home Care',       visits: '18.9K',  visitCount: 18900,  pct: '3.9%',  conversion: '1.62%' },
  { id: 'sustainability', name: 'Sustainability',  visits: '12.8K',  visitCount: 12800,  pct: '2.7%',  conversion: '1.48%' },
  { id: 'diy-ideas',      name: 'DIY Ideas',       visits: '9.3K',   visitCount: 9300,   pct: '1.9%',  conversion: '1.39%' },
  { id: 'expert-advice',  name: 'Expert Advice',   visits: '7.1K',   visitCount: 7100,   pct: '1.5%',  conversion: '1.31%' },
  { id: 'offers-updates', name: 'Offers & Updates',visits: '5.2K',   visitCount: 5200,   pct: '1.1%',  conversion: '1.24%' },
];

const BLOGS_COLUMNS = [
  {
    key: 'rank',
    label: '#',
    render: (val) => <span className="blogs-page__rank">{val}</span>,
  },
  {
    key: 'title',
    label: 'Title',
    render: (val) => (
      <span className="blogs-page__title-cell" title={val}>{val}</span>
    ),
  },
  { key: 'visits',     label: 'Visits' },
  {
    key: 'category',
    label: 'Categories',
    render: (val) => {
      const s = CATEGORY_BADGE[val] || {};
      return (
        <span className="blogs-page__badge" style={{ background: s.bg, color: s.color }}>
          {val}
        </span>
      );
    },
  },
  { key: 'conversion', label: 'Conversion' },
];

const CATEGORY_COLUMNS = [
  {
    key: 'name',
    label: 'Category',
    render: (val) => <span className="blogs-page__cat-name-text">{val}</span>,
  },
  { key: 'visits', label: 'Visits' },
  {
    key: 'pct',
    label: '% of Total',
    render: (val, row) => (
      <span className="blogs-page__bar-cell">
        <span
          className="blogs-page__bar"
          style={{ width: `${(row.visitCount / MAX_VISITS) * 80}px` }}
        />
        <span className="blogs-page__bar-label">{val}</span>
      </span>
    ),
  },
  { key: 'conversion', label: 'Conversion' },
];

export function BlogsPerformancePage() {
  return (
    <div className="blogs-page">
      <div className="blogs-page__section">
        <div className="blogs-page__header">
          <span className="blogs-page__icon-wrap" style={{ background: '#CCEFEE', color: '#1CB5B2' }}>
            <BookOpen size={13} strokeWidth={1.75} />
          </span>
          <h2 className="blogs-page__title">Top 10 Blogs</h2>
        </div>
        <DataTable columns={BLOGS_COLUMNS} rows={TOP_BLOGS} rowKey="rank" />
      </div>

      <div className="blogs-page__section blogs-page__section--categories">
        <div className="blogs-page__header">
          <span className="blogs-page__icon-wrap" style={{ background: '#DCFCE7', color: '#16A34A' }}>
            <TrendingUp size={13} strokeWidth={1.75} />
          </span>
          <h2 className="blogs-page__title">Top 10 Blog Categories</h2>
        </div>
        <DataTable columns={CATEGORY_COLUMNS} rows={TOP_CATEGORIES} rowKey="id" />

      </div>
    </div>
  );
}
