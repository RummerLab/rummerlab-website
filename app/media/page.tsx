import { fetchAllNews } from "@/services/news";
import { MediaItem } from "@/types/media";
import { ArticleImage } from "./ArticleImage";

export const metadata = {
    title: "Media | Dr. Jodie Rummer",
    description: 'Media appearances, interviews, and news coverage featuring Dr. Jodie Rummer\'s research and expertise in marine biology and conservation.',
}

// Set revalidation to one week
export const revalidate = 604800;

// Get source-specific color classes
function getSourceColors(sourceType: string): { bgColor: string; textColor: string } {
    switch (sourceType) {
        case 'The Conversation':
            return {
                bgColor: 'bg-blue-100 dark:bg-blue-900',
                textColor: 'text-blue-800 dark:text-blue-200'
            };
        case 'The Guardian':
            return {
                bgColor: 'bg-green-100 dark:bg-green-900',
                textColor: 'text-green-800 dark:text-green-200'
            };
        default:
            return {
                bgColor: 'bg-purple-100 dark:bg-purple-900',
                textColor: 'text-purple-800 dark:text-purple-200'
            };
    }
}

export default async function MediaPage() {
    const newsArticles = await fetchAllNews();

    // Get the latest 10 articles regardless of source
    const latestArticles = newsArticles
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Media Coverage</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Featured interviews, news coverage, and public engagement in marine science and conservation.
                </p>
            </div>

            {/* Latest Articles */}
            <section 
                className="max-w-4xl mx-auto"
                aria-labelledby="latest-articles"
            >
                <h2 
                    id="latest-articles"
                    className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8"
                >
                    Latest Media Coverage
                </h2>
                <div className="grid gap-8">
                    {latestArticles.map((article, index) => {
                        const { bgColor, textColor } = getSourceColors(article.sourceType);
                        
                        return (
                            <article 
                                key={`${article.sourceType}-${index}`}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {article.image && (
                                        <ArticleImage image={article.image} />
                                    )}
                                    <div className={`flex-1 p-6`}>
                                        <span className={`inline-block px-2 py-1 text-sm font-medium ${bgColor} ${textColor} rounded mb-4`}>
                                            {article.source}
                                        </span>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                            {article.image ? (
                                                <a 
                                                    href={article.url}
                                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {article.title}
                                                </a>
                                            ) : (
                                                <span>{article.title}</span>
                                            )}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                                            {article.description}
                                        </p>
                                        <time 
                                            dateTime={new Date(article.date).toISOString()}
                                            className="block text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            {new Date(article.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </time>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}