// https://nextui.org/docs/components/card
// https://mui.com/material-ui/react-card/
// Cards for news, publications, and radio interviews.

import Image from "next/image";
import { mediaItems, getFeaturedMedia, getMediaByType } from "@/data/media";

export const metadata = {
    title: "Media | Dr. Jodie Rummer",
    description: 'Media appearances, interviews, and news coverage featuring Dr. Jodie Rummer\'s research and expertise in marine biology and conservation.',
}

export default function MediaPage() {
    const featuredMedia = getFeaturedMedia(3);
    const interviews = getMediaByType('interview');
    const podcasts = getMediaByType('podcast');
    const pressReleases = getMediaByType('press');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Media Coverage</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    Featured interviews, news coverage, and public engagement in marine science and conservation.
                </p>
            </div>

            {/* Featured Media */}
            <div className="max-w-3xl mx-auto mb-16">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Featured Coverage</h2>
                <div className="grid gap-8">
                    {featuredMedia.map((item, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                            <span className={`inline-block px-2 py-1 text-sm font-medium rounded mb-4 ${
                                item.sourceType === 'The Conversation' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                                item.sourceType === 'ABC News' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                                item.sourceType === 'Science Podcast' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                                'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                            }`}>
                                {item.source}
                            </span>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                <a 
                                    href={item.url}
                                    className="hover:text-blue-600 dark:hover:text-blue-400"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {item.title}
                                </a>
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {item.description}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                {new Date(item.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Interviews */}
            {interviews.length > 0 && (
                <div className="max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Recent Interviews</h2>
                    <div className="grid gap-8">
                        {interviews.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                                <span className="inline-block px-2 py-1 text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded mb-4">
                                    {item.source}
                                </span>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    <a 
                                        href={item.url}
                                        className="hover:text-blue-600 dark:hover:text-blue-400"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {item.title}
                                    </a>
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {item.description}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                    {new Date(item.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Podcasts */}
            {podcasts.length > 0 && (
                <div className="max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Podcast Appearances</h2>
                    <div className="grid gap-8">
                        {podcasts.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                                <span className="inline-block px-2 py-1 text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded mb-4">
                                    {item.source}
                                </span>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    <a 
                                        href={item.url}
                                        className="hover:text-blue-600 dark:hover:text-blue-400"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {item.title}
                                    </a>
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {item.description}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                    {new Date(item.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Press Releases */}
            {pressReleases.length > 0 && (
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Press Releases</h2>
                    <div className="grid gap-8">
                        {pressReleases.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                                <span className="inline-block px-2 py-1 text-sm font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded mb-4">
                                    {item.source}
                                </span>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                    <a 
                                        href={item.url}
                                        className="hover:text-blue-600 dark:hover:text-blue-400"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {item.title}
                                    </a>
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {item.description}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                    {new Date(item.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}