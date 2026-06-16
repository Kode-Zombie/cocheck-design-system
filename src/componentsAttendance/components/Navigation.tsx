import type { ReactNode } from 'react';

export type NavItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  hideLabel?: boolean;
};

function NavButton({
  item,
  activeId,
  className,
  onSelect,
}: {
  item: NavItem;
  activeId?: string;
  className: string;
  onSelect?: (id: string) => void;
}) {
  const isActive = item.id === activeId;
  const isStatic = !onSelect;
  const isIconOnly = Boolean(item.hideLabel);

  return (
    <button
      aria-label={isIconOnly ? item.label : undefined}
      aria-current={isActive ? 'page' : undefined}
      className={`${className}${isIconOnly ? ` ${className}--icon-only` : ''}${isActive ? ` ${className}--active` : ''}${
        isStatic ? ` ${className}--static` : ''
      }`}
      disabled={isStatic}
      onClick={onSelect ? () => onSelect(item.id) : undefined}
      type="button"
    >
      {item.icon ? <span className={`${className}__icon`}>{item.icon}</span> : null}
      {isIconOnly ? null : <span>{item.label}</span>}
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
  onSelect,
}: {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <nav aria-label="모바일 하단 메뉴" className="att-mobile-tab-bar">
      {items.map((item) => (
        <NavButton
          activeId={activeId}
          className="att-mobile-tab-bar__item"
          item={item}
          key={item.id}
          onSelect={onSelect}
        />
      ))}
    </nav>
  );
}

export function OwnerTabBar({
  items,
  activeId,
  onSelect,
}: {
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <nav aria-label="경영주 하단 메뉴" className="att-owner-tab-bar">
      {items.map((item) => (
        <NavButton
          activeId={activeId}
          className="att-owner-tab-bar__item"
          item={item}
          key={item.id}
          onSelect={onSelect}
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
  onSelect,
}: {
  title: string;
  items: NavItem[];
  activeId?: string;
  footer?: ReactNode;
  onSelect?: (id: string) => void;
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
            onSelect={onSelect}
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
  sidebarFooter,
  onSelect,
  children,
}: {
  title: string;
  subtitle?: string;
  navTitle: string;
  navItems: NavItem[];
  activeId?: string;
  right?: ReactNode;
  sidebarFooter?: ReactNode;
  onSelect?: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="att-web-app-shell">
      <Sidebar
        activeId={activeId}
        footer={sidebarFooter}
        items={navItems}
        onSelect={onSelect}
        title={navTitle}
      />
      <main className="att-web-app-shell__main">
        <TopBar right={right} subtitle={subtitle} title={title} />
        <div className="att-web-app-shell__content">{children}</div>
      </main>
    </div>
  );
}
