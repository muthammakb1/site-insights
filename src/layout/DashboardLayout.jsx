import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { PageRouter } from '../pages/PageRouter';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { NAV_ITEMS } from './navConfig';
import './DashboardLayout.scss';

export function DashboardLayout() {
  const [activeId,  setActiveId]  = useState('executive-summary');
  const [collapsed, setCollapsed] = useState(false);

  const activePage = NAV_ITEMS.find((item) => item.id === activeId) ?? NAV_ITEMS[0];

  return (
    <div className={`dashboard-layout${collapsed ? ' dashboard-layout--sidebar-collapsed' : ''}`}>
      <Sidebar
        activeId={activeId}
        onNavChange={setActiveId}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
      />
      <div className="dashboard-layout__main">
        <Header title={activePage.title} subtitle={activePage.subtitle} />
        <main className="dashboard-layout__content">
<ErrorBoundary fallbackMessage="Page failed to load.">
            <PageRouter activeId={activeId} />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
