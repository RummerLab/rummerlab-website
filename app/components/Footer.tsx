import Link from "next/link"
import Script from "next/script"
import { FaInstagram } from "react-icons/fa"
import '@/public/instafeed.css'

export default function Footer() {
  return (
    <footer className="p-5 text-center bg-gray-200">
        <h1 className="text-3xl font-bold">
            <Link href="/">Rummerlab</Link>
        </h1>
        <p className="mb-4">
            Connect with us on 
            <a href="https://www.instagram.com/rummerlab/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                <FaInstagram /> Instagram
            </a>
            !
        </p>
        <Script src="https://unpkg.com/instafeed.js@2.0.0/dist/instafeed.js" />
        <Script src="/script.js" />
        <div id="instafeed"></div>
    </footer>
  );
};

