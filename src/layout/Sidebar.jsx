import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NAV_ITEMS, LOGOUT_ITEM } from './navConfig';
import './Sidebar.scss';

export function Sidebar({ activeId, onNavChange, collapsed, onToggleCollapse }) {
  return (
    <aside className={`sidebar${collapsed ? ' sidebar--collapsed' : ''}`}>

      {/* Brand */}
      <div className="sidebar__brand">
        <div className="sidebar__logo-placeholder" aria-label="Site Insights logo" />
        {!collapsed && <span className="sidebar__brand-name">asianpaints</span>}
      </div>

      {/* Main navigation */}
      <nav className="sidebar__nav" aria-label="Main navigation">
        <ul>
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const isActive = activeId === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  className={`sidebar__nav-item${isActive ? ' sidebar__nav-item--active' : ''}`}
                  onClick={() => onNavChange(id)}
                  aria-current={isActive ? 'page' : undefined}
                  title={collapsed ? label : undefined}
                >
                  <span className="sidebar__nav-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  {!collapsed && (
                    <span className="sidebar__nav-label">{label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="sidebar__footer">
        <button
          type="button"
          className="sidebar__nav-item sidebar__nav-item--logout"
          title={collapsed ? LOGOUT_ITEM.label : undefined}
        >
          <span className="sidebar__nav-icon" aria-hidden="true">
            <LOGOUT_ITEM.Icon size={18} strokeWidth={1.75} />
          </span>
          {!collapsed && (
            <span className="sidebar__nav-label">{LOGOUT_ITEM.label}</span>
          )}
        </button>
      </div>

      {/* Collapse notch — right edge, vertically centered */}
      <button
        type="button"
        className="sidebar__notch"
        onClick={onToggleCollapse}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <ChevronRight size={14} strokeWidth={2.5} />
          : <ChevronLeft  size={14} strokeWidth={2.5} />
        }
      </button>

    </aside>
  );
}
