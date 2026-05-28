import type { ReactNode } from 'react';

export type StatusTone =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger';

export function StatusBadge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: StatusTone;
}) {
  return (
    <span className={`att-status-badge att-status-badge--${tone}`}>
      {children}
    </span>
  );
}
