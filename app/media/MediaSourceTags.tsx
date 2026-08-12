"use client";

import { useId } from "react";
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
  const tooltipId = useId();
  const visibleOutlets = outlets.slice(0, VISIBLE_SOURCE_LIMIT);
  const overflowOutlets = outlets.slice(VISIBLE_SOURCE_LIMIT);
  const overflowCount = overflowOutlets.length;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {visibleOutlets.map((outlet, index) => (
        <SourceTag key={`source-${index}`} outlet={outlet} />
      ))}

      {overflowCount > 0 && (
        <div className="relative group/more">
          <button
            type="button"
            className="inline-block px-2 py-1 text-sm font-medium rounded-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:opacity-80 transition-opacity cursor-default"
            aria-label={`${overflowCount} more sources`}
            aria-describedby={tooltipId}
          >
            +{overflowCount} more
          </button>

          <div
            id={tooltipId}
            role="tooltip"
            className="invisible opacity-0 group-hover/more:visible group-hover/more:opacity-100 group-focus-within/more:visible group-focus-within/more:opacity-100 transition-opacity absolute left-0 top-full z-20 mt-2 w-max max-w-xs sm:max-w-sm rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 shadow-lg"
          >
            <div className="flex flex-wrap gap-2">
              {overflowOutlets.map((outlet, index) => (
                <SourceTag
                  key={`source-overflow-${VISIBLE_SOURCE_LIMIT + index}`}
                  outlet={outlet}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
