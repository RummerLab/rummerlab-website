'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ArticleImageProps {
    image: {
        url: string;
        alt: string;
    };
}

// Function to check if URL is a valid image
function isValidImageUrl(url: string): boolean {
    if (!url || typeof url !== 'string') {
        return false;
    }

    // Check for tracking pixels and analytics
    const trackingPatterns = [
        /count\.gif$/,
        /counter\.theconversation\.com/,
        /pixel\.(wp\.com|gif|jpg|png)$/,
        /tracking\.(gif|jpg|png)$/,
        /beacon\./,
        /analytics\./,
        /1x1\.(gif|jpg|png)$/,
        /pixel\.tracking\./,
        /stats\.wp\.com/,
        /placeholder\./,
        /blank\./,
        /transparent\./,
        /facebook\.com\/tr\?/,
        /doubleclick\./,
        /googleusercontent\.com/,
        /news\.google\.com/,
        /google\.com/
    ];
    
    // Check if it's a valid image URL
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
    const hasValidExtension = imageExtensions.test(url);
    
    // Allowlist hosts that often serve images without file extensions
    const allowedHostsWithoutExtensions = [
        'images.theconversation.com',
        'media.guim.co.uk',
        'imageio.forbes.com',
        'live-production.wcms.abc-cdn.net.au',
        'abc-cdn.net.au', // wildcard covered below
        'googleusercontent.com',
        'wp.com',
        'wordpress.com',
        'cloudfront.net',
        'amazonaws.com',
        'cosmosmagazine.com',
        'forbesimg.com',
        'oceanographicmagazine.com',
    ];

    // Check if it's not a tracking pixel
    const isNotTracking = !trackingPatterns.some(pattern => pattern.test(url));
    
    // Additional check for Google News icons and other unwanted images
    const unwantedPatterns = [
        /icon/,
        /logo/,
        /avatar/,
        /banner/,
        /button/,
        /ad/
    ];
    const isNotUnwanted = !unwantedPatterns.some(pattern => pattern.test(url.toLowerCase()));
    
    // Check if it's a valid URL
    try {
        const parsed = new URL(url);
        const hostname = parsed.hostname.toLowerCase();
        const isAllowedHost = allowedHostsWithoutExtensions.some(h => hostname.endsWith(h));
        return (hasValidExtension && isNotTracking && isNotUnwanted) || isAllowedHost;
    } catch {
        return false;
    }
}

export function ArticleImage({ image }: ArticleImageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Debug: Log what we received
    console.log(`ArticleImage received:`, image);
    console.log(`isValidImageUrl result:`, isValidImageUrl(image.url));

    // Don't render anything if it's not a valid image URL
    if (!isValidImageUrl(image.url) || imageError) {
        console.log(`ArticleImage not rendering - isValidImageUrl: ${isValidImageUrl(image.url)}, imageError: ${imageError}`);
        return null;
    }

    return (
        <>
            <div 
                className="relative aspect-square w-full md:w-64 group overflow-hidden cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 256px"
                    onError={() => {
                        console.log(`Thumbnail image failed to load: ${image.url}`);
                        setImageError(true);
                    }}
                    unoptimized={true}
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
                        <Image
                            src={image.url}
                            alt={image.alt}
                            width={800}
                            height={600}
                            className="max-w-full max-h-[85vh] object-contain"
                            unoptimized={true}
                            onError={() => {
                                console.log(`Modal image failed to load: ${image.url}`);
                                setImageError(true);
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
} 