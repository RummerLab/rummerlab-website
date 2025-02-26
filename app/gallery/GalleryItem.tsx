'use client';

import Image from "next/image";
import { useState } from "react";
import NoExtensionsWrapper from "../components/NoExtensionsWrapper";
import Lightbox from "../components/Lightbox";

interface GalleryItemProps {
    image: {
        src: string;
        alt: string;
        caption: string;
        credit: string;
    };
}

export default function GalleryItem({ image }: GalleryItemProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    return (
        <NoExtensionsWrapper>
            <div 
                className="group relative aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsLightboxOpen(true);
                    }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${image.alt} in fullscreen`}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                    priority
                    quality={85}
                    className={`
                        object-cover transition-transform duration-300 group-hover:scale-105
                        ${isLoaded ? 'opacity-100' : 'opacity-0'}
                    `}
                    onLoad={() => setIsLoaded(true)}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
                    <div className="p-4 space-y-2">
                        <p className="text-white text-sm" suppressHydrationWarning>
                            {image.caption}
                        </p>
                        <p className="text-gray-300 text-xs" suppressHydrationWarning>
                            {image.credit}
                        </p>
                    </div>
                </div>
            </div>

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                image={image}
            />
        </NoExtensionsWrapper>
    );
} 