import Image from 'next/image';

export const metadata = {
    title: "Whole-animal responses to environmental stress",
    description: 'Research on marine animal responses to environmental stressors including temperature, hypoxia, and ocean acidification.',
}

export default function EnvironmentalStresses() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 mb-12">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Whole-animal responses to environmental stress</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Understanding how marine organisms respond and adapt to environmental stressors is crucial for predicting and mitigating the impacts of climate change.
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">RESEARCH THEME - 1: Whole-animal responses to environmental stress</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p className="text-gray-600 dark:text-gray-300">Early in my research career, I conducted a rigorous assessment of the physiological responses to decompression stress caused by fishing, injuries resulting from swim bladder overexpansion and gas embolisms. This seminal research has been well cited and is utilized as a model for fisheries management surrounding catch-and-release protocols and conservation organizations worldwide.</p>
                            
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/unsplash/ocean/ocean-marine-life-hmgtgoltykm.jpg"
                                    alt="Marine life research"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">Key Publications</h3>
                            <ul className="space-y-4">
                                <li className="flex gap-2 text-gray-600 dark:text-gray-300">
                                    <span className="text-blue-600 dark:text-blue-400">→</span>
                                    Rummer J.L. & Bennett W.A. 2005. Physiological effects of swim bladder overexpansion and catastrophic decompression on red snapper, Lutjanus campechanus. 
                                    <a href="http://www.tandfonline.com/doi/abs/10.1577/T04-235.1#.VCkCGimSydw" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">doi:10.1577/T04-235.1</a>
                                </li>
                            </ul>

                            <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Research Focus</h3>
                                <p className="text-gray-600 dark:text-gray-300">More recently, I have standardized techniques for estimating whole animal resting and maximum metabolic rates during exposure to various types of environmental (temperature, hypoxia, and elevated CO2 to simulate ocean acidification) or exercise-induced stress.</p>
                            </div>

                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/unsplash/research/research-scientific-equipment-gnws8zmcmvm.jpg"
                                    alt="Scientific equipment for marine research"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">Thermal Acclimation Studies</h3>
                            <p className="text-gray-600 dark:text-gray-300">I have also made conclusions as to the temporal scale of thermal acclimation and metabolic performance in coral reef fishes and how this relates to temperature preference, a link crucial to developing management strategies for the conservation of marine biodiversity and the sustainable use of marine fisheries, especially in the advent of climate change.</p>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Larval Fish Research</h2>
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <div className="my-8 relative h-64 rounded-lg overflow-hidden">
                                <Image
                                    src="/images/unsplash/ocean/ocean-coral-reef-btpfx4ifbyg.jpg"
                                    alt="Coral reef ecosystem"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">While much of my whole-animal work has been done on adult fishes, I have integrated several studies on larval fishes into my program. I recently collaborated with Dr. Shaun Killen to understand the tradeoffs between dominant behaviours and aerobic metabolic scope in larval coral reef damselfish.</p>
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <aside className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Research Highlights</h3>
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
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Shark Physiology</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Understanding how sharks respond to environmental stressors</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src="/images/unsplash/ocean/ocean-underwater-photography-xexawgzyobc.jpg"
                                        alt="Underwater research"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Ocean Acidification</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Effects on marine species adaptation and survival</p>
                                </div>
                            </li>
                        </ul>
                    </aside>

                    <aside className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Research Impact</h3>
                        <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                            <Image
                                src="/images/unsplash/conservation/conservation-environmental-research-bflon4v0jgq.jpg"
                                alt="Environmental research"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">Our research contributes to understanding and protecting marine ecosystems in the face of environmental change.</p>
                    </aside>
                </div>
            </div>
        </div>
    );
}
