"use client";

import Return from "@/components/return";
import Footer from "@/components/footer";
import Post from "@/components/post";
import { useRouter } from "next/navigation";
import { CiSettings } from "react-icons/ci";
import { GiFeather } from "react-icons/gi";
import Link from "next/link";
import Button from "@/components/button";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-background text-foreground w-full min-h-screen pt-16 pb-24">
      {/* Header (fixé en haut) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background flex items-center px-4 h-16">
        {/* Icône gauche */}
        <Return />

        {/* Logo centré (absolu) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="/breezy_logo_dark.jpg"
            alt="Logo"
            className="w-14 h-auto object-contain"
          />
        </div>

        {/* Icône droite */}
        <div className="ml-auto">
          <CiSettings
            className="w-8 h-8 cursor-pointer text-foreground"
            onClick={() => router.push("/settings")}
          />
        </div>
      </div>
      <div className="flex flex-col">
                <Post></Post>
                <Post></Post>
                <Post></Post>
      </div>
      <div className="flex fixed bottom-25 right-4 z-50">
        <Link href="/post/new">
          <Button
              textcolor="text-white"
              bordercolor="border-white"
              textFondSize="text-sm"
              paddingX="px-2"
              color="bg-primary"
              icon={<GiFeather className="w-6 h-6" /> }
              className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition"
          />
        </Link>
      </div>            
      {/* Footer (fixé en bas) */}
      <div className="flex flex-col fixed bottom-0 inset-x-0 z-20 bg-background w-full">
        <Footer />
      </div>
    </div>
  );
}
