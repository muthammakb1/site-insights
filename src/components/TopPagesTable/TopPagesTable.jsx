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
export function TopPagesTable({ title, viewAllLabel = 'View All', onViewAll, columns, rows, rowKey }) {
  return (
    <div className="top-pages-table">
      <div className="top-pages-table__header">
        <h2 className="top-pages-table__title">{title}</h2>
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
