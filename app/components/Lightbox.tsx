'use client';

import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface LightboxProps {
    isOpen: boolean;
    onClose: () => void;
    image: {
        src: string;
        alt: string;
        caption?: string;
        credit?: string;
    };
}

export default function Lightbox({ isOpen, onClose, image }: LightboxProps) {
    const [isPortrait, setIsPortrait] = useState(false);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        const checkOrientation = () => {
            setIsPortrait(window.innerHeight > window.innerWidth);
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
            checkOrientation();
            window.addEventListener('resize', checkOrientation);
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', checkOrientation);
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return createPortal(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
        >
            <div 
                className="relative w-full h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 z-50 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    onClick={onClose}
                    aria-label="Close lightbox"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className={`relative w-full ${isPortrait ? 'h-[60vh]' : 'aspect-[16/9]'} max-w-7xl mx-auto`}>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes={isPortrait ? '100vh' : '100vw'}
                        priority
                        quality={100}
                    />
                </div>

                {(image.caption || image.credit) && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-black/75 backdrop-blur-sm">
                        {image.caption && (
                            <p className="text-white text-sm sm:text-lg font-light mb-2 leading-relaxed">
                                {image.caption}
                            </p>
                        )}
                        {image.credit && (
                            <p className="text-gray-200 text-xs sm:text-sm font-light">
                                {image.credit}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
} 