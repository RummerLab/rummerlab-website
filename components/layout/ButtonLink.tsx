import Link from 'next/link';
import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type ButtonLinkVariant = 'primary' | 'secondary' | 'outline-white';

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonLinkVariant;
}

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    'bg-blue-600/90 text-white hover:bg-blue-600 shadow-lg hover:shadow-blue-500/30',
  secondary:
    'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-white/10',
  'outline-white':
    'border border-white/30 bg-transparent text-white hover:bg-white/10',
};

export function ButtonLink({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium transition-all duration-200',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
