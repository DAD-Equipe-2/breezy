"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/button";
import Return from "@/components/return";
import { FaImage } from "react-icons/fa";
import { createPost } from "@/utils/post";
import { getCurrentUser, getUserProfilePictureUrl } from "@/utils/user";

export default function TweetingPage() {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tweet, setTweet] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const maxCharacters = 280;

  const [confirmationMessage, setConfirmationMessage] = useState();

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

  const handleTweet = async () => {
    try {
      if (!tweet.trim()) {
        alert("Le tweet ne peut pas être vide !");
        return;
      }

      await createPost(tweet);

      // Reset après envoi
      setTweet("");
      setConfirmationMessage("Post successfully published !")
    } catch (error) {
      alert("Une erreur est survenue lors de la publication.");
    }
  };

  useEffect(() => {
      fetchData();
  }, []);
  
  async function fetchData() {
    try {
      const [current] = await Promise.all([
        getCurrentUser(),
      ]);
      setCurrentUser(current);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des données.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground py-4 w-full">
      
      {/* Header : flèche à gauche, icône + Tweet à droite */}
      <div className="flex items-center justify-between px-4 mb-3 w-full">
        <Return />
        <div className="flex items-center gap-3">
          {/* Bouton image */}
          <button
            onClick={() => alert("Coming soon !")}
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
            //onClick={() => alert("Coming soon !")}
            className="hidden"
          />

          {/* Bouton Tweet */}
          <Button
            action={handleTweet}
            text="Tweet"
            textcolor="text-foreground"
            bordercolor="border-foreground"
            textFondSize="text-sm"
            paddingX="px-6"
            color="bg-primary"
            disabled={!tweet.trim()} 
          />
        </div>
      </div>

      {/* Contenu : profil + input */}
      <div className="flex items-centers px-4 w-full">
        <img
            src={getUserProfilePictureUrl(currentUser)}
            className="w-16 h-16 aspect-square object-cover rounded-full"
        />
        <div className="flex flex-col w-full ml-2">
          <textarea
            value={tweet}
            onChange={(e) => {
              if (e.target.value.length <= maxCharacters) {
                setTweet(e.target.value);
              }
            }}
            placeholder="What's happening?"
            className="w-full text-sm font-roboto text-foreground break-words placeholder:text-secondary bg-transparent p-4"
            rows={4}
          />
          <div className="text-right text-sm text-muted-foreground mt-1">
            {tweet.length} / {maxCharacters}
          </div>
        </div>
      </div>

      <p className="text-l text-green text-center">{confirmationMessage}</p>
    </div>
  );
}
