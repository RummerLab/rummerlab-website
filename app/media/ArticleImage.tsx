'use client';

import { useState } from 'react';

interface ArticleImageProps {
    image: {
        url: string;
        alt: string;
    };
}

// Function to check if URL is a valid image
function isValidImageUrl(url: string): boolean {
    // Check for tracking pixels and analytics
    const trackingPatterns = [
        /count\.gif$/,
        /counter\.theconversation\.com/,
        /pixel\.(wp\.com|gif|jpg)$/,
        /tracking\.(gif|jpg|png)$/,
        /beacon\./,
        /analytics\./,
        /1x1\.(gif|jpg|png)$/,
        /pixel\.tracking\./,
        /stats\.wp\.com/
    ];
    
    return !trackingPatterns.some(pattern => pattern.test(url));
}

export function ArticleImage({ image }: ArticleImageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Don't render anything if it's not a valid image URL
    if (!isValidImageUrl(image.url) || imageError) {
        return null;
    }

    return (
        <>
            <div 
                className="relative aspect-square w-full md:w-64 group overflow-hidden cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={image.url}
                    alt={image.alt}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={() => setImageError(true)}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-sm">View full image</span>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
                        {/* Close button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(false);
                            }}
                            className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Close image"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={image.url}
                            alt={image.alt}
                            className="max-w-full max-h-[85vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
} 