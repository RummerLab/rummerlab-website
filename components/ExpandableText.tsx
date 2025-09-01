'use client';

import { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const ExpandableText = ({ text, maxLength = 200, className = '' }: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength) + '...';
  
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  if (!shouldTruncate) {
    return (
      <p className={`text-gray-700 dark:text-gray-300 ${className}`}>
        {text}
      </p>
    );
  }

  return (
    <div className={className}>
      <p className="text-gray-700 dark:text-gray-300">
        {displayText}
      </p>
      <button
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
        aria-label={isExpanded ? 'Show less' : 'Read more'}
        tabIndex={0}
      >
        {isExpanded ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
};

export default ExpandableText;
