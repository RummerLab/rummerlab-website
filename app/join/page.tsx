import { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentCard } from '@/components/layout/ContentCard';
import { ButtonLink } from '@/components/layout/ButtonLink';

export const metadata: Metadata = {
  title: 'Join Our Lab | RummerLab',
  description:
    'Opportunities to join the RummerLab team - positions available for graduate students, postdocs, and undergraduate researchers.',
};

export default function JoinPage() {
  return (
    <PageShell narrow>
      <PageHeader
        title="Join Our Lab"
        subtitle="We are always looking for passionate and motivated individuals to join our team."
      />

      <div className="space-y-8">
        <ContentCard reveal>
          <p className="text-lg text-muted">
            Our lab offers a collaborative and supportive environment for researchers interested in
            studying physiological and evolutionary adaptations in fishes.
          </p>
        </ContentCard>

        <ContentCard reveal className="bg-blue-600 text-center dark:bg-blue-700">
          <h2 className="mb-4 text-2xl font-bold text-white">Join Our Team!</h2>
          <p className="mb-6 text-lg text-white">
            Are you interested in joining our lab? Fill this Google Form to apply:
          </p>
          <ButtonLink
            href="https://forms.gle/DDEBnssQk5ZQZgB98"
            target="_blank"
            rel="noopener"
            className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-gray-100 dark:text-blue-700"
          >
            Apply Now
          </ButtonLink>
        </ContentCard>

        <ContentCard reveal>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Available Positions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-gray-100">
                Graduate Students
              </h3>
              <p className="text-muted">
                We are accepting applications for PhD and MSc students interested in fish
                physiology, evolution, and climate change research. Successful candidates will have
                the opportunity to develop their own research projects within the lab&apos;s broader
                research themes.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-gray-100">
                Postdoctoral Fellows
              </h3>
              <p className="text-muted">
                We welcome inquiries from potential postdoctoral fellows. We encourage candidates to
                contact us with their research interests and to explore funding opportunities through
                NSERC and other agencies.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-medium text-gray-900 dark:text-gray-100">
                Undergraduate Students
              </h3>
              <p className="text-muted">
                We offer research opportunities for undergraduate students through work-study
                positions, summer research projects, and honors thesis projects. These positions are
                typically advertised at the beginning of each semester.
              </p>
            </div>
          </div>
        </ContentCard>

        <ContentCard reveal>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            How to Apply
          </h2>
          <p className="mb-4 text-muted">
            To apply for a position in our lab, please complete our online application form. Before
            starting, please have the following information ready:
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted">
            <li>Your current education level</li>
            <li>Intended education level when joining the lab</li>
            <li>Type of work/position you&apos;re interested in</li>
            <li>Preferred start date</li>
            <li>Expected end date at JCU</li>
            <li>CV/resume (PDF format, max 10MB)</li>
            <li>Any specific project ideas or additional information you&apos;d like to share</li>
          </ul>
          <div className="mt-6">
            <ButtonLink
              href="https://forms.gle/DDEBnssQk5ZQZgB98"
              target="_blank"
              rel="noopener"
              variant="secondary"
            >
              Complete the Application Form →
            </ButtonLink>
          </div>
        </ContentCard>

        <ContentCard reveal>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Our Lab Environment
          </h2>
          <p className="text-muted">
            We are committed to fostering an inclusive, supportive, and collaborative research
            environment. Our team values diversity and welcomes applications from members of
            underrepresented groups in science. We provide mentorship and professional development
            opportunities to help our team members achieve their career goals.
          </p>
        </ContentCard>

        <ContentCard reveal className="bg-blue-50/50 dark:bg-blue-900/10">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">Questions?</h2>
          <p className="text-muted">
            If you have any questions about joining our lab or would like to discuss potential
            opportunities, please don&apos;t hesitate to{' '}
            <a
              href="/contact"
              className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              contact us
            </a>
            .
          </p>
        </ContentCard>
      </div>
    </PageShell>
  );
}
