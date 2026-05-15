import { useId, useState } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

type Period = 'AM' | 'PM';

type TimeParts = {
  hour: string;
  minute: string;
  period: Period;
};

export type TimeInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'value' | 'defaultValue' | 'onChange'
> & {
  label: string;
  helperText?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
};

const parseTimeValue = (timeValue = '09:00'): TimeParts => {
  const [rawHour = '9', rawMinute = '0'] = timeValue.split(':');
  const hour24 = Number(rawHour);
  const minute = Number(rawMinute);
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 % 12 || 12;

  return {
    hour: String(hour12).padStart(2, '0'),
    minute: String(Number.isNaN(minute) ? 0 : minute).padStart(2, '0'),
    period,
  };
};

const formatTimeValue = ({ hour, minute, period }: TimeParts) => {
  if (!hour || !minute) {
    return '';
  }

  const hourNumber = Number(hour);
  const minuteNumber = Number(minute);

  if (
    Number.isNaN(hourNumber) ||
    Number.isNaN(minuteNumber) ||
    hourNumber < 1 ||
    hourNumber > 12 ||
    minuteNumber < 0 ||
    minuteNumber > 59
  ) {
    return '';
  }

  const hour24 =
    period === 'AM' ? hourNumber % 12 : hourNumber === 12 ? 12 : hourNumber + 12;

  return `${String(hour24).padStart(2, '0')}:${String(minuteNumber).padStart(
    2,
    '0',
  )}`;
};

const sanitizeNumericPart = (value: string) =>
  value.replace(/\D/g, '').slice(0, 2);

const isAllowedHour = (value: string) => {
  if (!value) {
    return true;
  }

  const hourNumber = Number(value);

  return hourNumber >= 0 && hourNumber <= 12;
};

const isAllowedMinute = (value: string) => {
  if (!value) {
    return true;
  }

  const minuteNumber = Number(value);

  return minuteNumber >= 0 && minuteNumber <= 59;
};

const normalizePart = (part: 'hour' | 'minute', value: string) => {
  if (!value) {
    return value;
  }

  const numericValue = Number(value);

  if (part === 'hour') {
    return String(Math.min(Math.max(numericValue, 1), 12)).padStart(2, '0');
  }

  return String(Math.min(Math.max(numericValue, 0), 59)).padStart(2, '0');
};

const periodLabels: Record<Period, string> = {
  AM: '오전',
  PM: '오후',
};

export function TimeInput({
  label,
  helperText,
  id,
  className = '',
  value,
  defaultValue = '09:00',
  onChange,
  onValueChange,
  disabled,
  ...inputProps
}: TimeInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(() =>
    parseTimeValue(defaultValue),
  );
  const currentValue = isControlled ? parseTimeValue(value) : internalValue;
  const formattedValue = formatTimeValue(currentValue);

  const commitValue = (nextValue: TimeParts) => {
    const nextFormattedValue = formatTimeValue(nextValue);

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextFormattedValue);
    onValueChange?.(nextFormattedValue);
  };

  const updatePart = (part: keyof TimeParts, nextPartValue: string) => {
    commitValue({
      ...currentValue,
      [part]: nextPartValue,
    });
  };

  const updateNumericPart = (part: 'hour' | 'minute', rawValue: string) => {
    const nextPartValue = sanitizeNumericPart(rawValue);

    if (
      (part === 'hour' && !isAllowedHour(nextPartValue)) ||
      (part === 'minute' && !isAllowedMinute(nextPartValue))
    ) {
      return;
    }

    updatePart(part, nextPartValue);
  };

  const normalizeNumericPart = (part: 'hour' | 'minute') => {
    const normalizedValue = normalizePart(part, currentValue[part]);

    if (normalizedValue !== currentValue[part]) {
      updatePart(part, normalizedValue);
    }
  };

  return (
    <div
      className={`sb-time-input ${className}`}
      role="group"
      aria-labelledby={`${inputId}-label`}
    >
      <span id={`${inputId}-label`} className="sb-time-input__label">
        {label}
      </span>
      <div className="sb-time-input__picker">
        <label className="sb-time-input__part">
          <input
            aria-label={`${label} 시간`}
            className="sb-time-input__number-input"
            disabled={disabled}
            inputMode="numeric"
            maxLength={2}
            pattern="[0-9]*"
            placeholder="--"
            type="text"
            value={currentValue.hour}
            onBlur={() => normalizeNumericPart('hour')}
            onChange={(event) => updateNumericPart('hour', event.target.value)}
            onFocus={(event) => event.target.select()}
          />
        </label>

        <span className="sb-time-input__colon" aria-hidden="true">
          <span />
          <span />
        </span>

        <label className="sb-time-input__part sb-time-input__part--minute">
          <input
            aria-label={`${label} 분`}
            className="sb-time-input__number-input"
            disabled={disabled}
            inputMode="numeric"
            maxLength={2}
            pattern="[0-9]*"
            placeholder="--"
            type="text"
            value={currentValue.minute}
            onBlur={() => normalizeNumericPart('minute')}
            onChange={(event) => updateNumericPart('minute', event.target.value)}
            onFocus={(event) => event.target.select()}
          />
        </label>

        <div className="sb-time-input__period" aria-label={`${label} 오전/오후`}>
          {(['AM', 'PM'] as const).map((period) => (
            <button
              aria-pressed={currentValue.period === period}
              className="sb-time-input__period-button"
              disabled={disabled}
              key={period}
              type="button"
              onClick={() => updatePart('period', period)}
            >
              {periodLabels[period]}
            </button>
          ))}
        </div>
      </div>
      <input
        {...inputProps}
        aria-hidden="true"
        className="sb-time-input__native"
        disabled={disabled}
        id={inputId}
        readOnly
        tabIndex={-1}
        type="time"
        value={formattedValue}
      />
      {helperText ? <span className="sb-field__hint">{helperText}</span> : null}
    </div>
  );
}
