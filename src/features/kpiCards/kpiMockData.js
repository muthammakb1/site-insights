// 20-point sparkline trends — varied shapes so each card looks distinct
function trend(base, variance, length = 20) {
  return Array.from({ length }, (_, i) => ({
    i,
    v: Math.max(0, base + (Math.random() - 0.5) * variance * 2),
  }));
}

export const KPI_DATA = [
  {
    id:      'visits',
    label:   'Visits',
    value:   '4.2M',
    trend:   trend(420, 80),
  },
  {
    id:      'unique-visitors',
    label:   'Unique Visitors',
    value:   '3.1M',
    trend:   trend(310, 60),
  },
  {
    id:      'leads',
    label:   'Leads',
    value:   '62K',
    trend:   trend(62, 20),
  },
  {
    id:      'conversion-rate',
    label:   'Conversion Rate',
    value:   '1.48%',
    trend:   trend(1.48, 0.4),
  },
  {
    id:      'bounce-rate',
    label:   'Bounce Rate',
    value:   '32%',
    trend:   trend(32, 6),
  },
  {
    id:      'avg-engagement',
    label:   'Avg. Engagement Time',
    value:   '03:24',
    trend:   trend(204, 40),
  },
];
