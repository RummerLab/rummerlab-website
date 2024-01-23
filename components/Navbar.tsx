import Link from "next/link"
import { FaYoutube, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa"

export default function Navbar() {
    return (
        <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
            <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
                <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
                    <Link href="/" className="text-white/80 no-underline hover:text-white">RummerLab</Link>
                </h1>
                <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl lg:text-5xl">
                    <Link className="text-white/80 hover:text-white" href="https://physioshark.org/">
                        <FaGlobe />
                    </Link>
                    <Link className="text-white/80 hover:text-white" href="https://www.instagram.com/physioshark/">
                        <FaInstagram />
                    </Link>
                    <Link className="text-white/80 hover:text-white" href="https://www.jodierummer.com/">
                        <FaGlobe />
                    </Link>
                    <Link className="text-white/80 hover:text-white" href="https://www.instagram.com/rummerlab/">
                        <FaInstagram />
                    </Link>
                    <Link className="text-white/80 hover:text-white" href="https://twitter.com/physiologyfish">
                        <FaTwitter />
                    </Link>
                    <Link className="text-white/80 hover:text-white" href="https://www.youtube.com/@Physioshark">
                        <FaYoutube />
                    </Link>
                    <Link className="text-white/80 hover:text-white" href="https://www.instagram.com/rummerjodie/">
                        <FaInstagram />
                    </Link>
                </div>
            </div>
        </nav>
    )
}