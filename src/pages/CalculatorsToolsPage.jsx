import { Info, FileText, LayoutList, Route } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';
import { TopPagesTable } from '@components/TopPagesTable/TopPagesTable';
import './CalculatorsToolsPage.scss';

const TOP_FORMS = [
  { name: 'Dealer Enquiry Form',        submissions: '2,568' },
  { name: 'Colour Consultation Form',   submissions: '2,142' },
  { name: 'Painting Service Enquiry',   submissions: '1,784' },
  { name: 'Product Feedback Form',      submissions: '1,265' },
  { name: 'Bulk Order Enquiry',         submissions: '987'   },
  { name: 'Store Locator Form',         submissions: '862'   },
  { name: 'Contact Us Form',            submissions: '714'   },
  { name: 'Professional Painter Form',  submissions: '598'   },
  { name: 'Wall Painting Enquiry',      submissions: '512'   },
  { name: 'Warranty Registration Form', submissions: '438'   },
];

const TOP_PAGES = [
  { page: '/dealer-enquiry',        submissions: '2,568' },
  { page: '/colour-consultation',   submissions: '2,142' },
  { page: '/painting-services',     submissions: '1,784' },
  { page: '/product-feedback',      submissions: '1,265' },
  { page: '/bulk-order-enquiry',    submissions: '987'   },
  { page: '/store-locator',         submissions: '862'   },
  { page: '/contact-us',            submissions: '714'   },
  { page: '/professional-painter',  submissions: '598'   },
  { page: '/wall-painting',         submissions: '512'   },
  { page: '/warranty-registration', submissions: '438'   },
];

const JOURNEY_DATA = [
  { name: 'Safe Painting Service', pct: 32 },
  { name: 'Colour Catalogue',      pct: 26 },
  { name: 'Paint Calculator',      pct: 18 },
  { name: 'Store Locator',         pct: 12 },
  { name: 'Visual Search',         pct: 8  },
  { name: 'Others',                pct: 5  },
];

const MAX_PCT = Math.max(...JOURNEY_DATA.map((d) => d.pct));

const MINI_FORM_TRAFFIC = [
  { name: 'PBC', pct: 63, color: '#818CF8' },
  { name: 'WBC', pct: 37, color: '#2DD4BF' },
];

const RADIAN = Math.PI / 180;
function SliceLabel({ cx, cy, midAngle, innerRadius, outerRadius, value }) {
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={9} fontWeight={700}>
      {value}%
    </text>
  );
}

const FORM_COLUMNS = [
  { key: 'name',        label: 'Form Name'        },
  { key: 'submissions', label: 'Form Submissions' },
];

const PAGE_COLUMNS = [
  { key: 'page',        label: 'Page Name'        },
  { key: 'submissions', label: 'Form Submissions' },
];

export function CalculatorsToolsPage() {
  return (
    <div className="calc-page">
      <TopPagesTable
        title="Top Performing Forms"
        Icon={FileText}
        iconBg="#DCFCE7"
        iconColor="#16A34A"
        columns={FORM_COLUMNS}
        rows={TOP_FORMS}
        rowKey="name"
      />
      <TopPagesTable
        title="Top 10 Pages with Form Submission"
        Icon={LayoutList}
        iconBg="#FEF3C7"
        iconColor="#D97706"
        columns={PAGE_COLUMNS}
        rows={TOP_PAGES}
        rowKey="page"
      />

      <div className="conv-journey">
        <div className="conv-journey__header">
          <span className="conv-journey__icon-wrap" aria-hidden="true">
            <Route size={13} strokeWidth={1.75} />
          </span>
          <h2 className="conv-journey__title">Conversion Contribution by Journey</h2>
          <Info size={15} className="conv-journey__info-icon" />
        </div>

        <ul className="conv-journey__list">
          {JOURNEY_DATA.map((row, i) => (
            <li key={row.name} className="conv-journey__row">
              <span className="conv-journey__name">{row.name}</span>
              <div className="conv-journey__bar-track">
                <div
                  className="conv-journey__bar"
                  style={{
                    width: `${(row.pct / MAX_PCT) * 100}%`,
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              </div>
              <span className="conv-journey__pct">{row.pct}%</span>
            </li>
          ))}
        </ul>

        <div className="conv-journey__footer">
          <span className="conv-journey__footer-label">Total Leads</span>
          <span className="conv-journey__footer-value">62,000</span>
        </div>
      </div>

      <div className="mini-forms-traffic">
        <div className="mini-forms-traffic__header">
          <h2 className="mini-forms-traffic__title">Traffic on mini forms</h2>
          <Info size={15} className="mini-forms-traffic__info-icon" />
        </div>

        <div className="mini-forms-traffic__body">
          <PieChart width={140} height={140}>
            <Pie
              data={MINI_FORM_TRAFFIC}
              dataKey="pct"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={65}
              startAngle={90}
              endAngle={-270}
              labelLine={false}
              label={SliceLabel}
            >
              {MINI_FORM_TRAFFIC.map((item) => (
                <Cell key={item.name} fill={item.color} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
          </PieChart>

          <ul className="mini-forms-traffic__legend">
            {MINI_FORM_TRAFFIC.map((item) => (
              <li key={item.name} className="mini-forms-traffic__legend-item">
                <span className="mini-forms-traffic__dot" style={{ backgroundColor: item.color }} />
                <span className="mini-forms-traffic__legend-name">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mini-forms-traffic__stats">
          <div className="mini-forms-traffic__stat">
            <span className="mini-forms-traffic__stat-label">WBC</span>
            <span className="mini-forms-traffic__stat-value">64,180</span>
          </div>
          <div className="mini-forms-traffic__stat-divider" />
          <div className="mini-forms-traffic__stat">
            <span className="mini-forms-traffic__stat-label">PBC</span>
            <span className="mini-forms-traffic__stat-value">37,820</span>
          </div>
        </div>
      </div>
    </div>
  );
}
