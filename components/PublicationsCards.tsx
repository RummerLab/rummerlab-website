import { getPublicationsPage } from "@/lib/scholarly";
import type { Publication } from "@/types/scholarly";
import { PublicationsList } from "@/components/PublicationsList";

export const revalidate = 86400;

export async function PublicationsCards() {
  const scholarId = "ynWS968AAAAJ";
  const page = await getPublicationsPage({ scholarId, limit: 50, offset: 0 });
  const publications = (page.publications ?? []) as Publication[];

  return (
    <PublicationsList
      scholarId={scholarId}
      initialPage={{
        total: page.total ?? publications.length,
        limit: page.limit ?? 50,
        offset: page.offset ?? 0,
        publications,
      }}
    />
  );
}
