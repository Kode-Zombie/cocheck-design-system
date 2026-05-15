import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonSurface = 'solid' | 'transparent' | 'translucent';
export type IconButtonShape = 'rounded' | 'circle';

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  icon: ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'neutral' | 'primary' | 'danger';
  surface?: IconButtonSurface;
  shape?: IconButtonShape;
};

export function IconButton({
  icon,
  label,
  size = 'md',
  variant = 'neutral',
  surface = 'solid',
  shape = 'rounded',
  className = '',
  type = 'button',
  ...buttonProps
}: IconButtonProps) {
  return (
    <button
      {...buttonProps}
      type={type}
      className={`sb-icon-button sb-icon-button--${size} sb-icon-button--${variant} sb-icon-button--${surface} sb-icon-button--${shape} ${className}`}
      aria-label={buttonProps['aria-label'] ?? label}
      title={buttonProps.title ?? label}
    >
      <span className="sb-icon-button__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
