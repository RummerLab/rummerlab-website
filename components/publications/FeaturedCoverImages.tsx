import Image from 'next/image';
import { HiExternalLink } from 'react-icons/hi';
import {
  publicationCovers,
  type PublicationCover,
} from '@/data/publication-covers';
import { cn } from '@/lib/utils';

const CoverCard = ({ cover }: { cover: PublicationCover }) => {
  const content = (
    <>
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        {cover.image ? (
          <Image
            src={cover.image}
            alt={`${cover.journal} — ${cover.issue}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 280px"
            quality={85}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={cn(
              'flex h-full flex-col justify-between bg-gradient-to-br p-5 text-white',
              cover.accent,
            )}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
                Featured cover
              </p>
              <p className="mt-6 text-2xl font-bold leading-tight">{cover.journal}</p>
              <p className="mt-2 text-sm opacity-90">{cover.issue}</p>
            </div>
            <p className="text-sm font-medium opacity-90">{cover.year}</p>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
          {cover.journal}
        </h3>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{cover.issue}</p>
        <p className="text-sm leading-relaxed text-muted">{cover.description}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
          View article
          <HiExternalLink className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
    </>
  );

  return (
    <a
      href={cover.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group view-reveal block rounded-xl border border-gray-200/60 bg-surface-elevated p-4 shadow-sm hover-lift dark:border-gray-800/60"
      aria-label={`${cover.journal} cover: ${cover.description}`}
      tabIndex={0}
    >
      {content}
    </a>
  );
};

export const FeaturedCoverImages = () => {
  if (publicationCovers.length === 0) return null;

  return (
    <section className="mt-20" aria-labelledby="featured-covers-heading">
      <div className="mb-8 text-center">
        <h2
          id="featured-covers-heading"
          className="text-3xl font-bold tracking-wide text-gray-900 dark:text-gray-100 sm:text-4xl"
        >
          Featured Cover Images
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">
          Research from the lab has been featured in leading scientific journals.
        </p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {publicationCovers.map((cover) => (
          <CoverCard key={`${cover.journal}-${cover.year}`} cover={cover} />
        ))}
      </div>
    </section>
  );
};
