"use client";

import React, { useEffect, useRef, useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import Return from "@/components/return";
import { FaCheck } from "react-icons/fa";
import { getAuthenticatedUserProfile, getCurrentUser, getUserProfilePictureUrl, updateUserProfile, uploadProfilePicture } from "@/utils/user";

export default function EditProfilePage() {
  const [userData, setUserData] = useState({
  username: "",
  nickname: "",
  bio: "",
  createdAt: ""
  });
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  const maxCharacters = 300;

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
      setProfilePictureUrl(getUserProfilePictureUrl(data.username)+ `?t=${Date.now()}`);
      setNickname(data.nickname);
      setBio(data.bio);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    } 
  }

  fetchUser();
  }, []);


  const handlePictureChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    alert("Seuls les fichiers PNG, JPG ou GIF sont autorisés.");
    return;
  }

  try {
    await uploadProfilePicture(file);
    setProfilePictureUrl(getUserProfilePictureUrl(userData.username) + `?t=${Date.now()}`);
    } catch (error) {
      console.error("Erreur d'upload :", error);
    }
  };


  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async () => {
    try {
      await updateUserProfile(nickname, bio);
      setErrorMessage("");
      setConfirmationMessage("Profile successfully updated !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      setConfirmationMessage("");
      setErrorMessage("An unknown error occured");
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
            src={profilePictureUrl || "/profil_picture.jpg"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover"
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
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input Hint="Bio" textarea={true} FlexType="flex-col" value={bio} onChange={(e) => 
        {if (e.target.value.length <= maxCharacters) {setBio(e.target.value)}}}/>
      </div>
      {bio.length} / {maxCharacters}
      {confirmationMessage && (
        <p className="text-green text-xl mt-8">{confirmationMessage}</p>
      )}

      {errorMessage && (
        <p className="text-[red] text-xl mt-8">{errorMessage}</p>
      )}
    </div>
  );
}
