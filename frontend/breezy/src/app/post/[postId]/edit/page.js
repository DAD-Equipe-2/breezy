"use client";
import Return from "@/components/return";
import NewPrivateMessage from "@/components/newPrivateMessage";
import Post from "@/components/post";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import Button from "@/components/button";
import { getPost, updatePost } from "@/utils/post";
import { getCurrentUser, getUserProfilePictureUrl } from "@/utils/user";

export default function EditPost ({ }) {
  const { postId } = useParams();

  const [confirmationMessage, setConfirmationMessage] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState();
  const [tweet, setTweet] = useState("");

  const maxCharacters = 280;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
        const [post, user] = await Promise.all([
            getPost(postId),
            getCurrentUser(),
        ]);
        setTweet(post.content);
        setCurrentUser(user);
    } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération des données.");
    }
  }

  const handleTweet = async () => {
    try {
      if (!tweet.trim()) {
        alert("Le tweet ne peut pas être vide !");
        return;
      }
  
      updatePost(postId, tweet);

      setConfirmationMessage("Tweet modifié avec succès !")

    } catch (error) {
      alert("Une erreur est survenue lors de la publication.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground py-4 w-full  ">
      {/* Header */}
      <div className="flex items-center justify-start mb-3 px-4 gap-4">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold font-roboto mt-18">Edit your post</h1>
      </div>
      
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
    
            {/* Bouton Tweet */}
            <Button
                action={handleTweet}
                text="Edit"
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
      <p className="w-full text-center text-green">
        {confirmationMessage}
      </p>
    </div>
  );
}