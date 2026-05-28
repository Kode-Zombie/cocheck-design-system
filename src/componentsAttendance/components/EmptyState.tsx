import type { ReactNode } from 'react';

export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="att-empty-state">
      {icon ? <div className="att-empty-state__icon">{icon}</div> : null}
      <strong className="att-empty-state__title">{title}</strong>
      {description ? (
        <p className="att-empty-state__description">{description}</p>
      ) : null}
      {action ? <div className="att-empty-state__action">{action}</div> : null}
    </div>
  );
}
