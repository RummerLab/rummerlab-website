import type { MouseEventHandler, ReactNode } from 'react';

/** Classes for logo images that stay B&W until hover reveals original colour */
export const socialLogoImageClassName =
  'object-contain grayscale brightness-0 transition-all duration-200 group-hover:grayscale-0 group-hover:brightness-100 dark:invert dark:group-hover:invert-0';

type SocialIconLinkProps = {
  href: string;
  ariaLabel: string;
  title?: string;
  children: ReactNode;
  /** Tailwind hover text colour for monochrome brand icons, e.g. hover:text-[#E4405F] */
  hoverColorClass?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  /** Enables group-hover filters for nested logo images */
  isLogo?: boolean;
};

export const SocialIconLink = ({
  href,
  ariaLabel,
  title,
  children,
  hoverColorClass = 'hover:text-blue-600 dark:hover:text-blue-400',
  onClick,
  className = '',
  isLogo = false,
}: SocialIconLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      title={title}
      onClick={onClick}
      tabIndex={0}
      className={[
        'inline-flex items-center justify-center text-gray-500 opacity-60 transition-all duration-200',
        'hover:opacity-100 focus-visible:opacity-100',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        'dark:text-gray-400',
        isLogo ? 'group' : hoverColorClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </a>
  );
};
