import React, { forwardRef, useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './componentsJB.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  theme?: 'blue' | 'yellow';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, theme = 'yellow', className = '', id, type, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === 'password';
    const finalInputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

    const containerClasses = [
      'sb-field',
      theme === 'blue' ? 'sb-field--blue' : 'sb-field--yellow',
      error ? 'sb-field--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className="sb-field__label">
            {label}
          </label>
        )}

        <div className="sb-field__shell">
          <input
            ref={ref}
            id={inputId}
            type={finalInputType}
            className={`sb-field__input-jb ${isPasswordType ? 'sb-field__input--password' : ''}`}
            {...props}
          />

          {isPasswordType && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="sb-field__toggle"
              aria-label={showPassword ? '비밀번호 가리기' : '비밀번호 보이기'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {error && <span className="sb-field__error-msg">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
