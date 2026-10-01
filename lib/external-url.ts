/**
 * Turn a website field into an absolute http(s) URL.
 * Bare domains like `sharkmeasurements.com` become `https://sharkmeasurements.com`.
 * Returns null for empty / unsafe values.
 */
export const toAbsoluteHttpUrl = (value: string | undefined | null): string | null => {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^(mailto:|tel:|javascript:)/i.test(trimmed)) return null;

  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    if (candidate.startsWith('//')) {
      candidate = `https:${candidate}`;
    } else if (candidate.startsWith('/')) {
      // Same-origin path — leave for callers that need internal links.
      return candidate;
    } else {
      candidate = `https://${candidate.replace(/^\/+/, '')}`;
    }
  }

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed.toString();
  } catch {
    return null;
  }
};

/**
 * Bluesky profile URL from a handle (`@user.bsky.social`), bare handle, or full URL.
 */
export const getBlueskyProfileUrl = (value: string | undefined | null): string | null => {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    return toAbsoluteHttpUrl(trimmed);
  }

  const handle = trimmed.replace(/^@/, '');
  if (!handle || /[<>"'\s]/.test(handle)) return null;
  return `https://bsky.app/profile/${handle}`;
};
