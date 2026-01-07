import Link from 'next/link';

export default function SupportOurResearch() {
  return (
    <section className="py-20 bg-linear-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-linear-to-r from-blue-900/50 to-cyan-900/50 rounded-3xl p-10 shadow-xl backdrop-blur-xs border border-blue-500/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Support Our Research</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Help us protect marine ecosystems by supporting our &quot;Baby Sharks in a Changing World&quot; project.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-6 mt-8">
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">
              How to Donate
            </h3>
            <p className="text-gray-300 mb-6 text-center">
              To support our research, JCU has established dedicated donation pages:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://www.jcu.edu.au/give/give-to-innovation-and-discovery/baby-sharks-in-a-changing-world"
                className="group relative px-8 py-4 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white hover:text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/40 overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="text-white group-hover:text-white">Donate (Non-U.S.)</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300 text-white" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-linear-to-r from-blue-400/20 to-cyan-400/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>
              <Link 
                href="https://jcuamerica.org/home/jcu-physioshark-research-program"
                className="group relative px-8 py-4 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white hover:text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/40 overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="text-white group-hover:text-white">Donate (U.S. Tax Deductible)</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300 text-white" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-linear-to-r from-blue-400/20 to-cyan-400/20 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
