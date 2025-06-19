"use client";

import Return from "@/components/return";
import NewPrivateMessage from "@/components/newPrivateMessage";
import { FaCheck } from "react-icons/fa";
import Button from "@/components/button";
import SearchBar from "@/components/searchBar";
import Post from "@/components/post";

export default function Search() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground py-4 w-full  ">
      {/* Header */}
        <div className="flex items-center justify-start mb-3 px-4 gap-4">
          <Return />
          <SearchBar placeholder="Search #hashtag or @people" width = "w-full"  rounded = {true}/>
        </div>
        <div className="flex flex-col">
            <Post></Post>
            <Post></Post>
            <Post></Post>
        </div>  
    </div>
  );
}