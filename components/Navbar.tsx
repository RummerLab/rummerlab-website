"use client"

import Link from "next/link"
import Image from "next/image"
import { FaInstagram, FaFacebook, FaChevronDown } from "react-icons/fa"
import { SiBluesky } from "react-icons/si"
import { useState } from "react"
import { IconType } from "react-icons"
import type { ReactElement } from 'react'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    const handleLinkClick = () => {
        setIsMenuOpen(false)
        setActiveDropdown(null)
    }

    type SocialLink = {
        href: string;
        icon: IconType | (() => ReactElement);
        ariaLabel: string;
        title?: string;
    }

    const socialLinks: SocialLink[] = [
        {
            href: "https://jodierummer.com",
            icon: () => (
                <div className="relative w-5 h-5 group" title="Visit Jodie Rummer's website">
                    <Image
                        src="https://jodierummer.com/favicon.png"
                        alt="Jodie Rummer Logo"
                        fill
                        className="object-contain opacity-60 group-hover:opacity-100 transition-all duration-200 brightness-0 dark:brightness-100 dark:invert"
                        sizes="20px"
                    />
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                        style={{
                            backgroundColor: 'rgb(37, 99, 235)',
                            mixBlendMode: 'screen',
                        }}
                    />
                </div>
            ),
            ariaLabel: "Visit Jodie Rummer&apos;s website"
        },
        {
            href: "https://physioshark.org",
            icon: () => (
                <div className="relative w-5 h-5 group" title="Visit Physioshark Project website">
                    <Image
                        src="https://physioshark.org/Physioshark_icon.svg"
                        alt="Physioshark Logo"
                        fill
                        className="object-contain opacity-60 group-hover:opacity-100 transition-all duration-200 brightness-0 dark:brightness-100 dark:invert"
                        sizes="20px"
                    />
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                        style={{
                            backgroundColor: 'rgb(37, 99, 235)',
                            mixBlendMode: 'screen',
                        }}
                    />
                </div>
            ),
            ariaLabel: "Visit Physioshark website"
        },
        {
            href: "https://bsky.app/profile/physiologyfish.bsky.social/",
            icon: SiBluesky as IconType,
            ariaLabel: "Follow us on Bluesky",
            title: "Follow us on Bluesky"
        },
        {
            href: "https://www.instagram.com/rummerlab/",
            icon: FaInstagram as IconType,
            ariaLabel: "Follow us on Instagram",
            title: "Follow us on Instagram"
        },
        {
            href: "https://www.facebook.com/rummerlab",
            icon: FaFacebook as IconType,
            ariaLabel: "Follow us on Facebook",
            title: "Follow us on Facebook"
        }
    ]

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
                { href: "/team", label: "Team" },
                //{ href: "/rummerlab", label: "About" },
                //{ href: "/lab", label: "Lab Members" },
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
                { href: "/blog", label: "Blog" },
            ]
        },
        { href: "/physioshark-project", label: "Physioshark" },
        { href: "/contact", label: "Contact" }
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xs border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center group">
                            <span className="text-2xl font-bold text-gray-900 dark:text-gray-50 bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400 bg-size-[200%_100%] bg-position-[0%_50%] group-hover:bg-position-[100%_50%] transition-all duration-500 ease-in-out">
                                RummerLab
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <Link 
                            href="/"
                            className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
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
                                        className="flex items-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                                        aria-expanded={activeDropdown === item.label}
                                    >
                                        {item.label}
                                        <FaChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                                    </button>
                                    <div 
                                        className={`absolute left-0 top-full pt-2 w-48 z-50 transition-all duration-200 origin-top-left ${
                                            activeDropdown === item.label 
                                                ? 'opacity-100 visible scale-100' 
                                                : 'opacity-0 invisible scale-95 pointer-events-none'
                                        }`}
                                    >
                                        <div className="rounded-md shadow-lg bg-white dark:bg-gray-900 py-1" role="menu">
                                            {item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 transition-colors duration-200"
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
                                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-200 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Social Icons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {socialLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href} 
                                    className={typeof Icon === 'function' && !('$$typeof' in Icon) 
                                        ? "text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200" 
                                        : "text-gray-500 transition-all duration-200"
                                    }
                                    aria-label={link.ariaLabel}
                                    title={link.title}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {typeof Icon === 'function' && !('$$typeof' in Icon) ? 
                                        <Icon /> : 
                                        <Icon className="h-5 w-5 opacity-60 hover:opacity-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200" />
                                    }
                                </Link>
                            )
                        })}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
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
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800`}>
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
                    {socialLinks.map((link) => {
                        const Icon = link.icon
                        return (
                            <Link 
                                key={link.href}
                                href={link.href} 
                                className={typeof Icon === 'function' && !('$$typeof' in Icon) 
                                    ? "transition-all duration-200" 
                                    : "text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-all duration-200 group"
                                }
                                onClick={handleLinkClick}
                                aria-label={link.ariaLabel}
                                title={link.title}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {typeof Icon === 'function' && !('$$typeof' in Icon) ? 
                                    <Icon /> : 
                                    <Icon className="h-6 w-6 opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
                                }
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}