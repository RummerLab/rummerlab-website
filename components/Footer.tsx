import Link from 'next/link';
import Image from 'next/image';
import { SiBluesky, SiResearchgate, SiGooglescholar } from 'react-icons/si';
import { FaInstagram, FaFacebook, FaYoutube, FaGlobe } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400">
              <a 
                href="https://www.jcu.edu.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                James Cook University
              </a><br />
              Townsville, QLD 4811<br />
              Australia
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/research" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Research Areas
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://jodierummer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200"
                aria-label="Jodie Rummer&apos;s Website"
                title="Visit Jodie Rummer&apos;s website"
              >
                <div className="relative w-6 h-6 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-200">
                  <Image
                    src="https://jodierummer.com/favicon.png"
                    alt="Jodie Rummer Logo"
                    fill
                    className="object-contain"
                    sizes="24px"
                    unoptimized
                  />
                </div>
                <span className="sr-only">Jodie Rummer&apos;s Website</span>
              </a>
              <a
                href="https://physioshark.org"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200"
                aria-label="Physioshark Project"
                title="Visit Physioshark Project website"
              >
                <div className="relative w-6 h-6 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-200">
                  <Image
                    src="https://physioshark.org/Physioshark_icon.svg"
                    alt="Physioshark Logo"
                    fill
                    className="object-contain brightness-0 dark:brightness-100 dark:invert opacity-60 hover:brightness-100 hover:dark:invert-0 hover:opacity-100 transition-all duration-200"
                    sizes="24px"
                    unoptimized
                  />
                </div>
                <span className="sr-only">Physioshark Project</span>
              </a>
              <a
                href="https://bsky.app/profile/physiologyfish.bsky.social/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 filter grayscale hover:grayscale-0 hover:text-[#0085ff] opacity-60 hover:opacity-100 transition-all duration-200"
                aria-label="Bluesky"
                title="Follow us on Bluesky"
              >
                <SiBluesky className="h-6 w-6" />
                <span className="sr-only">Bluesky</span>
              </a>
              <a
                href="https://www.instagram.com/rummerlab/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 filter grayscale hover:grayscale-0 hover:text-[#E4405F] opacity-60 hover:opacity-100 transition-all duration-200"
                aria-label="Instagram"
                title="Follow us on Instagram"
              >
                <FaInstagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/rummerlab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 filter grayscale hover:grayscale-0 hover:text-[#1877F2] opacity-60 hover:opacity-100 transition-all duration-200"
                aria-label="Facebook"
                title="Follow us on Facebook"
              >
                <FaFacebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.youtube.com/@Physioshark"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 filter grayscale hover:grayscale-0 hover:text-[#FF0000] opacity-60 hover:opacity-100 transition-all duration-200"
                aria-label="YouTube"
                title="Subscribe to our YouTube channel"
              >
                <FaYoutube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </a>
              <a 
                href="https://www.researchgate.net/profile/Jodie-Rummer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 filter grayscale hover:grayscale-0 hover:text-[#00CCBB] opacity-60 hover:opacity-100 transition-all duration-200"
                aria-label="ResearchGate"
                title="Visit ResearchGate profile"
              >
                <SiResearchgate className="h-6 w-6" />
                <span className="sr-only">ResearchGate</span>
              </a>
              <a 
                href="https://scholar.google.com/citations?user=ynWS968AAAAJ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 filter grayscale hover:grayscale-0 hover:text-[#4285F4] opacity-60 hover:opacity-100 transition-all duration-200"
                aria-label="Google Scholar"
                title="Visit Google Scholar profile"
              >
                <SiGooglescholar className="h-6 w-6" />
                <span className="sr-only">Google Scholar</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} RummerLab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

