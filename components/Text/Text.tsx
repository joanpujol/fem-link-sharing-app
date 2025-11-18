import { ReactNode, ElementType } from 'react';
import { typography, TypographyPreset } from './typographyStyles';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  preset?: TypographyPreset;
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function Text({
  preset = 'preset1',
  as: Component = 'p',
  className = '',
  children,
  ...props
}: TextProps) {
  return (
    <Component className={`${typography[preset]} ${className}`} {...props}>
      {children}
    </Component>
  );
}
