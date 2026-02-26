import sanitizeHtmlLib from 'sanitize-html';

/**
 * Allowed HTML tags for markdown-rendered prose (remark-html output).
 * Keeps structure and formatting, strips scripts and dangerous elements.
 */
const PROSE_ALLOWED_TAGS = [
  'p', 'br', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'strong', 'em', 'b', 'i', 'u', 's', 'sub', 'sup',
  'ul', 'ol', 'li',
  'a', 'code', 'pre',
  'blockquote', 'span', 'div',
  'img', 'figure', 'figcaption',
];

const PROSE_ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  a: ['href', 'title', 'class', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'class'],
  '*': ['class'],
};

const proseOptions = {
  allowedTags: PROSE_ALLOWED_TAGS,
  allowedAttributes: PROSE_ALLOWED_ATTRIBUTES,
};

/**
 * Sanitize HTML for safe use with dangerouslySetInnerHTML.
 * Use for blog/post content (markdown-rendered prose).
 * Defends against XSS; use with a strict CSP in depth.
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (html == null || html === '') return '';
  return sanitizeHtmlLib(html, proseOptions);
}

/**
 * Sanitize HTML with a minimal tag set (e.g. short descriptions).
 * Only allows span and p with class attribute.
 */
export function sanitizeHtmlMinimal(html: string | null | undefined): string {
  if (html == null || html === '') return '';
  return sanitizeHtmlLib(html, {
    allowedTags: ['span', 'p'],
    allowedAttributes: { '*': ['class'] },
  });
}
