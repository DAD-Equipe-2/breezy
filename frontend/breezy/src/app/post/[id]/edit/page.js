"use client";
import Return from "@/components/return";
import NewPrivateMessage from "@/components/newPrivateMessage";
import Post from "@/components/post";

export default function EditPost ({ }) {
    return (
    <div className="flex flex-col min-h-screen bg-background text-foreground py-4 w-full  ">
            {/* Header */}
            <div className="flex items-center justify-start mb-3 px-4 gap-4">
                <Return />
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-base font-bold font-roboto">Edit your post</h1>
            </div>

            <div className="flex flex-col items-center justify-center w-full">
                <Post />
            </div>
        </div>
    );
}