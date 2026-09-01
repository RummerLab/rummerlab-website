import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageShellProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  wide?: boolean;
}

export function PageShell({ children, className, narrow = false, wide = false }: PageShellProps) {
  return (
    <div
      className={cn(
        'min-h-[calc(100vh-4rem)] bg-linear-to-b from-gray-50/80 to-white dark:from-gray-950 dark:to-gray-900',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto px-4 py-12 sm:px-6 lg:px-8',
          wide ? 'max-w-[1920px]' : narrow ? 'max-w-4xl' : 'max-w-7xl',
        )}
      >
        {children}
      </div>
    </div>
  );
}
