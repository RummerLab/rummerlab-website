import React from 'react';
import { ContentImage } from '@/components/ContentImage';
import { PageShell } from '@/components/layout/PageShell';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContentCard } from '@/components/layout/ContentCard';

export default function ClimateChangePage() {
    return (
        <PageShell>
            <PageHeader
                title="Adaptations to Climate Change and Ocean Acidification"
                subtitle="Understanding how marine organisms adapt to changing ocean conditions and developing strategies to enhance their resilience."
            />

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                    <ContentCard reveal>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">RESEARCH THEME - Climate Change Adaptation</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p className="text-muted">Our research investigates how marine organisms respond and adapt to climate change stressors, particularly ocean warming and acidification. We focus on understanding the mechanisms that enable species to cope with environmental changes and identifying populations with enhanced resilience.</p>
                            
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <ContentImage
                                    src="/images/gallery/healthy-coral-seascape-outer-gbr-rummer.jpg"
                                    alt="Coral reef ecosystem under study"
                                    className="rounded-lg"
                                />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">Key Research Areas</h3>
                            <ul className="list-disc pl-5 space-y-2 text-muted">
                                <li>Physiological responses to elevated temperature and CO2</li>
                                <li>Transgenerational adaptation mechanisms</li>
                                <li>Population resilience and vulnerability assessment</li>
                                <li>Behavioral adaptations to environmental change</li>
                            </ul>

                            <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Current Projects</h3>
                                <p className="text-muted">Our ongoing research includes long-term studies of coral reef fish populations, investigating their capacity for thermal acclimation and adaptation to ocean acidification. We use cutting-edge techniques to measure physiological performance and genetic adaptation across generations.</p>
                            </div>
                        </div>
                    </ContentCard>

                    <ContentCard reveal>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Ocean Acidification Research</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <ContentImage
                                    src="/images/gallery/dr-rummer-epaulette-shark-release-post-experiment-grumpy-turtle.jpg"
                                    alt="Research protocols and measurements"
                                    className="rounded-lg"
                                />
                            </div>
                            <p className="text-muted">Our ocean acidification research examines how changes in seawater chemistry affect marine organisms at multiple levels of biological organization. We study impacts on development, physiology, and behavior, while also investigating potential adaptation mechanisms.</p>
                        </div>
                    </ContentCard>
                </div>

                <div className="space-y-8 lg:col-span-1">
                    <ContentCard reveal className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Research Highlights</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 shrink-0">
                                    <ContentImage
                                        src="/images/gallery/epaulette-shark-tail-heron-island-laine.jpg"
                                        alt="Marine life research"
                                        variant="sidebarSquare"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Thermal Tolerance</h4>
                                    <p className="text-sm text-muted">Understanding species&apos capacity to cope with warming oceans</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 shrink-0">
                                    <ContentImage
                                        src="/images/gallery/blacktip-shark-aquaria-french-polynesia-huertas.jpg"
                                        alt="Environmental research"
                                        variant="sidebarSquare"
                                        className="rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">pH Adaptation</h4>
                                    <p className="text-sm text-muted">Studying responses to ocean acidification</p>
                                </div>
                            </li>
                        </ul>
                    </ContentCard>

                    <ContentCard reveal className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Research Impact</h3>
                        <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                            <ContentImage
                                src="/images/gallery/dr-rummer-epaulette-shark-release-post-research-grumpy-turtle.jpg"
                                alt="Marine conservation"
                                variant="sidebarWide"
                                className="rounded-lg"
                            />
                        </div>
                        <p className="text-muted">Our research informs conservation strategies and policy decisions for protecting marine ecosystems in a changing climate.</p>
                    </ContentCard>
                </div>
            </div>
        </PageShell>
    );
}
