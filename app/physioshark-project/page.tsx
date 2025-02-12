import Image from 'next/image';

export const metadata = {
    title: "Physioshark Project",
    description: 'The Physioshark Project - Conservation physiology research on shark nurseries in Moorea, French Polynesia',
}

export default function Physioshark() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-col items-center mb-12">
                <Image
                    src="https://physioshark.org/images/logo-physioshark-project.png"
                    alt="Physioshark Project Logo"
                    width={300}
                    height={300}
                    className="mb-8"
                />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">The Physioshark Project</h1>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
                <p className="text-gray-600 dark:text-gray-300">
                    In collaboration with the <a href="https://www.instagram.com/rummerlab/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">RummerLab</a> and the <a href="http://www.criobe.pf/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Centre de Recherches Insulaires et Observatoire de l&apos;Environnement (CRIOBE)</a>, the <a href="https://www.physioshark.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Physioshark Project</a> was conceived in 2013.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                    We work on the Island of Moorea in French Polynesia where we have identified 11 potential shark nurseries. Here, mother sharks give birth to blacktip reef and sicklefin lemon sharks during the months of October - February every year. During these months, we perform surveys and studies in the field and experiments in the laboratories at CRIOBE, largely conservation physiology based.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                    Our overall aim with <a href="https://www.physioshark.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Physioshark</a> is to understand how newborn sharks are currently coping and how they will, in the future, cope with climate change and other human-induced stressors. French Polynesia is the <a href="https://www.pewtrusts.org/-/media/assets/2018/02/shark_sanctuaries_2018_issuebrief.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">largest shark sanctuary in the world</a>, as of 2019, and the island of Moorea is really the perfect site to do conservation-minded research.
                </p>

                <div className="flex justify-center space-x-4 mt-8">
                    <a 
                        href="https://www.instagram.com/physioshark/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        Physioshark Instagram
                    </a>
                    <span className="text-gray-400">|</span>
                    <a 
                        href="https://www.facebook.com/physioshark/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        Physioshark Facebook
                    </a>
                </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                    width="100%" 
                    height="450px" 
                    src="https://umap.openstreetmap.fr/en/map/shark-nurseries-on-moorea-island-french-polynesia_295561?scaleControl=false&amp;miniMap=false&amp;scrollWheelZoom=true&amp;zoomControl=false&amp;allowEdit=false&amp;moreControl=false&amp;searchControl=false&amp;tilelayersControl=false&amp;embedControl=false&amp;datalayersControl=false&amp;onLoadPanel=undefined&amp;captionBar=false&amp;fullscreenControl=false&amp;locateControl=false&amp;measureControl=false&amp;editinosmControl=false"
                    className="border-0"
                ></iframe>
            </div>
        </div>
    )
}