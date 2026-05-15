import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

export type DateTimeSelectMode = 'ymd' | 'md';

export type DateTimeSelectValue = {
  year?: number;
  month: number;
  day: number;
};

export type DateTimeSelectProps = {
  label: string;
  mode?: DateTimeSelectMode;
  value?: DateTimeSelectValue;
  defaultValue?: DateTimeSelectValue;
  minYear?: number;
  maxYear?: number;
  helperText?: string;
  className?: string;
  onChange?: (value: DateTimeSelectValue) => void;
};

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate();

const now = new Date();
const monthDayCalendarYear = 2024;
const weekLabels = ['일', '월', '화', '수', '목', '금', '토'];

const padPart = (value: number) => value.toString().padStart(2, '0');

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const normalizeValue = (
  rawValue: DateTimeSelectValue,
  mode: DateTimeSelectMode,
  minYear: number,
  maxYear: number,
): DateTimeSelectValue => {
  const fallbackYear =
    typeof rawValue.year === 'number' && Number.isFinite(rawValue.year)
      ? rawValue.year
      : now.getFullYear();
  const fallbackMonth = Number.isFinite(rawValue.month)
    ? rawValue.month
    : now.getMonth() + 1;
  const fallbackDay = Number.isFinite(rawValue.day) ? rawValue.day : now.getDate();
  const year =
    mode === 'ymd'
      ? clamp(fallbackYear, minYear, maxYear)
      : undefined;
  const month = clamp(fallbackMonth, 1, 12);
  const calendarYear = mode === 'ymd' ? year ?? now.getFullYear() : monthDayCalendarYear;
  const day = clamp(fallbackDay, 1, getDaysInMonth(calendarYear, month));

  return mode === 'ymd' ? { year, month, day } : { month, day };
};

const formatValue = (value: DateTimeSelectValue, mode: DateTimeSelectMode) => {
  if (mode === 'md') {
    return `${padPart(value.month)}-${padPart(value.day)}`;
  }

  return `${value.year ?? now.getFullYear()}-${padPart(value.month)}-${padPart(
    value.day,
  )}`;
};

const formatDateDigits = (digits: string, mode: DateTimeSelectMode) => {
  if (mode === 'md') {
    if (digits.length <= 2) {
      return digits;
    }

    return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  }

  if (digits.length <= 4) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }

  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
};

const parseSeparatedInputValue = (
  rawValue: string,
  mode: DateTimeSelectMode,
  minYear: number,
  maxYear: number,
) => {
  const parts = rawValue.trim().split(/\D+/).filter(Boolean);

  if (mode === 'md' && parts.length >= 2) {
    return normalizeValue(
      {
        month: Number(parts[0]),
        day: Number(parts[1]),
      },
      mode,
      minYear,
      maxYear,
    );
  }

  if (mode === 'ymd' && parts.length >= 3 && parts[0].length === 4) {
    return normalizeValue(
      {
        year: Number(parts[0]),
        month: Number(parts[1]),
        day: Number(parts[2]),
      },
      mode,
      minYear,
      maxYear,
    );
  }

  return null;
};

const normalizeInputText = (
  rawValue: string,
  mode: DateTimeSelectMode,
  minYear: number,
  maxYear: number,
) => {
  const separatedValue = parseSeparatedInputValue(
    rawValue,
    mode,
    minYear,
    maxYear,
  );

  if (separatedValue) {
    return formatValue(separatedValue, mode);
  }

  const maxDigits = mode === 'ymd' ? 8 : 4;
  const digits = rawValue.replace(/\D/g, '').slice(0, maxDigits);

  if (digits.length === maxDigits) {
    const value =
      mode === 'ymd'
        ? {
            year: Number(digits.slice(0, 4)),
            month: Number(digits.slice(4, 6)),
            day: Number(digits.slice(6, 8)),
          }
        : {
            month: Number(digits.slice(0, 2)),
            day: Number(digits.slice(2, 4)),
          };

    return formatValue(normalizeValue(value, mode, minYear, maxYear), mode);
  }

  return formatDateDigits(digits, mode);
};

