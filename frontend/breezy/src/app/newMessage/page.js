"use client";

import Return from "@/components/return";
import NewPrivateMessage from "@/components/newPrivateMessage";
import { FaCheck } from "react-icons/fa";
import Button from "@/components/button";
import SearchBar from "@/components/searchBar";

export default function NewMessage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground py-4 w-full  ">
      {/* Header */}
        <div className="flex items-center justify-start mb-3 px-4 gap-4">
            <Return />
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-base font-bold font-roboto">New message</h1>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <SearchBar placeholder="Search for people" width = "w-full"  rounded = {false}/>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <NewPrivateMessage
            Username="John Doe"
            ProfilPicture="/breezy_logo_dark.jpg"
            Pseudo={"johndoe123"}
            onClick={() => console.log("John Doe selected")}
          />
          <NewPrivateMessage
            Username="John Doe"
            ProfilPicture="/breezy_logo_dark.jpg"
            Pseudo={"johndoe123"}
            onClick={() => console.log("John Doe selected")}
          />
          <NewPrivateMessage
            Username="John Doe"
            ProfilPicture="/breezy_logo_dark.jpg"
            Pseudo={"johndoe123"}
            onClick={() => console.log("John Doe selected")}
          />
          <NewPrivateMessage
            Username="John Doe"
            ProfilPicture="/breezy_logo_dark.jpg"
            Pseudo={"johndoe123"}
            onClick={() => console.log("John Doe selected")}
          />
          <NewPrivateMessage
            Username="John Doe"
            ProfilPicture="/breezy_logo_dark.jpg"
            Pseudo={"johndoe123"}
            onClick={() => console.log("John Doe selected")}
          />
          <NewPrivateMessage
            Username="John Doe"
            ProfilPicture="/breezy_logo_dark.jpg"
            Pseudo={"johndoe123"}
            onClick={() => console.log("John Doe selected")}
          />
          <NewPrivateMessage
            Username="John Doe"
            ProfilPicture="/breezy_logo_dark.jpg"
            Pseudo={"johndoe123"}
            onClick={() => console.log("John Doe selected")}
          />
          <NewPrivateMessage
            Username="John Doe"
            ProfilPicture="/breezy_logo_dark.jpg"
            Pseudo={"johndoe123"}
            onClick={() => console.log("John Doe selected")}
          />
          <NewPrivateMessage
            Username="John Doe"
            ProfilPicture="/breezy_logo_dark.jpg"
            Pseudo={"johndoe123"}
            onClick={() => console.log("John Doe selected")}
          />
          <NewPrivateMessage
            Username="John Doe"
            ProfilPicture="/breezy_logo_dark.jpg"
            Pseudo={"johndoe123"}
            onClick={() => console.log("John Doe selected")}
          />
        </div>
    </div>
  );
}