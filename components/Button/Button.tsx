import { ButtonHTMLAttributes, ReactNode } from 'react';
import { typography } from '../Text/typographyStyles';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  className,
  ...props
}: ButtonProps) {
  const base = `w-[227px] h-[56px] rounded-[8px] px-6 py-4 text-[16px] font-medium transition-all flex items-center justify-center ${typography.preset3semibold}`;

  const PRIMARY_DISABLED_BG = 'rgba(var(--color-brand-purple-600-rgb), 0.25)';
  const SECONDARY_DISABLED_BG = 'var(--brand-white)';
  const PRIMARY_DISABLED_TEXT = 'var(--brand-white)';
  const SECONDARY_DISABLED_COLOR =
    'rgba(var(--color-brand-purple-600-rgb), 0.25)';

  const primary = clsx(
    'bg-[var(--color-brand-purple-600)] text-[var(--brand-white)]',
    !disabled &&
      'hover:bg-[var(--color-brand-purple-200)] hover:shadow-[0_0_32px_rgba(var(--color-brand-purple-600-rgb),0.25)]',
    !disabled && 'active:bg-[var(--color-brand-purple-200)]',
    disabled && 'pointer-events-none cursor-not-allowed'
  );

  const secondary = clsx(
    'bg-[var(--brand-white)] text-[var(--color-brand-purple-600)] border border-[var(--color-brand-purple-600)]',
    !disabled && 'hover:bg-[var(--color-brand-purple-100)]',
    !disabled &&
      'active:bg-[var(--color-brand-purple-300)] active:border-[var(--color-brand-purple-600)] active:text-[var(--color-brand-purple-600)]',
    disabled && 'pointer-events-none cursor-not-allowed'
  );

  const variantClass = variant === 'primary' ? primary : secondary;

  const disabledStyle: React.CSSProperties | undefined = disabled
    ? variant === 'primary'
      ? {
          background: PRIMARY_DISABLED_BG,
          color: PRIMARY_DISABLED_TEXT,
          borderColor: undefined,
        }
      : {
          background: SECONDARY_DISABLED_BG,
          color: SECONDARY_DISABLED_COLOR,
          borderColor: SECONDARY_DISABLED_COLOR,
        }
    : undefined;

  return (
    <button
      {...props}
      aria-disabled={disabled ? 'true' : undefined}
      disabled={undefined} // avoid native disabled so CSS :active still works in some browsers; we control interactions via pointer-events
      onClick={disabled ? undefined : onClick}
      className={clsx(base, variantClass, className)}
      style={disabled ? disabledStyle : undefined}
    >
      {children}
    </button>
  );
}
