import { describe, expect, it } from 'vitest';
import { getPaperPlainTitle, sanitizePaperTitleHtml } from '@/lib/paper-title';

describe('sanitizePaperTitleHtml', () => {
  it('keeps italic scientific names and strips other tags', () => {
    const html = sanitizePaperTitleHtml(
      'Warming and <script>x</script><i>Carcharhinus melanopterus</i>',
    );
    expect(html).toContain('<i>Carcharhinus melanopterus</i>');
    expect(html).not.toContain('<script');
  });

  it('auto-italicizes known species names without markup', () => {
    const html = sanitizePaperTitleHtml('Physiology of Carcharhinus melanopterus juveniles');
    expect(html).toContain('<i>Carcharhinus melanopterus</i>');
  });
});

describe('getPaperPlainTitle', () => {
  it('strips all markup for plain-text contexts', () => {
    expect(getPaperPlainTitle('Effects on <i>Hemiscyllium ocellatum</i>')).toBe(
      'Effects on Hemiscyllium ocellatum',
    );
  });
});
