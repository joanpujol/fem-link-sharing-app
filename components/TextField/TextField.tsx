import React, { useState } from 'react';
import clsx from 'clsx';
import { typography } from '../Text/typographyStyles';
import LinkIcon from '@/components/icons/IconLink';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  validate?: (value: string) => string | null;
}

export function TextField({
  value: controlledValue,
  onValueChange,
  validate,
  ...props
}: TextFieldProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const internalValue = controlledValue !== undefined ? controlledValue : value;

  const fieldState: 'empty' | 'filled' | 'active' | 'error' =
    error !== null
      ? 'error'
      : isFocused
        ? 'active'
        : internalValue.length > 0
          ? 'filled'
          : 'empty';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) setValue(newValue);
    if (onValueChange) onValueChange(newValue);
    if (validate) setError(validate(newValue));
  };

  return (
    <div className="relative w-full">
      <div
        className={clsx(
          'w-full h-[56px] rounded-[8px] px-4 py-4 flex items-center gap-4 transition-all border caret-brand-purple-600',
          {
            'border-brand-grey-150':
              fieldState === 'empty' || fieldState === 'filled',
            'border-brand-purple-600 shadow-[0_0_32px_rgba(var(--color-brand-purple-600-rgb),0.25)]':
              fieldState === 'active',
            'border-brand-red-450': fieldState === 'error',
          }
        )}
      >
        <LinkIcon className="w-4 h-4 fill-brand-grey-600" />

        <input
          {...props}
          value={internalValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={clsx(
            'flex-1 bg-transparent outline-none placeholder:text-brand-grey-800/50',
            typography.preset3regular,
            {
              'text-brand-grey-800':
                fieldState === 'empty' ||
                fieldState === 'filled' ||
                fieldState === 'active',
              'text-brand-red-450': fieldState === 'error',
            }
          )}
        />

        {/* Error message inside input, positioned right */}
        {fieldState === 'error' && error && (
          <span
            className={clsx(
              'absolute right-4 top-1/2 -translate-y-1/2 text-right text-brand-red-450',
              typography.preset4
            )}
          >
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
