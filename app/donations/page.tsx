import SupportOurResearch from '../../components/SupportOurResearch';

export default function DonationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Support Our Research
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Help us protect marine ecosystems by supporting our &quot;Baby Sharks in a Changing World&quot; project.
          </p>
        </div>
      </div>
      <SupportOurResearch />
    </div>
  );
}
