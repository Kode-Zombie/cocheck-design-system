import React, { forwardRef } from 'react';
import './componentsJB.css';

export interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ElementType;
  title: string;
  description: string;
}

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ icon: Icon, title, description, className = '', ...props }, ref) => {
    const isSelected = props.checked;

    const containerClasses = [
      'sb-radio-button-jb',
      isSelected ? 'sb-radio-button-jb--selected' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label htmlFor={props.id} className={containerClasses}>
        <input {...props} ref={ref} type="radio" className="visually-hidden" />

        <div className={`sb-radio-icon-box ${isSelected ? 'sb-radio-icon-box--selected' : ''}`}>
          <Icon size={24} />
        </div>

        <div className="sb-radio-content">
          <h3 className="sb-radio-title">{title}</h3>
          <p className="sb-radio-description">{description}</p>
        </div>

        <div className="sb-radio-circle-wrapper">
          <div className={`sb-radio-circle ${isSelected ? 'sb-radio-circle--selected' : ''}`}>
            {isSelected && <div className="sb-radio-inner-dot" />}
          </div>
        </div>
      </label>
    );
  }
);

RadioButton.displayName = 'RadioButton';
