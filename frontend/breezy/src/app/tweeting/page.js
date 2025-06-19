"use client";

import { useRef } from "react";
import Button from "@/components/button";
import Return from "@/components/return";
import { FaImage } from "react-icons/fa";

export default function TweetingPage() {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Image sélectionnée :", file.name);
      // Tu peux ici uploader, prévisualiser, etc.
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground py-4 w-full">
      
      {/* Header : flèche à gauche, SVG + Tweet à droite */}
      <div className="flex items-center justify-between px-4 mb-3 w-full">
        <Return />
        <div className="flex items-center gap-3">
          {/* SVG pour importer image */}
          <button
            onClick={handleImageClick}
            aria-label="Importer une image"
            className="text-primary hover:cursor-pointer"
          >
            <FaImage className="w-8 h-8" />
          </button>

          {/* Input caché */}
          <input
            type="file"
            accept=".jpg,image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Bouton Tweet */}
          <Button
            action={() => console.log("Tweet")}
            text="Tweet"
            textcolor="text-foreground"
            bordercolor="border-foreground"
            textFondSize="text-sm"
            paddingX="px-6"
            color="bg-primary"
          />
        </div>
      </div>

      {/* Contenu : image + input alignés verticalement */}
      <div className="flex items-center px-4 w-full">
        <img
          src="/breezy_logo_dark.jpg"
          alt="Profil"
          className="w-[10%] h-[10%] object-cover rounded-full mr-3"
        />
        <input
          placeholder="What's happening?"
          className="flex-grow outline-none text-base font-roboto text-foreground placeholder:text-secondary"
        />
      </div>
    </div>
  );
}
