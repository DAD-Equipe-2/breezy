"use client";

import Return from "@/components/return";
import PrivateMessage from "@/components/privateMessage";
import { FaCheck } from "react-icons/fa";
import Button from "@/components/button";
import SearchBar from "@/components/searchBar";
import Footer from "@/components/footer";
import { TbMailPlus } from "react-icons/tb";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function NewMessage() {
    const router = useRouter();
  return (
    <div className="flex flex-col bg-background text-foreground py-4 w-full pb-22 ">
      {/* Header */}
        <div className="flex items-center justify-start mb-3 px-4 gap-4">
            <Return />
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-base sm:text-xl md:text-2xl font-bold font-roboto">Messages</h1>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <SearchBar placeholder="Search for people" width = "w-full"  rounded = {false}/>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="John Doe"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        <PrivateMessage
            Username="Test"
            Pseudo="johndoe123"
            ProfilPicture="/breezy_logo_dark.jpg"
            Date="06/19/25"
            LastMessage="Hello, how are you?"
            onClick={() => console.log("John Doe selected")}
        />
        </div>
        <div className="flex fixed bottom-25 right-4 z-50">
            <Button
                action={() => router.push("/newMessage")}
                text="New Message"
                textcolor="text-white"
                bordercolor="border-white"
                textFondSize="text-sm"
                paddingX="px-2"
                color="bg-primary"
                icon={<TbMailPlus className="w-6 h-6" /> }
                className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition"
            />
        </div>
        <div className="flex flex-col fixed bottom-0 inset-x-0 z-20 bg-background w-full">
            <Footer />
        </div>
    </div>
  );
}