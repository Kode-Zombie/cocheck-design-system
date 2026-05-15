import { useId, useRef, useState } from 'react';
import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  ClipboardEvent,
} from 'react';

export type DiscontinuousInputShape = 'square' | 'circle';

export type DiscontinuousInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'value' | 'defaultValue' | 'onChange' | 'maxLength' | 'type' | 'id'
> & {
  label: string;
  length?: number;
  shape?: DiscontinuousInputShape;
  opaqueWhenFilled?: boolean;
  value?: string;
  defaultValue?: string;
  helperText?: string;
  onChange?: (value: string) => void;
  validateCharacter?: (character: string) => boolean;
};

const toSlots = (value: string, length: number) =>
  Array.from({ length }, (_, index) => Array.from(value)[index] ?? '');

export function DiscontinuousInput({
  label,
  length = 6,
  shape = 'square',
  opaqueWhenFilled = false,
  value,
  defaultValue = '',
  helperText,
  className = '',
  inputMode = 'text',
  autoComplete = 'one-time-code',
  validateCharacter,
  onChange,
  ...inputProps
}: DiscontinuousInputProps) {
  const generatedId = useId();
  const [internalSlots, setInternalSlots] = useState(() =>
    toSlots(defaultValue, length),
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const slots = value === undefined ? internalSlots : toSlots(value, length);

  const moveFocus = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const commitSlots = (nextSlots: string[]) => {
    if (value === undefined) {
      setInternalSlots(nextSlots);
    }
    onChange?.(nextSlots.join(''));
  };

  const pickCharacter = (rawValue: string) => {
    const characters = Array.from(rawValue);
    const character = characters[characters.length - 1] ?? '';

    if (character && validateCharacter && !validateCharacter(character)) {
      return null;
    }

    return character;
  };

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const character = pickCharacter(event.target.value);

    if (character === null) {
      return;
    }

    const nextSlots = [...slots];
    nextSlots[index] = character;
    commitSlots(nextSlots);

    if (character && index < length - 1) {
      window.requestAnimationFrame(() => moveFocus(index + 1));
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      moveFocus(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < length - 1) {
      event.preventDefault();
      moveFocus(index + 1);
      return;
    }

    if (event.key === 'Backspace' && !slots[index] && index > 0) {
      event.preventDefault();
      const nextSlots = [...slots];
      nextSlots[index - 1] = '';
      commitSlots(nextSlots);
      moveFocus(index - 1);
    }
  };

  const handlePaste = (
    index: number,
    event: ClipboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();

    const pastedCharacters = Array.from(event.clipboardData.getData('text'))
      .filter((character) =>
        validateCharacter ? validateCharacter(character) : true,
      )
      .slice(0, length - index);

    if (!pastedCharacters.length) {
      return;
    }

    const nextSlots = [...slots];
    pastedCharacters.forEach((character, pastedIndex) => {
      nextSlots[index + pastedIndex] = character;
    });
    commitSlots(nextSlots);
    moveFocus(Math.min(index + pastedCharacters.length, length - 1));
  };

  return (
    <div
      className={`sb-discontinuous-input sb-discontinuous-input--${shape} ${
        opaqueWhenFilled ? 'sb-discontinuous-input--opaque-when-filled' : ''
      } ${className}`}
      role="group"
      aria-labelledby={`${generatedId}-label`}
    >
      <span id={`${generatedId}-label`} className="sb-field__label">
        {label}
      </span>
      <div className="sb-discontinuous-input__slots">
        {slots.map((character, index) => (
          <input
            {...inputProps}
            key={`${generatedId}-${index}`}
            ref={(node) => {
              inputRefs.current[index] = node;
            }}
            aria-label={`${label} ${index + 1}번째 글자`}
            autoComplete={autoComplete}
            className="sb-discontinuous-input__slot"
            data-filled={character ? 'true' : 'false'}
            inputMode={inputMode}
            maxLength={1}
            type="text"
            value={character}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={(event) => handlePaste(index, event)}
          />
        ))}
      </div>
      {helperText ? <span className="sb-field__hint">{helperText}</span> : null}
    </div>
  );
}
