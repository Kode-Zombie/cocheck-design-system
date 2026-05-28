import type { ReactNode } from 'react';

export function ActionCard({
  title,
  caption,
  meta,
  icon,
  right,
}: {
  title: string;
  caption?: string;
  meta?: string;
  icon?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="att-action-card">
      {icon ? <div className="att-action-card__icon">{icon}</div> : null}
      <div className="att-action-card__body">
        <strong>{title}</strong>
        {caption ? <span>{caption}</span> : null}
        {meta ? <small>{meta}</small> : null}
      </div>
      {right ? <div className="att-action-card__right">{right}</div> : null}
    </div>
  );
}
