import Link from 'next/link';
import { FaHome, FaSearch } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdMailOutline } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="flex justify-around items-center bg-background text-foreground h-[10vh] overflow-hidden">
        <Link href="/" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-transform duration-200 hover:scale-110">
            <FaHome/>
        </Link>
        <Link href="/search" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-transform duration-200 hover:scale-110">
            <FaSearch/>
        </Link>
        <Link href="/notifications" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-transform duration-200 hover:scale-110">
            <IoMdNotifications fill="none" strokeWidth={40}/>
        </Link>
        <Link href="/messages" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-transform duration-200 hover:scale-110">
            <MdMailOutline/>
        </Link>
    </footer>
  );
}