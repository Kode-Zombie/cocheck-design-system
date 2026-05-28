import type { ReactNode } from 'react';

export function FormPanel({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="att-form-panel">
      <header className="att-form-panel__header">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>
      <div className="att-form-panel__body">{children}</div>
      {footer ? <footer className="att-form-panel__footer">{footer}</footer> : null}
    </section>
  );
}
