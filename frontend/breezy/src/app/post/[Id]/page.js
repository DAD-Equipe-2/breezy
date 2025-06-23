"use client";

import Button from "@/components/button";
import Post from "@/components/post";
import BackButton from "@/components/return";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";

export default function PostDetails({ params }) {
  const { postId } = params;

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tweet, setTweet] = useState("");
  const maxCharacters = 280;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "image/jpeg") {
        alert("Seules les images JPG sont autorisées.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleTweet = () => {
    console.log("Tweet content:", tweet);
    if (imagePreview) {
      console.log("Image URL:", imagePreview);
    }
    // Tu peux maintenant envoyer tout ça à une API
  };

  return (
    <>
        <div className="flex w-full mb-6 items-center gap-4">
            <BackButton />
            <h1 className="text-2xl font-bold">Post Details</h1>
        </div>

        <Post postId={postId}>
        </Post>

        <div className="flex flex-row-reverse w-full items-center gap-3">
            {/* Bouton image */}
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
            accept=".jpg, .jpeg, image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            />

            {/* Bouton Tweet */}
            <Button
            action={handleTweet}
            text="Reply"
            textcolor="text-foreground"
            bordercolor="border-foreground"
            textFondSize="text-sm"
            paddingX="px-6"
            color="bg-primary"
            />
        </div>

        {/* Contenu : profil + input */}
        <div className="flex items-centers px-4 w-full">
            <img
            src="/breezy_logo_dark.jpg"
            alt="Profil"
            className="w-12 h-12 object-cover rounded-full mr-3"
            />
            <div className="flex flex-col w-full">
            <textarea
                value={tweet}
                onChange={(e) => {
                if (e.target.value.length <= maxCharacters) {
                    setTweet(e.target.value);
                }
                }}
                placeholder="What's happening?"
                className="w-full text-sm font-roboto text-foreground break-words placeholder:text-secondary bg-transparent"
                rows={4}
            />
            <div className="text-right text-sm text-muted-foreground mt-1">
                {tweet.length} / {maxCharacters}
            </div>
            </div>
        </div>

        {/* Aperçu de l'image sélectionnée */}
        {imagePreview && (
            <div className="px-4 mt-4 relative">
            <img
                src={imagePreview}
                alt="Aperçu"
                className="max-w-full max-h-64 rounded-lg"
            />
            <button
                onClick={() => setImagePreview(null)}
                className="absolute top-2 right-2 bg-red-500 text-foreground rounded-full p-1 text-xs hover:bg-red-600 transition"
            >
                ✕
            </button>
            </div>
        )}

        <Post postId={postId}>
        </Post>

        <Post postId={postId}>
        </Post>
        
    </>
  );
}