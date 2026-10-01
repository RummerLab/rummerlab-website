import { describe, expect, it } from 'vitest';
import { getBlueskyProfileUrl, toAbsoluteHttpUrl } from '@/lib/external-url';

describe('toAbsoluteHttpUrl', () => {
  it('prefixes bare domains with https', () => {
    expect(toAbsoluteHttpUrl('sharkmeasurements.com')).toBe('https://sharkmeasurements.com/');
  });

  it('keeps existing https URLs', () => {
    expect(toAbsoluteHttpUrl('https://jodierummer.com')).toBe('https://jodierummer.com/');
  });

  it('keeps existing http URLs', () => {
    expect(toAbsoluteHttpUrl('http://example.com/path')).toBe('http://example.com/path');
  });

  it('preserves same-origin paths', () => {
    expect(toAbsoluteHttpUrl('/papers/example.pdf')).toBe('/papers/example.pdf');
  });

  it('rejects empty, javascript, and mailto values', () => {
    expect(toAbsoluteHttpUrl('')).toBeNull();
    expect(toAbsoluteHttpUrl('   ')).toBeNull();
    expect(toAbsoluteHttpUrl(null)).toBeNull();
    expect(toAbsoluteHttpUrl('javascript:alert(1)')).toBeNull();
    expect(toAbsoluteHttpUrl('mailto:test@example.com')).toBeNull();
  });

  it('handles protocol-relative URLs', () => {
    expect(toAbsoluteHttpUrl('//cdn.example.com/a')).toBe('https://cdn.example.com/a');
  });
});

describe('getBlueskyProfileUrl', () => {
  it('maps @handles to bsky.app profile URLs', () => {
    expect(getBlueskyProfileUrl('@physiologyfish.bsky.social')).toBe(
      'https://bsky.app/profile/physiologyfish.bsky.social',
    );
  });

  it('maps bare handles to bsky.app profile URLs', () => {
    expect(getBlueskyProfileUrl('shamildebaere.bsky.social')).toBe(
      'https://bsky.app/profile/shamildebaere.bsky.social',
    );
  });

  it('passes through absolute profile URLs', () => {
    expect(getBlueskyProfileUrl('https://bsky.app/profile/physiologyfish.bsky.social')).toBe(
      'https://bsky.app/profile/physiologyfish.bsky.social',
    );
  });

  it('rejects empty or unsafe handles', () => {
    expect(getBlueskyProfileUrl('')).toBeNull();
    expect(getBlueskyProfileUrl('bad handle')).toBeNull();
    expect(getBlueskyProfileUrl('evil<script>')).toBeNull();
  });
});
