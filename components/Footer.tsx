import Link from 'next/link';
import Image from 'next/image';
import { SiBluesky, SiResearchgate, SiGooglescholar } from 'react-icons/si';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import { SocialIconLink, socialLogoImageClassName } from './SocialIconLink';

const footerLinkClass =
  'link-underline text-gray-600 transition-colors duration-200 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400';

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
              <SocialIconLink
                href="https://jodierummer.com"
                ariaLabel="Jodie Rummer's Website"
                title="Visit Jodie Rummer's website"
                isLogo
              >
                <span className="relative block h-6 w-6">
                  <Image
                    src="https://jodierummer.com/favicon.png"
                    alt=""
                    fill
                    className={socialLogoImageClassName}
                    sizes="24px"
                    unoptimized
                  />
                </span>
                <span className="sr-only">Jodie Rummer&apos;s Website</span>
              </SocialIconLink>

              <SocialIconLink
                href="https://physioshark.org"
                ariaLabel="Physioshark Project"
                title="Visit Physioshark Project website"
                isLogo
              >
                <span className="relative block h-6 w-6">
                  <Image
                    src="https://physioshark.org/Physioshark_icon.svg"
                    alt=""
                    fill
                    className={socialLogoImageClassName}
                    sizes="24px"
                    unoptimized
                  />
                </span>
                <span className="sr-only">Physioshark Project</span>
              </SocialIconLink>

              <SocialIconLink
                href="https://fenuafindex.com"
                ariaLabel="Fenua FINdex"
                title="Visit Fenua FINdex"
                isLogo
              >
                <span className="relative block h-6 w-6">
                  <Image
                    src="https://fenuafindex.com/FenuaFINdex_icon.svg"
                    alt=""
                    fill
                    className={socialLogoImageClassName}
                    sizes="24px"
                    unoptimized
                  />
                </span>
                <span className="sr-only">Fenua FINdex</span>
              </SocialIconLink>

              <SocialIconLink
                href="https://bsky.app/profile/physiologyfish.bsky.social/"
                ariaLabel="Bluesky"
                title="Follow us on Bluesky"
                hoverColorClass="hover:text-[#0085ff] focus-visible:text-[#0085ff]"
              >
                <SiBluesky className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Bluesky</span>
              </SocialIconLink>

              <SocialIconLink
                href="https://www.instagram.com/rummerlab/"
                ariaLabel="Instagram"
                title="Follow us on Instagram"
                hoverColorClass="hover:text-[#E4405F] focus-visible:text-[#E4405F]"
              >
                <FaInstagram className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </SocialIconLink>

              <SocialIconLink
                href="https://www.facebook.com/rummerlab"
                ariaLabel="Facebook"
                title="Follow us on Facebook"
                hoverColorClass="hover:text-[#1877F2] focus-visible:text-[#1877F2]"
              >
                <FaFacebook className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </SocialIconLink>

              <SocialIconLink
                href="https://www.youtube.com/@Physioshark"
                ariaLabel="YouTube"
                title="Subscribe to our YouTube channel"
                hoverColorClass="hover:text-[#FF0000] focus-visible:text-[#FF0000]"
              >
                <FaYoutube className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">YouTube</span>
              </SocialIconLink>

              <SocialIconLink
                href="https://www.researchgate.net/profile/Jodie-Rummer"
                ariaLabel="ResearchGate"
                title="Visit ResearchGate profile"
                hoverColorClass="hover:text-[#00CCBB] focus-visible:text-[#00CCBB]"
              >
                <SiResearchgate className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">ResearchGate</span>
              </SocialIconLink>

              <SocialIconLink
                href="https://scholar.google.com/citations?user=ynWS968AAAAJ"
                ariaLabel="Google Scholar"
                title="Visit Google Scholar profile"
                hoverColorClass="hover:text-[#4285F4] focus-visible:text-[#4285F4]"
              >
                <SiGooglescholar className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Google Scholar</span>
              </SocialIconLink>
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
