import React from "react";
import Link from 'next/link';

export default function Donate() {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-12">
      <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12">
        <h2 className="text-4xl md:text-5xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 leading-[1.2] mb-8 py-1">
          Baby Sharks in a Changing World
        </h2>
        <p className="text-center mb-8 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Support our research by donating to our project
        </p>
        
        <div className="flex justify-center mb-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <a
              href="https://alumni.jcu.edu.au/SSLPage.aspx?pid=891"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-blue-500 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-600 dark:hover:border-blue-300 transition-all duration-200 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl rounded-lg"
            >
              DONATE NOW
            </a>
          </div>
        </div>
        
        <div className="prose prose-lg max-w-3xl mx-auto mb-10">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            The Physioshark Research Program at James Cook University is dedicated to understanding how climate change is impacting sharks and informing conservation efforts. The team investigates the effects of rising sea temperatures, ocean acidification, and declining oxygen on the physiology and behaviour of sharks.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Sharks are an important element of healthy environments and without them entire ocean ecosystems can fall out of balance. Based on the Great Barrier Reef and in French Polynesia the Physioshark Research Program seeks to understand and protect sharks in a changing world.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            By working to safeguard these important predators, the team is contributing to the health and sustainability of marine ecosystems, which are essential to the well-being of our planet.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            How to Donate
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            To support our research, JCU has established dedicated donation pages:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://www.jcu.edu.au/give/give-to-innovation-and-discovery/baby-sharks-in-a-changing-world"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
            >
              Donate (Non-U.S.)
            </Link>
            <Link 
              href="https://jcuamerica.org/home/jcu-physioshark-research-program"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
            >
              Donate (U.S. Tax Deductible)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};