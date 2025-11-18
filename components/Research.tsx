import Link from 'next/link';

export default function Research() {
  return (
    <>
      <h2 className="mt-12 mb-8 text-3xl text-center font-bold text-gray-900 dark:text-white">Research Areas</h2>
      <p className="mb-8 text-xl text-center text-gray-700 dark:text-gray-300">
        Our main research areas focus lies in the ecological, evolutionary, and conservation physiology in fishes.
      </p>
      <div className="max-w-3xl mx-auto space-y-3">
        <Link href="/environmental-stressors" className="group block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3">
            <div className="shrink-0 w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">Physiological responses to environmental stressors</span>
          </div>
        </Link>
        
        <Link href="/in-vivo-protocols" className="group block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3">
            <div className="shrink-0 w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">Novel in vitro and in vivo protocols</span>
          </div>
        </Link>
        
        <Link href="/climate-change" className="group block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3">
            <div className="shrink-0 w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">Adaptations to climate change and ocean acidification</span>
          </div>
        </Link>
        
        <Link href="/conservation" className="group block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3">
            <div className="shrink-0 w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">Conservation of aquatic species and ecosystems</span>
          </div>
        </Link>
        
        <Link href="/future-environments" className="group block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-3">
            <div className="shrink-0 w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">Harnessing geographic gradients and local extreme environment as analogues for future change</span>
          </div>
        </Link>
      </div>
    </>
  );
}