"use client";

import { useMemo, useState } from "react";
import type { MediaItem } from "@/types/media";
import { ArticleImage } from "./ArticleImage";

const DEFAULT_LIMIT = 100;

function getSourceColors(sourceType: string): { bgColor: string; textColor: string } {
  switch (sourceType) {
    case "The Conversation":
      return {
        bgColor: "bg-blue-100 dark:bg-blue-900",
        textColor: "text-blue-800 dark:text-blue-200",
      };
    case "The Guardian":
      return {
        bgColor: "bg-green-100 dark:bg-green-900",
        textColor: "text-green-800 dark:text-green-200",
      };
    default:
      return {
        bgColor: "bg-purple-100 dark:bg-purple-900",
        textColor: "text-purple-800 dark:text-purple-200",
      };
  }
}

type Props = {
  scholarId: string;
  initialItems: MediaItem[];
  initialTotal: number;
  initialLimit?: number;
  initialOffset?: number;
};

export function MediaCoverageList(props: Props) {
  const { scholarId, initialItems, initialTotal, initialLimit = DEFAULT_LIMIT, initialOffset = 0 } = props;

  const [items, setItems] = useState<MediaItem[]>(initialItems);
  const [total, setTotal] = useState<number>(initialTotal);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [offset, setOffset] = useState<number>(initialOffset);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const hasMore = items.length < total;

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [items]);

  const handleLoadMore = async () => {
    if (!hasMore) return;
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextOffset = offset + limit;
      const response = await fetch(
        `/api/scholar/${encodeURIComponent(scholarId)}/news?limit=${encodeURIComponent(
          String(limit)
        )}&offset=${encodeURIComponent(String(nextOffset))}`,
        { headers: { Accept: "application/json" } }
      );

      if (!response.ok) {
        setIsLoadingMore(false);
        return;
      }

      const data = (await response.json()) as {
        total?: number;
        limit?: number;
        offset?: number;
        media?: MediaItem[];
      };

      const newItems = Array.isArray(data.media) ? data.media : [];
      if (newItems.length === 0) {
        setIsLoadingMore(false);
        return;
      }

      setItems((prev) => [...prev, ...newItems]);
      setTotal(typeof data.total === "number" ? data.total : total);
      setLimit(typeof data.limit === "number" ? data.limit : limit);
      setOffset(typeof data.offset === "number" ? data.offset : nextOffset);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="grid gap-8">
      {sortedItems.map((article, index) => {
        const { bgColor, textColor } = getSourceColors(article.sourceType);

        return (
          <article
            key={`${article.sourceType}-${article.url}-${index}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xs overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {article.image && <ArticleImage image={article.image} />}
              <div className="flex-1 p-6">
                <span
                  className={`inline-block px-2 py-1 text-sm font-medium ${bgColor} ${textColor} rounded-sm mb-4`}
                >
                  {article.source}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  <a
                    href={article.url}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{article.description}</p>
                <time
                  dateTime={new Date(article.date).toISOString()}
                  className="block text-sm text-gray-500 dark:text-gray-400"
                >
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </article>
        );
      })}

      {hasMore && (
        <div className="pt-2">
          <button
            type="button"
            className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            aria-label="Load more media coverage"
          >
            {isLoadingMore ? "Loading…" : "Load more"}
          </button>
          <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
            Showing {items.length} of {total}
          </p>
        </div>
      )}
    </div>
  );
}

