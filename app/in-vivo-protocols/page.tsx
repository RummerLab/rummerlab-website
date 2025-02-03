import Image from 'next/image';

export const metadata = {
    title: "In Vivo Research Protocols",
    description: 'Advanced research protocols for studying marine organisms in their natural environment and laboratory settings.',
}

export default function InVivoProtocols() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 mb-12">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">In Vivo Research Protocols</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Advanced methodologies for studying marine organisms in their natural environment and controlled laboratory settings.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">RESEARCH THEME - In Vivo Studies</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p className="text-gray-600 dark:text-gray-300">Our in vivo research protocols focus on understanding physiological responses of marine organisms in their natural environment. We employ cutting-edge techniques and technologies to study animal behavior, physiology, and adaptation mechanisms while minimizing environmental impact.</p>
                            
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/unsplash/research/research-scientific-equipment-gnws8zmcmvm.jpg"
                                    alt="Research equipment"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">Research Methodologies</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-2 text-gray-600 dark:text-gray-300">
                                    <span className="text-blue-600 dark:text-blue-400">→</span>
                                    Non-invasive physiological monitoring
                                </li>
                                <li className="flex gap-2 text-gray-600 dark:text-gray-300">
                                    <span className="text-blue-600 dark:text-blue-400">→</span>
                                    Environmental stress response studies
                                </li>
                                <li className="flex gap-2 text-gray-600 dark:text-gray-300">
                                    <span className="text-blue-600 dark:text-blue-400">→</span>
                                    Behavioral analysis in natural habitats
                                </li>
                            </ul>

                            <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Protocol Development</h3>
                                <p className="text-gray-600 dark:text-gray-300">We continuously develop and refine our research protocols to ensure the highest standards of scientific rigor while maintaining ethical considerations and animal welfare.</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Field Applications</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/unsplash/ocean/ocean-marine-life-hmgtgoltykm.jpg"
                                    alt="Marine research in action"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">Our field protocols are designed to capture real-world data while minimizing disturbance to marine ecosystems. We utilize advanced telemetry and monitoring systems to track animal behavior and physiological responses in their natural habitat.</p>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <aside className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Protocol Highlights</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src="/images/unsplash/sharks/sharks-shark-sxlju_ydkt8.jpg"
                                        alt="Shark research"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Field Monitoring</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Advanced techniques for studying marine life</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src="/images/unsplash/conservation/conservation-environmental-research-bflon4v0jgq.jpg"
                                        alt="Lab research"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Lab Studies</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Controlled environment research protocols</p>
                                </div>
                            </li>
                        </ul>
                    </aside>

                    <aside className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Research Impact</h3>
                        <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                            <Image
                                src="/images/unsplash/ocean/ocean-coral-reef-btpfx4ifbyg.jpg"
                                alt="Marine ecosystem"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">Our protocols contribute to advancing marine science while ensuring sustainable and ethical research practices.</p>
                    </aside>
                </div>
            </div>
        </div>
    );
}
