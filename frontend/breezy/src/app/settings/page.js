"use client";

import React, { useEffect, useRef, useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import Return from "@/components/return";
import { FaCheck } from "react-icons/fa";
import { getAuthenticatedUserProfile, getCurrentUser, getUserProfilePictureUrl, updateUserProfile, uploadProfilePicture } from "@/utils/user";

export default function EditProfilePage() {
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    nickname: "",
    bio: "",
    createdAt: ""
  });
  const [currentUser, setCurrentUser] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getAuthenticatedUserProfile();
        setUserData({
          username: data.username,
          nickname: data.nickname,
          bio: data.bio,
          createdAt: data.createdAt
        });
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      } 
    }
    fetchUser();
  }, []);

  const handlePictureChange = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    alert("Seuls les fichiers PNG, JPG ou GIF sont autorisés.");
    return;
  }

  uploadProfilePicture(file)
    .then(() => {
      console.log("Upload réussi !");r
    })
    .catch((error) => {
      console.error("Erreur d'upload :", error);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async () => {
    try {
      await updateUserProfile(nickname, bio);
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      alert("Une erreur est survenue lors de la mise à jour du profil.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 flex flex-col items-center w-full">
      {/* Header */}
      <div className="relative flex items-center justify-between w-full max-w-3xl mb-6">
        <Return />
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold font-Roboto">
          Edit Profile
        </h1>
        <Button
          action={handleFileChange}
          icon={
            <div className="flex items-center gap-2 text-foreground">
              <FaCheck />
              Valider
            </div>
          }
          textcolor="text-foreground"
          bordercolor="border-foreground"
          textFondSize="text-sm"
          paddingX="px-4"
          color="bg-transparent"
        />
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center space-y-2 mb-6 w-full max-w-3xl">
          <img
            src={getUserProfilePictureUrl(userData.username)}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/profil_picture.jpg";
            }}
          />
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          className="hidden"
          ref={fileInputRef}
          onChange={handlePictureChange}
        />

        <Button
          action={triggerFileInput}
          text="Change Profile Picture"
          textcolor="text-foreground"
          bordercolor="border-foreground"
          textFondSize="text-sm"
          paddingX="px-6"
          color="bg-transparent"
        />
      </div>

      {/* Inputs */}
      <div className="flex flex-col items-center space-y-4 w-full max-w-3xl">
        <Input Hint="Username" Type="text" FlexType="flex-row" value={userData.username} disabled={true}/>
        <Input
          Hint="Nickname"
          Type="text"
          FlexType="flex-row"
          value={userData.nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input Hint="Bio" textarea={true} FlexType="flex-col" value={userData.bio} onChange={(e) => setBio(e.target.value)}/>
      </div>
    </div>
  );
}
