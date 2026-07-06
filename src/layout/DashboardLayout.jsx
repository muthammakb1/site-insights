import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast, { Toaster } from 'react-hot-toast';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { PageRouter } from '../pages/PageRouter';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { NAV_ITEMS } from './navConfig';
import './DashboardLayout.scss';

export function DashboardLayout() {
  const [activeId,  setActiveId]  = useState('executive-summary');
  const [collapsed, setCollapsed] = useState(false);
  const contentRef = useRef(null);

  const activePage = NAV_ITEMS.find((item) => item.id === activeId) ?? NAV_ITEMS[0];

  async function handleDownload() {
    const element = contentRef.current;
    if (!element) return;

    // Expand overflow-clipped containers so html2canvas captures full content
    function expandScrollables() {
      const saved = [];
      element.querySelectorAll('*').forEach((el) => {
        const computed = window.getComputedStyle(el);
        if (computed.overflowY === 'auto' || computed.overflowY === 'scroll') {
          saved.push({ el, maxHeight: el.style.maxHeight, overflowY: el.style.overflowY });
          el.style.maxHeight = 'none';
          el.style.overflowY = 'visible';
        }
      });
      return saved;
    }

    function restoreScrollables(saved) {
      saved.forEach(({ el, maxHeight, overflowY }) => {
        el.style.maxHeight = maxHeight;
        el.style.overflowY = overflowY;
      });
    }

    await toast.promise(
      (async () => {
        const saved = expandScrollables();
        let canvas;
        try {
          canvas = await html2canvas(element, {
            scale: 1.5,
            useCORS: true,
            logging: false,
          });
        } finally {
          restoreScrollables(saved);
        }

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`${activePage.title.replace(/\s+/g, '-').toLowerCase()}-report.pdf`);
      })(),
      {
        loading: 'Generating PDF…',
        success: 'Report downloaded successfully!',
        error: 'Download failed. Please try again.',
      }
    );
  }

  return (
    <div className={`dashboard-layout${collapsed ? ' dashboard-layout--sidebar-collapsed' : ''}`}>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <Sidebar
        activeId={activeId}
        onNavChange={setActiveId}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
      />
      <div className="dashboard-layout__main">
        <Header title={activePage.title} subtitle={activePage.subtitle} onDownload={handleDownload} />
        <main ref={contentRef} className="dashboard-layout__content">
          <ErrorBoundary fallbackMessage="Page failed to load.">
            <PageRouter activeId={activeId} />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
