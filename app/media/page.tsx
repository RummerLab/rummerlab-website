import type { Metadata } from "next";
import { DEFAULT_SCHOLAR_ID, fetchNewsPage } from "@/lib/news";
import { MediaCoverageList } from "./MediaCoverageList";

export const metadata: Metadata = {
    title: "Media | Dr. Jodie Rummer",
    description:
        "Media appearances, interviews, and news coverage featuring Dr. Jodie Rummer's research and expertise in marine biology and conservation.",
};

export default function MediaPage() {
    const page = fetchNewsPage({ scholarId: DEFAULT_SCHOLAR_ID, limit: 100, offset: 0 });

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Media Coverage
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Featured interviews, news coverage, and public engagement in marine science and
                    conservation.
                </p>
            </div>

            <section className="max-w-4xl mx-auto" aria-labelledby="latest-articles">
                <h2
                    id="latest-articles"
                    className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8"
                >
                    Latest Media Coverage
                </h2>
                <MediaCoverageList
                    initialItems={page.media}
                    initialTotal={page.total}
                    initialLimit={page.limit}
                    initialOffset={page.offset}
                />
            </section>
        </main>
    );
}
