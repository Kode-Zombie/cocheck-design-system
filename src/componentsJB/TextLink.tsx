import React from 'react';
import './componentsJB.css';

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  theme?: 'blue' | 'yellow';
  underline?: boolean;
}

export const TextLink = ({
  children,
  theme = 'blue',
  underline = false,
  className = '',
  ...props
}: TextLinkProps) => {
  const linkClasses = [
    'sb-text-link',
    `sb-text-link--${theme}`,
    underline ? 'sb-text-link--underline' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={linkClasses} {...props}>
      {children}
    </a>
  );
};

TextLink.displayName = 'TextLink';
