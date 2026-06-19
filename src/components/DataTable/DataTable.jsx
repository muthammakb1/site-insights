import './DataTable.scss';

/**
 * @param {Array<{ key: string, label: string, render?: (val, row) => ReactNode }>} columns
 * @param {Array<object>} rows
 * @param {string} [rowKey] field to use as React key (default "id")
 */
export function DataTable({ columns, rows, rowKey = 'id', caption }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        {caption && <caption className="data-table__caption">{caption}</caption>}
        <thead className="data-table__head">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="data-table__th" scope="col">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="data-table__body">
          {rows.map((row, i) => (
            <tr key={row[rowKey] ?? i} className="data-table__row">
              {columns.map((col) => (
                <td key={col.key} className="data-table__td">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
