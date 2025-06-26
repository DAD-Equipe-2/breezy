"use client";

import Link from 'next/link';
import { FaHome, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdMailOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  const handleLogout = () => {
    //TODO : call the /logout route to remove the accessToken cookie
    router.push('/login');
  };

  return (
    <footer className="flex justify-around items-center bg-background text-foreground h-[10vh] overflow-hidden">
      <Link href="/home" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-transform duration-200 hover:scale-110">
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
      <button
        onClick={handleLogout}
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-transform duration-200 hover:scale-110 cursor-pointer"
      >
        <FaSignOutAlt />
      </button>
    </footer>
  );
}
