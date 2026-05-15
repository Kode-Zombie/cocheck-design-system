import React from 'react';
import './componentsJB.css';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface StandardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export const StandardButton = ({
  children,
  className = '',
  icon,
  size = 'md',
  variant = 'primary',
  ...props
}: StandardButtonProps) => {
  const buttonClasses = [
    'sb-button-jb',
    `sb-button-jb--${size}`,
    `sb-button-jb--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} {...props}>
      {icon && <span className="sb-button-jb__icon">{icon}</span>}
      <span className="sb-button-jb__text">{children}</span>
    </button>
  );
};
