import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sanitizes a slug for safe use in URL paths.
 * Only allows alphanumeric characters, hyphens, underscores, and dots.
 * Removes or replaces any potentially unsafe characters.
 * 
 * @param slug - The slug string to sanitize
 * @returns A sanitized slug safe for use in URLs
 */
export function sanitizeSlugForUrl(slug: string): string {
  if (!slug || typeof slug !== 'string') {
    return '';
  }
  
  // Remove any path traversal attempts, slashes, and other unsafe characters
  // Only allow alphanumeric, hyphens, underscores, and dots (for file extensions in slugs)
  const sanitized = slug
    .replace(/[^a-zA-Z0-9\-_.]/g, '') // Remove any character that's not alphanumeric, hyphen, underscore, or dot
    .replace(/\.\./g, '') // Remove path traversal attempts
    .replace(/^[./]+|[./]+$/g, ''); // Remove leading/trailing dots and slashes
  
  return sanitized || '';
}
