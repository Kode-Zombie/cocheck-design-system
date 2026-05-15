import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type DataTableRow = Record<string, ReactNode>;

export type DataTableColumn = {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  sortable?: boolean;
  render?: (row: DataTableRow) => ReactNode;
  sortValue?: (row: DataTableRow) => string | number;
};

export type StandardDataTableProps = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  caption?: string;
  rowKey?: (row: DataTableRow, index: number) => string;
  emptyMessage?: string;
  className?: string;
};

type SortState = {
  key: string;
  direction: 'asc' | 'desc';
};

const getSortValue = (row: DataTableRow, column: DataTableColumn) => {
  const value = column.sortValue ? column.sortValue(row) : row[column.key];

  if (typeof value === 'number') {
    return value;
  }

  return String(value ?? '').toLocaleLowerCase();
};

export function StandardDataTable({
  columns,
  rows,
  caption,
  rowKey,
  emptyMessage = '데이터 없음',
  className = '',
}: StandardDataTableProps) {
  const [sortState, setSortState] = useState<SortState | null>(null);
  const activeSortColumn = columns.find(
    (column) => column.key === sortState?.key,
  );
  const sortedRows = useMemo(() => {
    if (!sortState || !activeSortColumn) {
      return rows;
    }

    return [...rows].sort((leftRow, rightRow) => {
      const leftValue = getSortValue(leftRow, activeSortColumn);
      const rightValue = getSortValue(rightRow, activeSortColumn);
      const result =
        typeof leftValue === 'number' && typeof rightValue === 'number'
          ? leftValue - rightValue
          : String(leftValue).localeCompare(String(rightValue));

      return sortState.direction === 'asc' ? result : -result;
    });
  }, [activeSortColumn, rows, sortState]);

  const toggleSort = (column: DataTableColumn) => {
    if (!column.sortable) {
      return;
    }

    setSortState((current) => {
      if (current?.key !== column.key) {
        return { key: column.key, direction: 'asc' };
      }

      return {
        key: column.key,
        direction: current.direction === 'asc' ? 'desc' : 'asc',
      };
    });
  };

  return (
    <div className={`sb-data-table ${className}`}>
      <table>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => {
              const isSorted = sortState?.key === column.key;

              return (
                <th
                  key={column.key}
                  scope="col"
                  style={{ width: column.width }}
                  className={`sb-data-table__cell--${column.align ?? 'left'}`}
                  aria-sort={
                    isSorted
                      ? sortState.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  {column.sortable ? (
                    <button
                      className="sb-data-table__sort-button"
                      type="button"
                      onClick={() => toggleSort(column)}
                    >
                      <span>{column.header}</span>
                      <span aria-hidden="true">
                        {isSorted
                          ? sortState.direction === 'asc'
                            ? '오름차순'
                            : '내림차순'
                          : '정렬'}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.length ? (
            sortedRows.map((row, rowIndex) => (
              <tr key={rowKey ? rowKey(row, rowIndex) : rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`sb-data-table__cell--${column.align ?? 'left'}`}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="sb-data-table__empty">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
