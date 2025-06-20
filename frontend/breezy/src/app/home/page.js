"use client";

import Return from "@/components/return";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-background text-foreground w-full min-h-screen pt-16 pb-24">
      {/* Header (fixé en haut) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background flex items-center justify-start px-4 gap-4 h-16">
        <Return />
        <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
            src="/breezy_logo_dark.jpg"
            alt="Logo"
            className="w-[10vw] h-auto object-contain"
            />
        </div>
        </div>
      {/* Footer (fixé en bas) */}
      <div className="flex flex-col fixed bottom-0 inset-x-0 z-20 bg-background w-full">
        <Footer />
      </div>
    </div>
  );
}
