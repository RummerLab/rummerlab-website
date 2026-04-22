"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Publication } from "@/types/scholarly";

type PublicationsPage = {
  total: number;
  limit: number;
  offset: number;
  publications: Publication[];
};

type Props = {
  scholarId: string;
  initialPage: PublicationsPage;
};

export function PublicationsList(props: Props) {
  const { scholarId, initialPage } = props;

  const [publications, setPublications] = useState<Publication[]>(initialPage.publications);
  const [total, setTotal] = useState<number>(initialPage.total);
  const [limit, setLimit] = useState<number>(initialPage.limit);
  const [offset, setOffset] = useState<number>(initialPage.offset);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const sortedPublications = useMemo(() => {
    return [...publications].sort((a, b) => {
      const yearA = Number(a?.bib?.pub_year) || 0;
      const yearB = Number(b?.bib?.pub_year) || 0;
      return yearB - yearA;
    });
  }, [publications]);

  const hasMore = publications.length < total;

  const handleLoadMore = async () => {
    if (!hasMore) return;
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextOffset = offset + limit;
      const response = await fetch(
        `/api/scholar/${encodeURIComponent(scholarId)}/publications?limit=${encodeURIComponent(
          String(limit)
        )}&offset=${encodeURIComponent(String(nextOffset))}`,
        { headers: { Accept: "application/json" } }
      );

      if (!response.ok) {
        setIsLoadingMore(false);
        return;
      }

      const data = (await response.json()) as Partial<PublicationsPage>;
      const newPubs = Array.isArray(data.publications) ? (data.publications as Publication[]) : [];
      if (newPubs.length === 0) {
        setIsLoadingMore(false);
        return;
      }

      setPublications((prev) => [...prev, ...newPubs]);
      setTotal(typeof data.total === "number" ? data.total : total);
      setLimit(typeof data.limit === "number" ? data.limit : limit);
      setOffset(typeof data.offset === "number" ? data.offset : nextOffset);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-8">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Publications</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {total > 0 ? `${total} Scientific Papers` : `${publications.length} Scientific Papers`}
        </p>
      </div>

      {sortedPublications.length > 0 && (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPublications.map((publication, index) => {
              const authorPubId = publication?.author_pub_id ?? "";
              const publicationId = authorPubId.split(":")[0] || `pub-${index}`;
              const publicationUrl = authorPubId
                ? `https://scholar.google.com/citations?view_op=view_citation&hl=en&user=${publicationId}&citation_for_view=${publication.author_pub_id}`
                : "#";

              const citationsUrl = `https://scholar.google.com/scholar?cites=${publicationId}`;

              const authorStr = publication?.bib?.author ?? "";
              const authors = authorStr ? authorStr.split(" and ").map((a) => a.trim()) : [];
              const formattedAuthors =
                authors.length > 4 ? `${authors[0]}, et al.` : authors.length > 0 ? authors.join(", ") : "Unknown";

              const bib = publication?.bib ?? {};
              const title = bib.title ?? "Untitled";
              const journalOrBook = bib.journal ?? bib.booktitle ?? "Publication";
              const pubYear = bib.pub_year ?? "";

              return (
                <li
                  key={publication?.author_pub_id ?? publicationId ?? index}
                  className="bg-gray-50 dark:bg-gray-800 shadow-lg rounded-xl p-6 list-none transition-all duration-200 hover:shadow-xl h-full flex flex-col"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
                  <div className="mb-3 grow">
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{formattedAuthors}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">{journalOrBook}</span>
                      {bib.volume && `, Volume ${bib.volume}`}
                      {bib.number && `, Issue ${bib.number}`}
                      {bib.pages && `, Pages ${bib.pages}`}
                      {pubYear ? ` (${pubYear})` : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <Link
                        href={citationsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        {publication?.num_citations ?? 0} citations
                      </Link>
                    </div>
                    <Link
                      href={publicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      View Publication
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>

          {hasMore && (
            <div className="max-w-3xl mx-auto pt-8">
              <button
                type="button"
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                aria-label="Load more publications"
              >
                {isLoadingMore ? "Loading…" : "Load more"}
              </button>
              <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
                Showing {publications.length} of {total}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

