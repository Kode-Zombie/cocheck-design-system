import type { ReactNode } from 'react';
import type { AttendanceScreen } from '../screens/screenTypes';

export function AttendanceCanvas({ children }: { children: ReactNode }) {
  return <div className="att-gallery">{children}</div>;
}

export function AttendanceSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="att-gallery-section">
      <div className="att-gallery-section__header">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div className="att-gallery-section__grid">{children}</div>
    </section>
  );
}

export function AttendanceArtboard({
  screen,
  children,
}: {
  screen: Pick<AttendanceScreen, 'label' | 'width' | 'height'>;
  children: ReactNode;
}) {
  return (
    <figure className="att-artboard" style={{ width: screen.width }}>
      <figcaption>{screen.label}</figcaption>
      {children}
    </figure>
  );
}
