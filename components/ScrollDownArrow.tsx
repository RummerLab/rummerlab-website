'use client';

import { useCallback } from 'react';

const ScrollDownArrow = () => {
  const handleClick = useCallback(() => {
    const missionSection = document.querySelector('section:nth-child(2)');
    missionSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const missionSection = document.querySelector('section:nth-child(2)');
      missionSection?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
      <div 
        className="animate-bounce cursor-pointer"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Scroll to mission section"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </div>
  );
};

export default ScrollDownArrow; 