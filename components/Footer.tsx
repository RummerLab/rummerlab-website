
import Contact from "@/components/Contact"
import Socials from "@/components/Socials"

// Add in instagram images https://www.youtube.com/watch?v=kLFSTaCqzdQ

export default function Footer() {
  return (
    <footer className="p-5 text-center bg-gray-200 dark:text-black">
      <Contact />
      <Socials />
    </footer>
  );
};

