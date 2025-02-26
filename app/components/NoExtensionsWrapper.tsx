'use client';

interface NoExtensionsWrapperProps {
    children: React.ReactNode;
}

export default function NoExtensionsWrapper({ children }: NoExtensionsWrapperProps) {
    return (
        <div 
            data-gramm="false" 
            data-gramm_editor="false" 
            data-enable-grammarly="false"
            suppressHydrationWarning
        >
            {children}
        </div>
    );
} 