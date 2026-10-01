'use client';

import { FaQuoteLeft } from 'react-icons/fa';
import { HiTrendingUp } from 'react-icons/hi';
import { SiGooglescholar } from 'react-icons/si';
import type { PaperMetrics as PaperMetricsData } from '@/lib/paper-metrics';

interface PaperMetricsProps {
  metrics: PaperMetricsData | null;
}

export const PaperMetrics = ({ metrics }: PaperMetricsProps) => {
  if (!metrics) return null;

  const items = [
    {
      key: 'crossref',
      value: metrics.crossref,
      label: 'Crossref',
      icon: FaQuoteLeft,
      className: 'text-blue-500 dark:text-blue-400',
      show: metrics.crossref > 0,
    },
    {
      key: 'altmetric',
      value: metrics.altmetric,
      label: 'Altmetric',
      icon: HiTrendingUp,
      className: 'text-emerald-500 dark:text-emerald-400',
      show: metrics.altmetric > 0,
    },
    {
      key: 'gscholar',
      value: metrics.gscholar,
      label: 'GScholar',
      icon: SiGooglescholar,
      className: 'text-orange-500 dark:text-orange-400',
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
