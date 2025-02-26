import React from 'react';
import Image from 'next/image';

export default function ConservationPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Conservation of Aquatic Species and Ecosystems</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Developing and implementing effective strategies for protecting marine biodiversity and preserving critical aquatic habitats.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">RESEARCH THEME - Marine Conservation</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p className="text-gray-600 dark:text-gray-300">Our conservation research focuses on understanding and protecting marine species and their habitats. We combine field studies, physiological research, and ecological monitoring to develop effective conservation strategies for vulnerable marine ecosystems.</p>
                            
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/gallery/healthy-reef-great-barrier-reef-rummer.jpg"
                                    alt="Marine conservation research"
                                    fill
                                    className="object-cover"
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
                    </section>

                    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Ecosystem Management</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/gallery/outer-great-barrier-reef-healthy-corals-rummer.jpg"
                                    alt="Coral reef ecosystem"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">Our ecosystem management research focuses on developing and implementing strategies for maintaining healthy marine environments. We work closely with local communities and stakeholders to ensure sustainable use of marine resources while preserving biodiversity.</p>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <aside className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Conservation Highlights</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src="/images/gallery/blacktip-reef-shark-nursery-habitat-french-polynesia-huertas.jpg"
                                        alt="Shark conservation"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Species Protection</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Safeguarding vulnerable marine species</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src="/images/gallery/epaulette-shark-swimming-reef-flats-kristian-laine.jpg"
                                        alt="Underwater research"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Habitat Restoration</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Rebuilding damaged marine ecosystems</p>
                                </div>
                            </li>
                        </ul>
                    </aside>

                    <aside className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Conservation Impact</h3>
                        <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                            <Image
                                src="/images/gallery/dr-rummer-reef-research-heron-island-grumpy-turtle.jpg"
                                alt="Conservation research"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">Our conservation efforts contribute to the long-term sustainability of marine ecosystems and the communities that depend on them.</p>
                    </aside>
                </div>
            </div>
        </div>
    );
} 