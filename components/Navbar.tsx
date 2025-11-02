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

    const handleLinkClick = () => {
        setIsMenuOpen(false)
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
                <div className="relative w-5 h-5" title="Visit Jodie Rummer's website">
                    <Image
                        src="https://jodierummer.com/favicon.png"
                        alt="Jodie Rummer Logo"
                        fill
                        className="object-contain brightness-0 dark:brightness-100 dark:invert opacity-60 hover:opacity-100 transition-opacity duration-200"
                        sizes="20px"
                    />
                </div>
            ),
            ariaLabel: "Visit Jodie Rummer&apos;s website"
        },
        {
            href: "https://physioshark.org",
            icon: () => (
                <div className="relative w-5 h-5" title="Visit Physioshark Project website">
                    <Image
                        src="https://physioshark.org/Physioshark_icon.svg"
                        alt="Physioshark Logo"
                        fill
                        className="object-contain brightness-0 dark:brightness-100 dark:invert opacity-60 hover:brightness-100 hover:dark:invert-0 hover:opacity-100 transition-all duration-200"
                        sizes="20px"
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
            ]
        },
        { href: "/physioshark-project", label: "Physioshark" },
        { href: "/contact", label: "Contact" }
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold text-gray-900 dark:text-gray-50 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
                                RummerLab
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <Link 
                            href="/"
                            className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                            Home
                        </Link>
                        {navItems.map((item) => (
                            item.type === 'dropdown' ? (
                                <div key={item.label} className="relative group">
                                    <button
                                        className="flex items-center text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        {item.label}
                                        <FaChevronDown className="ml-1 h-3 w-3" />
                                    </button>
                                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="py-1" role="menu">
                                            {item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
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
                                    className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
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
                                    className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
                                    aria-label={link.ariaLabel}
                                    title={link.title}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {typeof Icon === 'function' && !('$$typeof' in Icon) ? 
                                        <Icon /> : 
                                        <Icon className="h-5 w-5" />
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
                                className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
                                onClick={handleLinkClick}
                                aria-label={link.ariaLabel}
                                title={link.title}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {typeof Icon === 'function' && !('$$typeof' in Icon) ? 
                                    <Icon /> : 
                                    <Icon className="h-6 w-6" />
                                }
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}