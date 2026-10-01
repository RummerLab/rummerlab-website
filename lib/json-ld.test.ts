import { describe, expect, it } from 'vitest';
import { serializeJsonLd } from '@/lib/json-ld';

describe('serializeJsonLd', () => {
  it('produces valid JSON for simple objects', () => {
    const json = serializeJsonLd({ '@type': 'Organization', name: 'RummerLab' });
    expect(JSON.parse(json)).toEqual({ '@type': 'Organization', name: 'RummerLab' });
  });

  it('strips HTML from string leaves', () => {
    const json = serializeJsonLd({
      headline: 'Effects on <i>Carcharhinus melanopterus</i>',
      abstract: '<script>alert(1)</script>Safe abstract',
    });
    const parsed = JSON.parse(json) as { headline: string; abstract: string };
    expect(parsed.headline).toBe('Effects on Carcharhinus melanopterus');
    expect(parsed.abstract).toBe('Safe abstract');
    expect(json).not.toContain('<script');
    expect(json).not.toContain('</script');
  });

  it('does not emit raw HTML metacharacters that can break script context', () => {
    const json = serializeJsonLd({
      note: 'a < b & c > d</script><script>alert(1)</script>',
    });
    expect(json).not.toMatch(/[<>]/);
    expect(json.toLowerCase()).not.toContain('</script');
    // sanitize-html turns leftover <>& into entities; we then escape & for script safety.
    expect(json).toContain('\\u0026');
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it('recursively sanitizes nested arrays and objects', () => {
    const json = serializeJsonLd({
      authors: [{ name: '<b>Jodie L. Rummer</b>' }],
      tags: ['<em>physiology</em>', 'sharks'],
    });
    const parsed = JSON.parse(json) as {
      authors: { name: string }[];
      tags: string[];
    };
    expect(parsed.authors[0]?.name).toBe('Jodie L. Rummer');
    expect(parsed.tags).toEqual(['physiology', 'sharks']);
  });
});
