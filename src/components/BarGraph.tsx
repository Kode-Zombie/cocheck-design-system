import type { CSSProperties } from 'react';

export type BarGraphStatus = 'inactive' | 'active' | 'progress' | 'empty';

export type BarGraphItem = {
  label: string;
  value?: number | null;
  status?: BarGraphStatus;
  color?: string;
};

export type BarGraphProps = {
  data: BarGraphItem[];
  max?: number;
  height?: number;
  showValues?: boolean;
  valueFormatter?: (value: number) => string;
  className?: string;
};

type BarGraphStyle = CSSProperties & {
  '--bar-height'?: string;
  '--bar-value'?: string;
  '--bar-color'?: string;
};

const getItemStatus = (item: BarGraphItem): BarGraphStatus => {
  if (item.status) {
    return item.status;
  }

  return item.value === null || item.value === undefined ? 'empty' : 'inactive';
};

const statusLabels: Record<BarGraphStatus, string> = {
  inactive: '비활성',
  active: '활성',
  progress: '진행중',
  empty: '정보 없음',
};

export function BarGraph({
  data,
  max,
  height = 250,
  className = '',
}: BarGraphProps) {
  const values = data.flatMap((item) =>
    typeof item.value === 'number' ? [item.value] : [],
  );
  const maxValue = max ?? Math.max(100, ...values);

  return (
    <div className={`sb-bar-graph ${className}`} role="list">
      {data.map((item) => {
        const status = getItemStatus(item);
        const numericValue =
          typeof item.value === 'number' ? item.value : undefined;
        const hasValue = numericValue !== undefined;
        const percentage =
          numericValue !== undefined && maxValue > 0
            ? (numericValue / maxValue) * 100
            : 0;
        const normalizedPercentage = Math.min(100, Math.max(0, percentage));
        const statusLabel =
          status === 'empty'
            ? statusLabels.empty
            : `${Math.round(normalizedPercentage)}% ${statusLabels[status]}`;

        return (
          <div
            aria-label={`${item.label}: ${statusLabel}`}
            className={`sb-bar-graph__item sb-bar-graph__item--${status}`}
            key={item.label}
            role="listitem"
            style={{ '--bar-height': `${height}px` } as BarGraphStyle}
            title={`${item.label}: ${statusLabel}`}
          >
            <div className="sb-bar-graph__track">
              <div
                className="sb-bar-graph__bar"
                style={
                  {
                    '--bar-value': `${normalizedPercentage}%`,
                    '--bar-color': item.color,
                  } as BarGraphStyle
                }
              />
            </div>
            <span className="sb-visually-hidden">
              {item.label}
              {hasValue ? ` ${numericValue}` : ''}
            </span>
          </div>
        );
      })}
    </div>
  );
}