const parseInputValue = (
  rawValue: string,
  mode: DateTimeSelectMode,
  minYear: number,
  maxYear: number,
): DateTimeSelectValue | null => {
  const trimmedValue = rawValue.trim();

  if (mode === 'md') {
    const match = /^(\d{1,2})-(\d{1,2})$/.exec(trimmedValue);

    if (!match) {
      return null;
    }

    const month = Number(match[1]);
    const day = Number(match[2]);

    if (
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > getDaysInMonth(monthDayCalendarYear, month)
    ) {
      return null;
    }

    return { month, day };
  }

  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(trimmedValue);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (
    year < minYear ||
    year > maxYear ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > getDaysInMonth(year, month)
  ) {
    return null;
  }

  return { year, month, day };
};

const getCalendarYear = (value: DateTimeSelectValue, mode: DateTimeSelectMode) =>
  mode === 'ymd' ? value.year ?? now.getFullYear() : monthDayCalendarYear;

const buildCalendarDays = (
  viewYear: number,
  viewMonth: number,
  currentValue: DateTimeSelectValue,
  mode: DateTimeSelectMode,
  minYear: number,
  maxYear: number,
) => {
  const firstDay = new Date(viewYear, viewMonth - 1, 1);
  const startDate = new Date(viewYear, viewMonth - 1, 1 - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const isSelected =
      mode === 'ymd'
        ? currentValue.year === year &&
          currentValue.month === month &&
          currentValue.day === day
        : currentValue.month === month && currentValue.day === day;

    return {
      year,
      month,
      day,
      isCurrentMonth: month === viewMonth,
      isSelected,
      isToday:
        year === now.getFullYear() &&
        month === now.getMonth() + 1 &&
        day === now.getDate(),
      disabled: mode === 'ymd' && (year < minYear || year > maxYear),
    };
  });
};

