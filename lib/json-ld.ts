import sanitizeHtml from 'sanitize-html';

/** Strip markup from string leaves so stored paper metadata cannot inject HTML. */
const sanitizeJsonLdValue = (value: unknown): unknown => {
  if (typeof value === 'string') {
    return sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeJsonLdValue);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, child]) => [
        key,
        sanitizeJsonLdValue(child),
      ]),
    );
  }
  return value;
};

/**
 * Serialize JSON-LD for embedding inside a `<script>` element.
 * Strings are sanitize-html stripped, then HTML-sensitive characters are
 * escaped so values cannot break out of the script context (js/stored-xss).
 */
export const serializeJsonLd = (data: unknown): string =>
  JSON.stringify(sanitizeJsonLdValue(data))
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
