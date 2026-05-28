import type { ReactNode } from 'react';

export function MetricCard({
  label,
  value,
  caption,
  icon,
}: {
  label: string;
  value: string;
  caption?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="att-metric-card">
      <div className="att-metric-card__top">
        <span>{label}</span>
        {icon ? <span className="att-metric-card__icon">{icon}</span> : null}
      </div>
      <strong>{value}</strong>
      {caption ? <p>{caption}</p> : null}
    </div>
  );
}
