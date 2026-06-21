import { DataTable } from '@components/DataTable/DataTable';
import './TopPagesTable.scss';

/**
 * @param {string}   title
 * @param {string}   [viewAllLabel]
 * @param {Function} [onViewAll]
 * @param {Array<{ key, label, render? }>} columns
 * @param {Array<object>} rows
 * @param {string}   [rowKey]
 */
export function TopPagesTable({ title, Icon, iconBg, iconColor, viewAllLabel = 'View All', onViewAll, columns, rows, rowKey }) {
  return (
    <div className="top-pages-table">
      <div className="top-pages-table__header">
        <div className="top-pages-table__title-group">
          {Icon && (
            <span
              className="top-pages-table__icon-wrap"
              aria-hidden="true"
              style={{ backgroundColor: iconBg, color: iconColor }}
            >
              <Icon size={13} strokeWidth={1.75} />
            </span>
          )}
          <h2 className="top-pages-table__title">{title}</h2>
        </div>
        {onViewAll && (
          <button type="button" className="top-pages-table__view-all" onClick={onViewAll}>
            {viewAllLabel}
          </button>
        )}
      </div>
      <DataTable columns={columns} rows={rows} rowKey={rowKey} />
    </div>
  );
}
