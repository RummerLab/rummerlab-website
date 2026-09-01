import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ArticleCardLink {
  href: string;
  label: string;
  external?: boolean;
}

interface ArticleCardProps {
  title: string;
  href: string;
  date: string;
  formattedDate: string;
  excerpt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  imageAriaLabel?: string;
  index?: number;
  extraLinks?: ArticleCardLink[];
  children?: ReactNode;
}

export function ArticleCard({
  title,
  href,
  date,
  formattedDate,
  excerpt,
  coverImage,
  coverImageAlt,
  imageAriaLabel,
  index = 0,
  extraLinks = [],
  children,
}: ArticleCardProps) {
  return (
    <article
      className={cn(
        'view-reveal overflow-hidden rounded-xl border border-gray-200/60 bg-surface-elevated shadow-lg',
        'hover-lift transition-all duration-300 dark:border-gray-800/60',
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={cn(
          'flex flex-col gap-6 p-6 md:p-8',
          coverImage && 'sm:flex-row sm:items-stretch',
        )}
      >
        {coverImage && (
          <Link
            href={href}
            className="relative mx-auto aspect-16/10 w-full max-w-md shrink-0 overflow-hidden rounded-lg bg-gray-100 outline-offset-2 focus-visible:outline-2 focus-visible:outline-blue-500 dark:bg-gray-800 sm:mx-0 sm:aspect-4/5 sm:w-52 sm:max-w-none md:w-60 lg:w-64"
            aria-label={imageAriaLabel || title}
          >
            <Image
              src={coverImage}
              alt={coverImageAlt || title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              sizes="(max-width: 639px) 100vw, 256px"
            />
          </Link>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-4">
            <time className="text-sm text-gray-500 dark:text-gray-400" dateTime={date}>
              {formattedDate}
            </time>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            <Link
              href={href}
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              {title}
            </Link>
          </h2>

          {excerpt && (
            <div className="prose prose-gray mb-6 max-w-none dark:prose-invert">
              <p className="text-muted">{excerpt}</p>
            </div>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-4">
            <Link
              href={href}
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Read more →
            </Link>
            {extraLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  {link.label}
                </Link>
              ),
            )}
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
