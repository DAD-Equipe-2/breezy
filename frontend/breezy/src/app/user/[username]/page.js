import Button from "@/components/button";
import Post from "@/components/post";
import BackButton from "@/components/return";
import { FaCalendar, FaSearch } from "react-icons/fa";
import Footer from "@/components/footer";
import { GiFeather } from "react-icons/gi";
import Link from "next/link";

export default async function UserProfile({ params }) {
  const { username } = await params;
  const isMyProfile = false; // TODO : call the API to check if the profile belongs to the logged-in user

  return (
    <div className="pb-20">
      <div className="flex h-[15vh] items-center bg-[#1F1F1F] p-4">
        <BackButton/>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col">
            <img
              src="/profil_picture.jpg"
              alt="Profile Picture"
              className="w-24 h-24 rounded-full mb-4"
            />
            <p className="text-2xl font-bold">{username}</p>
            <p className="text-l font-italic">@{username}</p>
            <br></br>
            <p className="text-sm text-foreground text-opacity-70">Bio: This is a sample bio for {username}.</p>
            <div className="flex">
              <FaCalendar className="text-200 mr-2" />
              <p className="text-sm text-foreground text-opacity-30">Joined: January 2023</p>
            </div>
            <div className="flex space-x-2 mt-2">
              <p className="text-sm text-foreground text-opacity-70">217 followings</p>
              <p className="text-sm text-foreground text-opacity-70">120 followers</p>
            </div>
          </div>
          <Button text="Edit profile" textFondSize="text-sm" paddingX="px-4"></Button>
        </div>
        <br/>
        <hr/>
        <br/>
        <div className="flex flex-col">
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
        </div>
      <div className="flex fixed bottom-25 right-4 z-50">
        <Link href="/post/new">
          <Button
              textcolor="text-white"
              bordercolor="border-white"
              textFondSize="text-sm"
              paddingX="px-2"
              color="bg-primary"
              icon={<GiFeather className="w-6 h-6" /> }
              className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition"
          />
        </Link>
      </div>  
      <div className="flex flex-col fixed bottom-0 inset-x-0 z-20 bg-background w-full">
          <Footer />
      </div>  
      </div>
    </div>
  );
}