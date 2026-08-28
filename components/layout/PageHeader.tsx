import Image from 'next/image';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoClassName?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  logoSrc,
  logoAlt = '',
  logoClassName,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('mx-auto mb-12 max-w-3xl text-center', className)}>
      <div className="animate-fade-in-up flex flex-col items-center justify-center space-y-6">
        {logoSrc && (
          <div className={cn('relative h-48 w-48', logoClassName)}>
            <Image
              src={logoSrc}
              alt={logoAlt}
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
        <div className="h-1 animate-accent-grow rounded-full bg-blue-500" />
        {subtitle && (
          <p className="text-xl text-muted">{subtitle}</p>
        )}
        {children}
      </div>
    </header>
  );
}
