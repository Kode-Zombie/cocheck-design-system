import { Search } from 'lucide-react';
import { useId } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

export type SearchInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'> & {
  label?: string;
  hideLabel?: boolean;
};

export function SearchInput({
  label = '검색',
  hideLabel = false,
  id,
  className = '',
  ...inputProps
}: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <label className={`sb-field sb-search-input ${className}`} htmlFor={inputId}>
      <span className={hideLabel ? 'sb-visually-hidden' : 'sb-field__label'}>
        {label}
      </span>
      <span className="sb-search-input__shell">
        <Search aria-hidden="true" className="sb-search-input__icon" size={18} />
        <input
          {...inputProps}
          id={inputId}
          type="text"
          className="sb-field__input sb-search-input__control"
        />
      </span>
    </label>
  );
}
