import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  children: ReactNode;
  className?: string;
  reveal?: boolean;
  style?: React.CSSProperties;
}

export function ContentCard({
  children,
  className,
  reveal = false,
  style,
}: ContentCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200/60 bg-surface-elevated p-8 shadow-lg dark:border-gray-800/60',
        'hover-lift transition-all duration-300',
        reveal && 'view-reveal',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
