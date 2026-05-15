import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';
import './componentsJB.css';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  subType?: 'default' | 'required' | 'info';
  theme?: 'blue' | 'yellow';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, subType = 'default', theme = 'yellow', className = '', ...props }, ref) => {
    const isChecked = props.checked || false;

    const containerClasses = [
      'sb-selection-item',
      `sb-selection-item--${theme}`,
      isChecked ? 'sb-selection-item--checked' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      'sb-selection-label',
      subType === 'required' ? 'sb-selection-label--required' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={containerClasses}>
        <div className="sb-checkbox-wrapper">
          <input
            {...props}
            type="checkbox"
            className="sb-checkbox-native visually-hidden"
            ref={ref}
          />
          <div className={`sb-checkbox-custom sb-checkbox-custom--${theme}`}>
            {isChecked && <Check size={14} strokeWidth={4} className="sb-checkbox-icon" />}
          </div>
        </div>
        <span className={labelClasses}>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
