import type { ReactNode } from 'react';

export type NavItem = {
  id: string;
  label: string;
  icon?: ReactNode;
};

function NavButton({
  item,
  activeId,
  className,
}: {
  item: NavItem;
  activeId?: string;
  className: string;
}) {
  const isActive = item.id === activeId;

  return (
    <button
      aria-current={isActive ? 'page' : undefined}
      className={`${className}${isActive ? ` ${className}--active` : ''}`}
      type="button"
    >
      {item.icon ? <span className={`${className}__icon`}>{item.icon}</span> : null}
      <span>{item.label}</span>
    </button>
  );
}

export function TopBar({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <header className="att-top-bar">
      <div className="att-top-bar__title">
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {right ? <div className="att-top-bar__right">{right}</div> : null}
    </header>
  );
}

export function MobileTabBar({
  items,
  activeId,
}: {
  items: NavItem[];
  activeId?: string;
}) {
  return (
    <nav aria-label="모바일 하단 메뉴" className="att-mobile-tab-bar">
      {items.map((item) => (
        <NavButton
          activeId={activeId}
          className="att-mobile-tab-bar__item"
          item={item}
          key={item.id}
        />
      ))}
    </nav>
  );
}

export function OwnerTabBar({
  items,
  activeId,
}: {
  items: NavItem[];
  activeId?: string;
}) {
  return (
    <nav aria-label="사장님 하단 메뉴" className="att-owner-tab-bar">
      {items.map((item) => (
        <NavButton
          activeId={activeId}
          className="att-owner-tab-bar__item"
          item={item}
          key={item.id}
        />
      ))}
    </nav>
  );
}

export function Sidebar({
  title,
  items,
  activeId,
  footer,
}: {
  title: string;
  items: NavItem[];
  activeId?: string;
  footer?: ReactNode;
}) {
  return (
    <aside className="att-sidebar">
      <div className="att-sidebar__title">{title}</div>
      <nav aria-label={title} className="att-sidebar__nav">
        {items.map((item) => (
          <NavButton
            activeId={activeId}
            className="att-sidebar__item"
            item={item}
            key={item.id}
          />
        ))}
      </nav>
      {footer ? <div className="att-sidebar__footer">{footer}</div> : null}
    </aside>
  );
}

export function WebAppShell({
  title,
  subtitle,
  navTitle,
  navItems,
  activeId,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  navTitle: string;
  navItems: NavItem[];
  activeId?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="att-web-app-shell">
      <Sidebar activeId={activeId} items={navItems} title={navTitle} />
      <main className="att-web-app-shell__main">
        <TopBar right={right} subtitle={subtitle} title={title} />
        <div className="att-web-app-shell__content">{children}</div>
      </main>
    </div>
  );
}