export function DateTimeSelect({
  label,
  mode = 'ymd',
  value,
  defaultValue = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  },
  minYear = now.getFullYear() - 5,
  maxYear = now.getFullYear() + 5,
  helperText,
  className = '',
  onChange,
}: DateTimeSelectProps) {
  const inputId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const normalizedDefaultValue = normalizeValue(
    defaultValue,
    mode,
    minYear,
    maxYear,
  );
  const [internalValue, setInternalValue] = useState(normalizedDefaultValue);
  const currentValue = normalizeValue(
    value ?? internalValue,
    mode,
    minYear,
    maxYear,
  );
  const currentYear = getCalendarYear(currentValue, mode);
  const formattedCurrentValue = formatValue(currentValue, mode);
  const [draftText, setDraftText] = useState<string | null>(null);
  const inputText = draftText ?? formattedCurrentValue;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => ({
    year: currentYear,
    month: currentValue.month,
  }));
  const calendarDays = useMemo(
    () =>
      buildCalendarDays(
        viewMonth.year,
        viewMonth.month,
        currentValue,
        mode,
        minYear,
        maxYear,
      ),
    [currentValue, maxYear, minYear, mode, viewMonth.month, viewMonth.year],
  );

  const commitValue = (nextValue: DateTimeSelectValue) => {
    const normalizedValue = normalizeValue(nextValue, mode, minYear, maxYear);

    if (value === undefined) {
      setInternalValue(normalizedValue);
    }
    setDraftText(null);
    setViewMonth({
      year: getCalendarYear(normalizedValue, mode),
      month: normalizedValue.month,
    });
    onChange?.(normalizedValue);
  };

  const syncInputToCurrentValue = () => {
    setDraftText(null);
  };

  const openCalendar = () => {
    setViewMonth({
      year: currentYear,
      month: currentValue.month,
    });
    setIsCalendarOpen(true);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextText = normalizeInputText(
      event.target.value,
      mode,
      minYear,
      maxYear,
    );
    const parsedValue = parseInputValue(nextText, mode, minYear, maxYear);

    setDraftText(nextText);

    if (parsedValue) {
      commitValue(parsedValue);
    }
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const parsedValue = parseInputValue(inputText, mode, minYear, maxYear);

      if (parsedValue) {
        commitValue(parsedValue);
        setIsCalendarOpen(false);
        return;
      }

      syncInputToCurrentValue();
    }

    if (event.key === 'Escape') {
      setIsCalendarOpen(false);
      syncInputToCurrentValue();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openCalendar();
    }
  };

  const navigateMonth = (amount: number) => {
    setViewMonth((currentMonth) => {
      const nextDate = new Date(
        currentMonth.year,
        currentMonth.month - 1 + amount,
        1,
      );
      const nextYear =
        mode === 'ymd'
          ? clamp(nextDate.getFullYear(), minYear, maxYear)
          : monthDayCalendarYear;
      const nextMonth =
        mode === 'ymd' && nextDate.getFullYear() !== nextYear
          ? nextYear === minYear
            ? 1
            : 12
          : nextDate.getMonth() + 1;

      return {
        year: nextYear,
        month: nextMonth,
      };
    });
  };

  const selectCalendarDay = (day: (typeof calendarDays)[number]) => {
    if (day.disabled) {
      return;
    }

    commitValue(
      mode === 'ymd'
        ? { year: day.year, month: day.month, day: day.day }
        : { month: day.month, day: day.day },
    );
    setIsCalendarOpen(false);
  };

  useEffect(() => {
    if (!isCalendarOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsCalendarOpen(false);
        setDraftText(null);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isCalendarOpen]);

  return (
    <div className={`sb-date-time-select ${className}`} ref={rootRef}>
      <label className="sb-field__label" htmlFor={inputId}>
        {label}
      </label>
      <div className="sb-date-time-select__field">
        <input
          aria-expanded={isCalendarOpen}
          aria-haspopup="dialog"
          className="sb-field__input sb-date-time-select__input"
          id={inputId}
          inputMode="numeric"
          placeholder={mode === 'ymd' ? 'YYYY-MM-DD' : 'MM-DD'}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onClick={openCalendar}
          onFocus={openCalendar}
          onKeyDown={handleInputKeyDown}
        />
        <button
          aria-label="달력 열기"
          className="sb-date-time-select__trigger"
          type="button"
          onClick={openCalendar}
        >
          <CalendarDays aria-hidden="true" size={18} />
        </button>
      </div>
      {isCalendarOpen ? (
        <div
          aria-label={`${label} 달력`}
          className="sb-date-time-select__calendar"
          role="dialog"
        >
          <div className="sb-date-time-select__calendar-header">
            <button
              aria-label="이전 달"
              className="sb-date-time-select__nav-button"
              type="button"
              onClick={() => navigateMonth(-1)}
            >
              <ChevronLeft aria-hidden="true" size={18} />
            </button>
            <span className="sb-date-time-select__calendar-title">
              {mode === 'ymd'
                ? `${viewMonth.year}년 ${viewMonth.month}월`
                : `${viewMonth.month}월`}
            </span>
            <button
              aria-label="다음 달"
              className="sb-date-time-select__nav-button"
              type="button"
              onClick={() => navigateMonth(1)}
            >
              <ChevronRight aria-hidden="true" size={18} />
            </button>
          </div>
          <div className="sb-date-time-select__weekdays" aria-hidden="true">
            {weekLabels.map((weekLabel) => (
              <span key={weekLabel}>{weekLabel}</span>
            ))}
          </div>
          <div className="sb-date-time-select__calendar-grid" role="grid">
            {calendarDays.map((calendarDay) => (
              <button
                aria-label={
                  mode === 'ymd'
                    ? `${calendarDay.year}년 ${calendarDay.month}월 ${calendarDay.day}일`
                    : `${calendarDay.month}월 ${calendarDay.day}일`
                }
                aria-selected={calendarDay.isSelected}
                className={[
                  'sb-date-time-select__day',
                  calendarDay.isCurrentMonth
                    ? ''
                    : 'sb-date-time-select__day--outside',
                  calendarDay.isSelected ? 'sb-date-time-select__day--selected' : '',
                  calendarDay.isToday ? 'sb-date-time-select__day--today' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={calendarDay.disabled}
                key={`${calendarDay.year}-${calendarDay.month}-${calendarDay.day}`}
                role="gridcell"
                type="button"
                onClick={() => selectCalendarDay(calendarDay)}
              >
                {calendarDay.day}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      {helperText ? <span className="sb-field__hint">{helperText}</span> : null}
    </div>
  );
}
