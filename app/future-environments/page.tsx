import type { Metadata } from 'next';
import { ContentImage } from '@/components/ContentImage';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentCard } from '@/components/layout/ContentCard';

export const metadata: Metadata = {
    title: "Future Environments Research",
    description: 'Research on marine organisms in future ocean environments, focusing on climate change impacts and adaptation.',
}

export default function FutureEnvironments() {
    return (
        <PageShell>
            <PageHeader
                title="Future Ocean Environments"
                subtitle="Investigating how marine life will adapt and survive in future ocean conditions shaped by climate change."
            />

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <ContentCard reveal>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">RESEARCH THEME - Future Ocean Conditions</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p className="text-gray-600 dark:text-gray-300">Our research focuses on understanding how marine organisms will respond to future ocean conditions, particularly the combined effects of warming, acidification, and deoxygenation. We use cutting-edge techniques to simulate future ocean environments and study organismal responses across multiple generations.</p>
                            
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <ContentImage
                                    src="/images/gallery/epaulette-shark-coral-habitat-johnny-gaskell.jpg"
                                    alt="Coral reef habitat"
                                    className="rounded-lg"
                                />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">Research Focus Areas</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-2 text-gray-600 dark:text-gray-300">
                                    <span className="text-blue-600 dark:text-blue-400">→</span>
                                    Transgenerational acclimation to climate change
                                </li>
                                <li className="flex gap-2 text-gray-600 dark:text-gray-300">
                                    <span className="text-blue-600 dark:text-blue-400">→</span>
                                    Multiple stressor effects on marine organisms
                                </li>
                                <li className="flex gap-2 text-gray-600 dark:text-gray-300">
                                    <span className="text-blue-600 dark:text-blue-400">→</span>
                                    Adaptation potential in changing environments
                                </li>
                            </ul>

                            <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Current Projects</h3>
                                <p className="text-gray-600 dark:text-gray-300">We are currently investigating how marine species might adapt to multiple environmental stressors over multiple generations, providing crucial insights for conservation and management strategies.</p>
                            </div>
                        </div>
                    </ContentCard>

                    <ContentCard reveal>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Methodology & Approach</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <ContentImage
                                    src="/images/gallery/dr-rummer-wheeler-epaulette-shark-ultrasound-grumpy-turtle.jpg"
                                    alt="Advanced research techniques"
                                    className="rounded-lg"
                                />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">Our research employs state-of-the-art experimental systems to simulate future ocean conditions, combined with cutting-edge physiological and molecular techniques to understand organismal responses.</p>
                        </div>
                    </ContentCard>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <ContentCard reveal className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Key Findings</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 shrink-0">
                                    <ContentImage
                                        src="/images/gallery/epaulette-shark-hunting-behavior-laine.jpg"
                                        alt="Marine behavior studies"
                                        variant="sidebarSquare"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Adaptation Capacity</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Species-specific responses to environmental change</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 shrink-0">
                                    <ContentImage
                                        src="/images/gallery/epaulette-shark-embryo-development-rummerlab.jpg"
                                        alt="Development studies"
                                        variant="sidebarSquare"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Future Predictions</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Modeling marine ecosystem responses</p>
                                </div>
                            </li>
                        </ul>
                    </ContentCard>

                    <ContentCard reveal className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Conservation Implications</h3>
                        <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                            <ContentImage
                                src="/images/gallery/blacktip-shark-school-blue-water-french-polynesia-thiault.jpg"
                                alt="Marine life in future oceans"
                                variant="sidebarWide"
                                className="rounded-lg"
                            />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">Our findings help inform conservation strategies and policy decisions for protecting marine ecosystems in a changing climate.</p>
                    </ContentCard>
                </div>
            </div>
        </PageShell>
    );
}
