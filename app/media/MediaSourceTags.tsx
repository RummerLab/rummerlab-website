"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaSource } from "@/types/media";
import { getSourceTagColors } from "./sourceTagColors";

const VISIBLE_SOURCE_LIMIT = 4;

const hasValidUrl = (url?: string): boolean => {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

interface SourceTagProps {
  outlet: MediaSource;
}

function SourceTag({ outlet }: SourceTagProps) {
  const { bgColor, textColor } = getSourceTagColors(outlet.name);
  const tagClassName = `inline-block px-2 py-1 text-sm font-medium ${bgColor} ${textColor} rounded-sm`;

  if (!hasValidUrl(outlet.url)) {
    return <span className={tagClassName}>{outlet.name}</span>;
  }

  return (
    <a
      href={outlet.url}
      className={`${tagClassName} hover:opacity-80 transition-opacity`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${outlet.name} (opens in new tab)`}
    >
      {outlet.name}
    </a>
  );
}

interface MediaSourceTagsProps {
  outlets: MediaSource[];
}

export function MediaSourceTags({ outlets }: MediaSourceTagsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleOutlets = outlets.slice(0, VISIBLE_SOURCE_LIMIT);
  const overflowCount = Math.max(0, outlets.length - VISIBLE_SOURCE_LIMIT);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      if (!rootRef.current?.contains(target)) {
        setIsExpanded(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded((open) => !open);
  };

  return (
    <div ref={rootRef} className="flex flex-wrap gap-2 mb-4">
      {visibleOutlets.map((outlet, index) => (
        <SourceTag key={`source-${index}`} outlet={outlet} />
      ))}

      {overflowCount > 0 && (
        <button
          type="button"
          className="inline-block px-2 py-1 text-sm font-medium rounded-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:opacity-80 transition-opacity"
          aria-expanded={isExpanded}
          aria-label={
            isExpanded
              ? "Hide additional sources"
              : `Show ${overflowCount} more sources`
          }
          onClick={handleToggle}
        >
          {isExpanded ? "Show less" : `+${overflowCount} more`}
        </button>
      )}

      {isExpanded &&
        outlets.slice(VISIBLE_SOURCE_LIMIT).map((outlet, index) => (
          <SourceTag
            key={`source-overflow-${VISIBLE_SOURCE_LIMIT + index}`}
            outlet={outlet}
          />
        ))}
    </div>
  );
}
