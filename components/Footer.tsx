import Link from 'next/link';
import Image from 'next/image';
import { SiBluesky, SiResearchgate, SiGooglescholar } from 'react-icons/si';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

const footerLinkClass =
  'link-underline text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400';

const socialIconClass =
  'text-gray-400 opacity-60 transition-all duration-200 hover:text-blue-600 hover:opacity-100 dark:hover:text-blue-400';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="animate-fade-in">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400">
              <a
                href="https://www.jcu.edu.au/"
                target="_blank"
                rel="noopener noreferrer"
                className={footerLinkClass}
              >
                James Cook University
              </a>
              <br />
              Townsville, QLD 4811
              <br />
              Australia
            </p>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/research" className={footerLinkClass}>
                  Research Areas
                </Link>
              </li>
              <li>
                <Link href="/publications" className={footerLinkClass}>
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/blog" className={footerLinkClass}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/podcast" className={footerLinkClass}>
                  Podcast
                </Link>
              </li>
              <li>
                <Link href="/team" className={footerLinkClass}>
                  Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className={footerLinkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Connect</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://jodierummer.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200"
                aria-label="Jodie Rummer&apos;s Website"
                title="Visit Jodie Rummer&apos;s website"
              >
                <div className="relative h-6 w-6 opacity-60 transition-all duration-200 hover:opacity-100">
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
                <div className="relative h-6 w-6 opacity-60 transition-all duration-200 hover:opacity-100">
                  <Image
                    src="https://physioshark.org/Physioshark_icon.svg"
                    alt="Physioshark Logo"
                    fill
                    className="object-contain brightness-0 dark:brightness-100 dark:invert"
                    sizes="24px"
                    unoptimized
                  />
                </div>
                <span className="sr-only">Physioshark Project</span>
              </a>
              <a
                href="https://fenuafindex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200"
                aria-label="Fenua FINdex"
                title="Visit Fenua FINdex"
              >
                <div className="relative h-6 w-6 opacity-60 transition-all duration-200 hover:opacity-100">
                  <Image
                    src="https://fenuafindex.com/FenuaFINdex_icon.svg"
                    alt="Fenua FINdex Logo"
                    fill
                    className="object-contain"
                    sizes="24px"
                    unoptimized
                  />
                </div>
                <span className="sr-only">Fenua FINdex</span>
              </a>
              <a
                href="https://bsky.app/profile/physiologyfish.bsky.social/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClass}
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
                className={socialIconClass}
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
                className={socialIconClass}
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
                className={socialIconClass}
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
                className={socialIconClass}
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
                className={socialIconClass}
                aria-label="Google Scholar"
                title="Visit Google Scholar profile"
              >
                <SiGooglescholar className="h-6 w-6" />
                <span className="sr-only">Google Scholar</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 animate-fade-in border-t border-gray-200 pt-8 dark:border-gray-800" style={{ animationDelay: '300ms' }}>
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} RummerLab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
