import { serializeJsonLd } from '@/lib/json-ld';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export { serializeJsonLd } from '@/lib/json-ld';

export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
  />
);
