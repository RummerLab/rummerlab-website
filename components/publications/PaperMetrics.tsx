'use client';

import { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { HiTrendingUp } from 'react-icons/hi';
import { SiGooglescholar } from 'react-icons/si';

interface PaperMetricsProps {
  doi?: string;
  /** Fallback Scholar citation count from enrichment. */
  scholarCitationsFallback?: number;
}

interface MetricsState {
  crossref: number;
  altmetric: number;
  gscholar: number;
}

export const PaperMetrics = ({ doi, scholarCitationsFallback = 0 }: PaperMetricsProps) => {
  const [metrics, setMetrics] = useState<MetricsState>({
    crossref: 0,
    altmetric: 0,
    gscholar: scholarCitationsFallback,
  });

  useEffect(() => {
    if (!doi) return;

    let cancelled = false;

    const handleLoad = async () => {
      try {
        const response = await fetch(
          `/api/papers/metrics?doi=${encodeURIComponent(doi)}`,
          { headers: { Accept: 'application/json' } },
        );
        if (!response.ok) return;
        const data = (await response.json()) as Partial<MetricsState>;
        if (cancelled) return;
        setMetrics({
          crossref: typeof data.crossref === 'number' ? data.crossref : 0,
          altmetric: typeof data.altmetric === 'number' ? data.altmetric : 0,
          gscholar:
            typeof data.gscholar === 'number' && data.gscholar > 0
              ? data.gscholar
              : scholarCitationsFallback,
        });
      } catch {
        // Keep fallback Scholar citations if live metrics fail.
      }
    };

    void handleLoad();

    return () => {
      cancelled = true;
    };
  }, [doi, scholarCitationsFallback]);

  const items = [
    {
      key: 'crossref',
      value: metrics.crossref,
      label: 'Crossref',
      icon: FaQuoteLeft,
      className: 'text-blue-500',
      show: metrics.crossref > 0,
    },
    {
      key: 'altmetric',
      value: metrics.altmetric,
      label: 'Altmetric',
      icon: HiTrendingUp,
      className: 'text-emerald-500',
      show: metrics.altmetric > 0,
    },
    {
      key: 'gscholar',
      value: metrics.gscholar,
      label: 'GScholar',
      icon: SiGooglescholar,
      className: 'text-orange-500',
      show: metrics.gscholar > 0,
    },
  ].filter((item) => item.show);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4 lg:min-w-[7.5rem] lg:flex-col lg:items-end lg:gap-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.key} className="flex items-center gap-2 lg:justify-end">
            <Icon className={`h-4 w-4 ${item.className}`} aria-hidden="true" />
            <div className="text-center lg:text-right">
              <div className={`text-lg font-bold ${item.className}`}>
                {item.value.toLocaleString()}
              </div>
              <div className="text-xs text-muted">{item.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
