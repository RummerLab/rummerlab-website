"use client"

import Link from "next/link"
import { FaYoutube, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa"
import { useState } from "react"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="bg-white/95 backdrop-blur-xs border-b border-gray-200 fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="shrink-0 flex items-center">
                            <h1 className="text-2xl font-bold text-gray-800">RummerLab</h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <Link href="/research" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Research
                        </Link>
                        <Link href="/publications" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Publications
                        </Link>
                        <Link href="/lab" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Lab Members
                        </Link>
                        <Link href="/join" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Join Our Lab
                        </Link>
                        <Link href="/contact" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Contact
                        </Link>
                    </div>

                    {/* Social Icons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="https://physioshark.org/" className="text-gray-500 hover:text-gray-700">
                            <FaGlobe className="h-5 w-5" />
                        </Link>
                        <Link href="https://www.instagram.com/physioshark/" className="text-gray-500 hover:text-gray-700">
                            <FaInstagram className="h-5 w-5" />
                        </Link>
                        <Link href="https://twitter.com/physiologyfish" className="text-gray-500 hover:text-gray-700">
                            <FaTwitter className="h-5 w-5" />
                        </Link>
                        <Link href="https://www.youtube.com/@Physioshark" className="text-gray-500 hover:text-gray-700">
                            <FaYoutube className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link href="/research" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                        Research
                    </Link>
                    <Link href="/publications" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                        Publications
                    </Link>
                    <Link href="/lab" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                        Lab Members
                    </Link>
                    <Link href="/join" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                        Join Our Lab
                    </Link>
                    <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                        Contact
                    </Link>
                </div>
                <div className="flex justify-center space-x-4 pb-3 border-t border-gray-200 pt-4">
                    <Link href="https://physioshark.org/" className="text-gray-500 hover:text-gray-700">
                        <FaGlobe className="h-6 w-6" />
                    </Link>
                    <Link href="https://www.instagram.com/physioshark/" className="text-gray-500 hover:text-gray-700">
                        <FaInstagram className="h-6 w-6" />
                    </Link>
                    <Link href="https://twitter.com/physiologyfish" className="text-gray-500 hover:text-gray-700">
                        <FaTwitter className="h-6 w-6" />
                    </Link>
                    <Link href="https://www.youtube.com/@Physioshark" className="text-gray-500 hover:text-gray-700">
                        <FaYoutube className="h-6 w-6" />
                    </Link>
                </div>
            </div>
        </nav>
    )
}