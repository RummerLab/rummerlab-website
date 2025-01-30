import Link from "next/link"

export default function Menu() {
    return (
        <nav className="max-w-4xl mx-auto px-4 py-4">
            <ul className="flex flex-wrap justify-center items-center gap-6 md:gap-8 list-none">
                <li>
                    <Link 
                        href="/research" 
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Research
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/publications" 
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Publications
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/lab" 
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Lab Members
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/physioshark-project" 
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Physioshark
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/collaborators" 
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Collaborators
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/join" 
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Join Us
                    </Link>
                </li>
                <li>
                    <Link 
                        href="/contact" 
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    )
}