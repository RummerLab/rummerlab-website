import Link from "next/link"
import { FaInstagram, FaFacebook } from "react-icons/fa"

export default function Home() {
    return (
      <>
          <p className="mb-4">
            Connect with us on&nbsp;
            <a href="https://www.instagram.com/rummerlab/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline cursor-pointer">
              <FaInstagram />
              &nbsp;Instagram
            </a>
            &nbsp;and&nbsp;
            <a href="https://www.facebook.com/rummerlab" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline cursor-pointer">
              <FaFacebook />
              &nbsp;Facebook
            </a>
            !
        </p>
      </>
    );
  };