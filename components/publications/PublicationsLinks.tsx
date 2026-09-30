import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import {
  JODIE_SCHOLAR_PROFILE_URL,
  RUMMERLAB_GITHUB_URL,
} from '@/lib/paper-shared';
import type { ScholarProfileMetrics } from '@/lib/scholar-profile';

interface PublicationsLinksProps {
  metrics: ScholarProfileMetrics;
  paperCount: number;
}

export const PublicationsLinks = ({ metrics, paperCount }: PublicationsLinksProps) => {
  const statItems = [
    { label: 'Citations', value: metrics.citedby },
    { label: 'h-index', value: metrics.hindex },
    { label: 'i10-index', value: metrics.i10index },
    { label: 'PDFs', value: paperCount },
  ];

  return (
    <section className="mb-10 space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          href={JODIE_SCHOLAR_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-lift group flex items-center gap-4 rounded-2xl border border-gray-200/70 bg-white/80 p-5 transition-colors dark:border-gray-800 dark:bg-gray-900/70"
          aria-label="Open Jodie Rummer Google Scholar profile"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
            <SiGooglescholar className="h-7 w-7" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
              Google Scholar
            </span>
            <span className="mt-1 block text-sm text-muted">
              Full publication list and citation metrics for {metrics.name}
            </span>
          </span>
        </Link>

        <Link
          href={RUMMERLAB_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-lift group flex items-center gap-4 rounded-2xl border border-gray-200/70 bg-white/80 p-5 transition-colors dark:border-gray-800 dark:bg-gray-900/70"
          aria-label="Open RummerLab on GitHub"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            <FaGithub className="h-7 w-7" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-50 dark:group-hover:text-blue-400">
              GitHub
            </span>
            <span className="mt-1 block text-sm text-muted">
              RummerLab code, websites, and open research tools
            </span>
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200/60 bg-gray-50/70 px-4 py-3 text-center dark:border-gray-800 dark:bg-gray-900/50"
          >
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stat.value.toLocaleString()}
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
