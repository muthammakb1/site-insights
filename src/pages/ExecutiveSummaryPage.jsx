import { LogIn, Download } from 'lucide-react';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { KpiCards } from '@features/kpiCards/KpiCards';
import { LoginDataCard } from '@components/LoginDataCard/LoginDataCard';
import { UserIntentCard } from '@components/UserIntentCard/UserIntentCard';
import './ExecutiveSummaryPage.scss';

const LOGIN_DATA = [
  { name: 'Mobile Login',  pct: 63, color: '#5B6CFF' },
  { name: 'Desktop Login', pct: 37, color: '#1CB5B2' },
];

const DOWNLOAD_DATA = [
  { name: 'Android', pct: 20, color: '#FF9F40' },
  { name: 'iOS',     pct: 80, color: '#8B5CF6' },
];

export function ExecutiveSummaryPage() {
  return (
    <>
      <ErrorBoundary fallbackMessage="KPI cards failed to load.">
        <KpiCards />
      </ErrorBoundary>

      <div className="exec-summary__row">
        <LoginDataCard
          title="Login Data"
          icon={LogIn}
          iconStyle={{ backgroundColor: '#FCE7F3', color: '#DB2777' }}
          statLabel="Total Logins"
          statValue="128K"
          chartData={LOGIN_DATA}
        />

        <LoginDataCard
          title="App Downloads"
          icon={Download}
          iconStyle={{ backgroundColor: '#EDE9FE', color: '#7C3AED' }}
          statLabel="Total Downloads"
          statValue="765K"
          chartData={DOWNLOAD_DATA}
        />
      </div>

      <div className="exec-summary__row exec-summary__row--full">
        <UserIntentCard />
      </div>
    </>
  );
}
