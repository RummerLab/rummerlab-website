import Image from "next/image";

export const metadata = {
    title: "The RummerLab",
    description: 'Welcome to the RummerLab, where we conduct cutting-edge research in marine biology and conservation.',
}

export default function RummerLabPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="max-w-3xl mx-auto text-center mb-12">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="relative w-48 h-48">
                        <Image
                            src="/images/rummerlab_logo_transparent.png"
                            alt="RummerLab Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">The RummerLab</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Welcome to the RummerLab, where we conduct cutting-edge research in marine biology and conservation.
                    </p>
                </div>
            </div>

            {/* Advice for Potential Students */}
            <div className="max-w-3xl mx-auto mb-16">
                <div className="rounded-xl bg-blue-50/50 dark:bg-blue-900/10 p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Potential students, a little advice…
                    </h2>
                    <div className="prose prose-lg dark:prose-invert">
                        <p className="text-gray-600 dark:text-gray-300">
                            Prof. Scott Keogh has compiled an excellent list of resources and advice for students and postdoctoral fellows{' '}
                            <a 
                                href="http://biology.anu.edu.au/hosted_sites/Scott/Resources-and-advice.html"
                                target="_blank"
                                rel="noopener"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                here
                            </a>.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            And if you&apos;re about to contact me to inquire about graduate school (MSc, PhD),{' '}
                            <a 
                                href="http://sciencecareers.sciencemag.org/career_magazine/previous_issues/articles/2015_05_06/caredit.a1500118"
                                target="_blank"
                                rel="noopener"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                check this out
                            </a>!
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Content */}
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Current post-docs</h2>
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Dr. Björn Illing</strong> I am originally from Germany, where I earned my diploma (2009) at the University of Hamburg conducting eco-morphological research on spawning aggregations of a temperate clupeid fish species. I switched work groups after that and got fascinated by the early life stages of fish and how ecological and physiological aspects determine their survival in the oceans. I finished my doctoral studies (2016) on how environmental stressors affect the growth, condition and survival of Atlantic herring offspring at the University of Hamburg, working in parallel at a federal German research institute developing a novel hyperbaric swimming flume for testing fish species during extended oceanic spawning migrations. Now, I have finally made it to warmer waters and spend time in the Rummer lab investigating the effects of environmental stressors on coral reef fish larvae. I am funded, in part, by the{' '}
                            <a href="http://www.biologists.com/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                Company of Biologists
                            </a>. Find me on{' '}
                            <a href="https://www.researchgate.net/profile/Bjoern_Illing" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                ResearchGate
                            </a>{' '}
                            and on{' '}
                            <a href="https://twitter.com/Bjoern_Illing" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                Twitter
                            </a>
                        </p>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Current PhD students</h2>
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Sybille Hess</strong> I am originally from Switzerland but did my MSc here at JCU with Drs Jodie Rummer & Amelia Wenger. I recently started my PhD here at JCU with Dr Rummer, and Drs Andy Hoey & Amelia Wenger are my co-supervisors. I am interested in the effects of human activities on coral reefs, especially on reef fishes. My PhD research investigates how poor water quality (e.g., increasing levels of suspended sediments) affects fish metabolic performance, the consequences this may have for important activities such as swimming, and how this may translate into changes in fish community structure. I am working primarily with fish larvae and juveniles, and combine lab-based and field experiments to tackle these questions. You can also find me on{' '}
                            <a href="https://twitter.com/HessSybille" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                Twitter
                            </a>. Email:{' '}
                            <a href="mailto:sybille.hess@my.jcu.edu.au" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                sybille.hess@my.jcu.edu.au
                            </a>
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Tiffany Nay</strong> I earned my BSc in Marine Biology from the University of West Florida while spending the summers in Wakatobi, Southeast Sulawesi, Indonesia assisting research on how crab-eating frogs and mudskipper fishes tolerate water loss and estimating metabolic rates in sea snakes. I earned my MSc here at JCU, and my research investigated how/why fish utilize microhabitats with fluctuating water quality in coral reefs and mangrove ecosystems. I just started my PhD this month expanding upon my interests in microhabitat use and am supervised by Drs. Rummer, Hoey, and Johansen. You can also find me on{' '}
                            <a href="https://twitter.com/TiffanyJNay" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                Twitter
                            </a>. Email:{' '}
                            <a href="mailto:tiffany.nay@my.jcu.edu.au" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                tiffany.nay@my.jcu.edu.au
                            </a>
                        </p>
                    </div>

                    {/* Add more PhD students... */}
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Current MSc students</h2>
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Eva Jacquesson</strong> (based at{' '}
                            <a href="http://www.criobe.pf/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                Centre de Recherche Insulaire et Observatoire de l&apos;Environnement (CRIOBE)
                            </a>{' '}
                            Papetoai, Moorea, Polynésie française) ... Email:{' '}
                            <a href="mailto:eva.jacquesson@gmail.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                eva.jacquesson@gmail.com
                            </a>
                        </p>
                    </div>
                    {/* Add more MSc students... */}
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Technical Staff</h2>
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Nao Nakamura</strong> (laboratory and field technician, based at{' '}
                            <a href="http://www.criobe.pf/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                Centre de Recherche Insulaire et Observatoire de l&apos;Environnement (CRIOBE)
                            </a>{' '}
                            Papetoai, Moorea, Polynésie française) I am originally from Japan, but I grew up in France where I completed my MSc (Hons) at Toulouse, Paul Sabatier University. Email:{' '}
                            <a href="mailto:nao.nakamura34@gmail.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                nao.nakamura34@gmail.com
                            </a>
                        </p>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Alumni</h2>
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <p className="text-gray-600 dark:text-gray-300">
                            <strong>Ian McLeod</strong> (PhD - 2014) I am currently employed as a Senior Research Scientist at TropWATER, James Cook University. Find me on{' '}
                            <a href="https://twitter.com/DrIanMcLeod" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                Twitter
                            </a>{' '}
                            and{' '}
                            <a href="https://www.researchgate.net/profile/Ian_Mcleod4" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                ResearchGate
                            </a>
                        </p>
                    </div>
                    {/* Add more alumni... */}
                </div>
            </div>
        </div>
    );
}