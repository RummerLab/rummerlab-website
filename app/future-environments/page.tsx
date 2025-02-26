import Image from 'next/image';

export const metadata = {
    title: "Future Environments Research",
    description: 'Research on marine organisms in future ocean environments, focusing on climate change impacts and adaptation.',
}

export default function FutureEnvironments() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 mb-12">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Future Ocean Environments</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Investigating how marine life will adapt and survive in future ocean conditions shaped by climate change.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">RESEARCH THEME - Future Ocean Conditions</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p className="text-gray-600 dark:text-gray-300">Our research focuses on understanding how marine organisms will respond to future ocean conditions, particularly the combined effects of warming, acidification, and deoxygenation. We use cutting-edge techniques to simulate future ocean environments and study organismal responses across multiple generations.</p>
                            
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/gallery/epaulette-shark-coral-habitat-johnny-gaskell.jpg"
                                    alt="Coral reef habitat"
                                    fill
                                    className="object-cover"
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
                    </section>

                    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Methodology & Approach</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/gallery/dr-rummer-wheeler-epaulette-shark-ultrasound-grumpy-turtle.jpg"
                                    alt="Advanced research techniques"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">Our research employs state-of-the-art experimental systems to simulate future ocean conditions, combined with cutting-edge physiological and molecular techniques to understand organismal responses.</p>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <aside className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Key Findings</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src="/images/gallery/epaulette-shark-hunting-behavior-laine.jpg"
                                        alt="Marine behavior studies"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Adaptation Capacity</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Species-specific responses to environmental change</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src="/images/gallery/epaulette-shark-embryo-development-rummerlab.jpg"
                                        alt="Development studies"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Future Predictions</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Modeling marine ecosystem responses</p>
                                </div>
                            </li>
                        </ul>
                    </aside>

                    <aside className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Conservation Implications</h3>
                        <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                            <Image
                                src="/images/gallery/blacktip-shark-school-blue-water-french-polynesia-thiault.jpg"
                                alt="Marine life in future oceans"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">Our findings help inform conservation strategies and policy decisions for protecting marine ecosystems in a changing climate.</p>
                    </aside>
                </div>
            </div>
        </div>
    );
}
