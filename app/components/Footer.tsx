import Link from "next/link"
import Script from "next/script"
import { FaInstagram } from "react-icons/fa"
import '@/public/styles/instafeed.css'
import InstagramPosts from "./Instagram"

// Add in instagram images https://www.youtube.com/watch?v=kLFSTaCqzdQ

export default function Footer() {
  return (
    <footer className="p-5 text-center bg-gray-200">
        <h1 className="text-3xl font-bold">
            <Link href="/">Rummerlab</Link>
        </h1>
        <p className="mb-4">
            Connect with us on&nbsp;
            <a href="https://www.instagram.com/rummerlab/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              <FaInstagram />
              Instagram
            </a>
            !
        </p>
        <InstagramPosts />
    </footer>
  );
};

