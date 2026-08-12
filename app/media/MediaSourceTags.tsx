"use client";

import { useId } from "react";
import type { MediaItem, MediaSource } from "@/types/media";

const VISIBLE_SOURCE_LIMIT = 4;

const getSourceColors = (sourceType: string): { bgColor: string; textColor: string } => {
  switch (sourceType) {
    case "The Conversation":
      return {
        bgColor: "bg-blue-100 dark:bg-blue-900",
        textColor: "text-blue-800 dark:text-blue-200",
      };
    case "The Guardian":
      return {
        bgColor: "bg-green-100 dark:bg-green-900",
        textColor: "text-green-800 dark:text-green-200",
      };
    default:
      return {
        bgColor: "bg-purple-100 dark:bg-purple-900",
        textColor: "text-purple-800 dark:text-purple-200",
      };
  }
};

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
  fallbackSourceType: MediaItem["sourceType"];
}

function SourceTag({ outlet, fallbackSourceType }: SourceTagProps) {
  const { bgColor, textColor } = getSourceColors(outlet.sourceType ?? fallbackSourceType);
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
  fallbackSourceType: MediaItem["sourceType"];
}

export function MediaSourceTags({ outlets, fallbackSourceType }: MediaSourceTagsProps) {
  const tooltipId = useId();
  const visibleOutlets = outlets.slice(0, VISIBLE_SOURCE_LIMIT);
  const overflowOutlets = outlets.slice(VISIBLE_SOURCE_LIMIT);
  const overflowCount = overflowOutlets.length;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {visibleOutlets.map((outlet, index) => (
        <SourceTag
          key={`${outlet.name}-${outlet.url ?? index}`}
          outlet={outlet}
          fallbackSourceType={fallbackSourceType}
        />
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
                  key={`${outlet.name}-${outlet.url ?? `overflow-${index}`}`}
                  outlet={outlet}
                  fallbackSourceType={fallbackSourceType}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
