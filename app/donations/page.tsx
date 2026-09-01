import SupportOurResearch from '../../components/SupportOurResearch';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';

export default function DonationsPage() {
  return (
    <PageShell>
      <PageHeader
        title="Support Our Research"
        subtitle='Help us protect marine ecosystems by supporting our "Baby Sharks in a Changing World" project.'
      />
      <SupportOurResearch />
    </PageShell>
  );
}
