"use client";

import Button from "@/components/button";
import Post from "@/components/post";
import BackButton from "@/components/return";
import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { getComments, getPost, addComment } from "@/utils/post";
import { useParams } from 'next/navigation';
import { getCurrentUser, getUserProfilePictureUrl } from "@/utils/user";

export default function PostDetails({ params }) {
  const { postId } = useParams();

  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [tweet, setTweet] = useState("");
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState([]);
  const maxCharacters = 280;
  const [error, setError] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "image/jpeg") {
        setError("Seules les images JPG sont autorisées.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleTweet = async () => {
    try {
      if (!tweet.trim()) {
        setError("Le tweet ne peut pas être vide !");
        return;
      }
  
      await addComment(postId, tweet);
  
      // Reset after sending
      setTweet("");
      fetchData(); // Refresh comments after replying
    } catch (error) {
      setError("Une erreur est survenue lors de la publication.");
    }
  };

  // Récupération du post et des commentaires
  useState(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [post, comments, current] = await Promise.all([
        getPost(postId),
        getComments(postId),
        getCurrentUser(),
      ]);
      setPost(post);
      setComments(comments);
      setCurrentUser(current);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des données.");
    }
  }

  if (!post) {
    return <div className="text-center text-muted-foreground">Chargement du post...</div>;
  }


  return (
    <div className="min-h-screen min-w-screen max-w-[100vw] p-6">
        <div className="flex w-full mb-6 items-center gap-4">
            <BackButton />
            <h1 className="text-2xl font-bold">Post Details</h1>
        </div>

        <Post
          key={post.id}
          idPost={post._id}
          currentUser={currentUser}
          user={{
            username: post.author.username,
            pseudo: post.author.nickname,
            profilePicture: post.author.avatarUrl,
          }}
          date={new Date(post.createdAt).toLocaleDateString("fr-FR", {
            month: "long", day: "numeric", year: "numeric"
          })}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
        />

        <div className="flex flex-row-reverse items-center gap-3 mb-2">
            {/* Bouton Tweet */}
            <Button
            action={handleTweet}
            text="Reply"
            textcolor="text-foreground"
            bordercolor="border-foreground"
            textFondSize="text-sm"
            paddingX="px-6"
            color="bg-primary"
            disabled={!tweet.trim()}
            />

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
            onChange={handleFileChange}
            className="hidden"
            />
        </div>

        {/* Contenu : profil + input */}
        <div className="flex items-centers w-full">
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

        <h1 className="my-8 text-xl">{post.comments} Comments :</h1>

        {comments.length > 0 && comments.map((comment) => (
          <Post
            key={comment._id}
            idPost={comment._id}
            currentUser={currentUser}
            user={{
              username: comment.author.username,
              pseudo: comment.author.nickname,
              profilePicture: comment.author.avatarUrl,
            }}
            date={new Date(comment.createdAt).toLocaleDateString("fr-FR", {
              month: "long", day: "numeric", year: "numeric"
            })}
            content={comment.content}
            likes={comment.likes}
            comments={comment.comments}
          />
        ))}

        
    </div>
  );
}