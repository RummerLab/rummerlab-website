"use client"

import Link from "next/link"
import Image from "next/image"
import { FaInstagram, FaFacebook, FaChevronDown } from "react-icons/fa"
import { SiBluesky } from "react-icons/si"
import { useState } from "react"
import { IconType } from "react-icons"
import type { ReactElement } from "react"
import { RummerLabMark } from "@/components/RummerLabMark"
import { SocialIconLink, socialLogoImageClassName } from "./SocialIconLink"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    const handleLinkClick = () => {
        setIsMenuOpen(false)
        setActiveDropdown(null)
    }

    type LogoSocialLink = {
        href: string
        ariaLabel: string
        title: string
        isLogo: true
        renderIcon: (sizeClass: string) => ReactElement
    }

    type BrandSocialLink = {
        href: string
        ariaLabel: string
        title: string
        isLogo?: false
        hoverColorClass: string
        icon: IconType
    }

    type SocialLink = LogoSocialLink | BrandSocialLink

    const socialLinks: SocialLink[] = [
        {
            href: "https://jodierummer.com",
            ariaLabel: "Visit Jodie Rummer's website",
            title: "Visit Jodie Rummer's website",
            isLogo: true,
            renderIcon: (sizeClass: string) => (
                <span className={`relative block ${sizeClass}`}>
                    <Image
                        src="https://jodierummer.com/favicon.png"
                        alt=""
                        fill
                        className={socialLogoImageClassName}
                        sizes="24px"
                        unoptimized
                    />
                </span>
            ),
        },
        {
            href: "https://physioshark.org",
            ariaLabel: "Visit Physioshark website",
            title: "Visit Physioshark Project website",
            isLogo: true,
            renderIcon: (sizeClass: string) => (
                <span className={`relative block ${sizeClass}`}>
                    <Image
                        src="https://physioshark.org/Physioshark_icon.svg"
                        alt=""
                        fill
                        className={socialLogoImageClassName}
                        sizes="24px"
                        unoptimized
                    />
                </span>
            ),
        },
        {
            href: "https://fenuafindex.com",
            ariaLabel: "Visit Fenua FINdex",
            title: "Visit Fenua FINdex",
            isLogo: true,
            renderIcon: (sizeClass: string) => (
                <span className={`relative block ${sizeClass}`}>
                    <Image
                        src="https://fenuafindex.com/FenuaFINdex_icon.svg"
                        alt=""
                        fill
                        className={socialLogoImageClassName}
                        sizes="24px"
                        unoptimized
                    />
                </span>
            ),
        },
        {
            href: "https://bsky.app/profile/physiologyfish.bsky.social/",
            icon: SiBluesky as IconType,
            ariaLabel: "Follow us on Bluesky",
            title: "Follow us on Bluesky",
            hoverColorClass: "hover:text-[#0085ff] focus-visible:text-[#0085ff]",
        },
        {
            href: "https://www.instagram.com/rummerlab/",
            icon: FaInstagram as IconType,
            ariaLabel: "Follow us on Instagram",
            title: "Follow us on Instagram",
            hoverColorClass: "hover:text-[#E4405F] focus-visible:text-[#E4405F]",
        },
        {
            href: "https://www.facebook.com/rummerlab",
            icon: FaFacebook as IconType,
            ariaLabel: "Follow us on Facebook",
            title: "Follow us on Facebook",
            hoverColorClass: "hover:text-[#1877F2] focus-visible:text-[#1877F2]",
        },
    ]

    const renderSocialIcon = (link: SocialLink, iconSizeClass: string) => {
        if (link.isLogo) {
            return (
                <SocialIconLink
                    key={link.href}
                    href={link.href}
                    ariaLabel={link.ariaLabel}
                    title={link.title}
                    isLogo
                    onClick={handleLinkClick}
                >
                    {link.renderIcon(iconSizeClass)}
                </SocialIconLink>
            )
        }

        const Icon = link.icon

        return (
            <SocialIconLink
                key={link.href}
                href={link.href}
                ariaLabel={link.ariaLabel}
                title={link.title}
                hoverColorClass={link.hoverColorClass}
                onClick={handleLinkClick}
            >
                <Icon className={iconSizeClass} aria-hidden="true" />
            </SocialIconLink>
        )
    }

    const navItems = [
        { 
            label: "Research",
            type: "dropdown",
            items: [
                { href: "/research", label: "Overview" },
                { href: "/environmental-stressors", label: "Environmental Stressors" },
                { href: "/future-environments", label: "Future Environments" },
                { href: "/in-vivo-protocols", label: "In Vivo Protocols" },
                { href: "/climate-change", label: "Climate Change" },
                { href: "/conservation", label: "Conservation" },
                { href: "/donations", label: "Donations" },
            ]
        },
        {
            label: "RummerLab",
            type: "dropdown",
            items: [
                { href: "/about", label: "About" },
                { href: "/team", label: "Team" },
                { href: "/collaborators", label: "Collaborators" },
                { href: "/join", label: "Join Us" },
            ]
        },
        { href: "/publications", label: "Publications" },
        { 
            label: "Media",
            type: "dropdown",
            items: [
                { href: "/media", label: "Media" },
                { href: "/gallery", label: "Gallery" },
                { href: "/podcast", label: "Podcast" },
                { href: "/blog", label: "Blog" },
            ]
        },
        { href: "/physioshark-project", label: "Physioshark" },
        { href: "/contact", label: "Contact" }
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xs border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-3">
                    <div className="flex shrink-0 items-center">
                        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="RummerLab home">
                            <RummerLabMark
                                className="shrink-0 rounded-md bg-white p-0.5 shadow-sm ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10"
                                imageClassName="h-8 w-auto sm:h-9 dark:brightness-0 dark:invert"
                            />
                            <span className="bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 bg-size-[200%_100%] bg-position-[0%_50%] bg-clip-text text-2xl font-bold text-transparent text-gray-900 transition-all duration-500 ease-in-out group-hover:bg-position-[100%_50%] dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400 dark:text-gray-50">
                                RummerLab
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation — lg+ so brand never collides with links at mid widths */}
                    <div className="hidden min-w-0 flex-1 items-center justify-end gap-x-1 lg:flex xl:gap-x-3">
                        <Link 
                            href="/"
                            className="link-underline rounded-md px-2.5 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 xl:px-3"
                        >
                            Home
                        </Link>
                        {navItems.map((item) => (
                            item.type === 'dropdown' ? (
                                <div 
                                    key={item.label} 
                                    className="relative"
                                    onMouseEnter={() => setActiveDropdown(item.label)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button
                                        className="flex cursor-pointer items-center rounded-md px-2.5 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 xl:px-3"
                                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                                        aria-expanded={activeDropdown === item.label}
                                    >
                                        {item.label}
                                        <FaChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div 
                                        className={`absolute left-0 top-full z-50 w-48 origin-top-left translate-y-0 pt-2 transition-all duration-200 ${
                                            activeDropdown === item.label 
                                                ? 'visible translate-y-0 scale-100 opacity-100' 
                                                : 'invisible pointer-events-none -translate-y-1 scale-95 opacity-0'
                                        }`}
                                    >
                                        <div className="rounded-md bg-white py-1 shadow-lg dark:bg-gray-900" role="menu">
                                            {item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                                                    onClick={handleLinkClick}
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link 
                                    key={item.href}
                                    href={item.href as string} 
                                    className="link-underline rounded-md px-2.5 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 xl:px-3"
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Social Icons — xl+ so they never squeeze the brand/nav */}
                    <div className="hidden shrink-0 items-center space-x-4 xl:flex">
                        {socialLinks.map((link) => renderSocialIcon(link, "h-5 w-5"))}
                    </div>

                    {/* Mobile / tablet menu button */}
                    <div className="flex shrink-0 items-center lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 lg:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link 
                        href="/"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors duration-200"
                        onClick={handleLinkClick}
                    >
                        Home
                    </Link>
                    {navItems.map((item) => (
                        item.type === 'dropdown' ? (
                            <div key={item.label}>
                                <div className="px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-100">
                                    {item.label}
                                </div>
                                <div className="pl-4">
                                    {item.items.map((subItem) => (
                                        <Link
                                            key={subItem.href}
                                            href={subItem.href}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors duration-200"
                                            onClick={handleLinkClick}
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link 
                                key={item.href}
                                href={item.href as string}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors duration-200"
                                onClick={handleLinkClick}
                            >
                                {item.label}
                            </Link>
                        )
                    ))}
                </div>
                <div className="flex justify-center space-x-4 pb-3 border-t border-gray-200 dark:border-gray-800 pt-4">
                    {socialLinks.map((link) => renderSocialIcon(link, "h-6 w-6"))}
                </div>
            </div>
        </nav>
    )
}
