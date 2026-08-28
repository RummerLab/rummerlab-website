import React from 'react';
import { ContentImage } from '@/components/ContentImage';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentCard } from '@/components/layout/ContentCard';

export default function ConservationPage() {
    return (
        <PageShell>
            <PageHeader
                title="Conservation of Aquatic Species and Ecosystems"
                subtitle="Developing and implementing effective strategies for protecting marine biodiversity and preserving critical aquatic habitats."
            />

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <ContentCard reveal>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">RESEARCH THEME - Marine Conservation</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p className="text-gray-600 dark:text-gray-300">Our conservation research focuses on understanding and protecting marine species and their habitats. We combine field studies, physiological research, and ecological monitoring to develop effective conservation strategies for vulnerable marine ecosystems.</p>
                            
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <ContentImage
                                    src="/images/gallery/dr-rummer-heron-island-southern-gbr-grumpy-turtle.jpg"
                                    alt="Marine conservation research"
                                    className="rounded-lg"
                                />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">Conservation Focus Areas</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                                <li>Habitat mapping and protection</li>
                                <li>Species population monitoring</li>
                                <li>Ecosystem restoration techniques</li>
                                <li>Sustainable fisheries management</li>
                            </ul>

                            <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Current Initiatives</h3>
                                <p className="text-gray-600 dark:text-gray-300">We are currently engaged in several conservation projects, including coral reef restoration, shark nursery protection, and developing sustainable fishing practices. Our work combines scientific research with practical conservation measures.</p>
                            </div>
                        </div>
                    </ContentCard>

                    <ContentCard reveal>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Ecosystem Management</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <ContentImage
                                    src="/images/gallery/healthy-coral-seascape-outer-gbr-rummer.jpg"
                                    alt="Coral reef ecosystem"
                                    className="rounded-lg"
                                />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">Our ecosystem management research focuses on developing and implementing strategies for maintaining healthy marine environments. We work closely with local communities and stakeholders to ensure sustainable use of marine resources while preserving biodiversity.</p>
                        </div>
                    </ContentCard>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <ContentCard reveal className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Conservation Highlights</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 shrink-0">
                                    <ContentImage
                                        src="/images/gallery/blacktip-shark-nursery-sampling-french-polynesia-edwards-ingle.jpg"
                                        alt="Shark conservation"
                                        variant="sidebarSquare"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Species Protection</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Safeguarding vulnerable marine species</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 shrink-0">
                                    <ContentImage
                                        src="/images/gallery/epaulette-shark-research-heron-island-gbr-grumpy-turtle.jpg"
                                        alt="Underwater research"
                                        variant="sidebarSquare"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Habitat Restoration</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Rebuilding damaged marine ecosystems</p>
                                </div>
                            </li>
                        </ul>
                    </ContentCard>

                    <ContentCard reveal className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Conservation Impact</h3>
                        <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                            <ContentImage
                                src="/images/gallery/dr-rummer-shark-release-french-polynesia-vierus.jpg"
                                alt="Conservation research"
                                variant="sidebarWide"
                                className="rounded-lg"
                            />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">Our conservation efforts contribute to the long-term sustainability of marine ecosystems and the communities that depend on them.</p>
                    </ContentCard>
                </div>
            </div>
        </PageShell>
    );
}