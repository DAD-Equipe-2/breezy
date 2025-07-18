"use client";

import Button from "@/components/button";
import Post from "@/components/post";
import BackButton from "@/components/return";
import { FaCalendar, FaSearch } from "react-icons/fa";
import { LuMailPlus } from "react-icons/lu";
import Footer from "@/components/footer";
import { GiFeather } from "react-icons/gi";
import Link from "next/link";
import { getCurrentUser, getUserByUsername, getNumberOfFollowersAndFollowingByUsername, getUserProfilePictureUrl, followUser, unfollowUser, isFollowing } from "@/utils/user";
import { use, useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { getPosts } from "@/utils/post";

export default function UserProfile({ params }) {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isFollowingUser, setIsFollowingUser] = useState(false);

  useEffect(() => {
    fetchData();
  }, [username]);

  async function fetchData() {
    try {
      const [userData, numbers, current, posts] = await Promise.all([
        getUserByUsername(username),
        getNumberOfFollowersAndFollowingByUsername(username),
        getCurrentUser(),
        getPosts(username)
      ]);

      if (!userData) {
        setError("Utilisateur non trouvé.");
        return;
      }
      setUser(userData);
      setFollowers(numbers.followers);
      setFollowing(numbers.following);
      setCurrentUser(current);
      setPosts(posts);
      if (userData.username != current) {
        setIsFollowingUser(await isFollowing(username));
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des données.");
    }
  } 

  const handleFollowToggle = async () => {
    try {
      if (isFollowingUser) {
        await unfollowUser(username);
      } else {
        await followUser(username);
      }

      // Reload the user data
      await fetchData();
    } catch (err) {
      console.error("Erreur lors du (un)follow :", err);
    }
  };

  if (error) {
    return (
      <div className="p-4">
        <BackButton />
        <p className="mt-4 text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4">
        {/* Spinner SVG */}
        <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <p className="text-lg text-gray-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen min-w-screen md:px-32 max-w-[100vw]">
      <div className="flex h-[15vh] items-center bg-[#1F1F1F] p-4">
        <BackButton/>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col w-full">
            <img
              src={getUserProfilePictureUrl(user.username)}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full mb-4"
            />
            <p className="text-2xl font-bold">{user.nickname.length > 15 ? `${user.nickname.slice(0, 15)}…` : user.nickname}</p>
            <p className="text-l font-italic">@{user.username}</p>
            <br></br>
            <p className="text-sm text-foreground text-opacity-70 w-full w-full break-words leading-relaxed mb-2">{user.bio ? user.bio : "No bio provided"}</p>
            <div className="flex">
              <FaCalendar className="text-200 mr-2" />
              <p className="text-sm text-foreground text-opacity-30">
                Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="flex space-x-2 mt-2">
              <p className="text-sm text-foreground text-opacity-70">{following} followings</p>
              <p className="text-sm text-foreground text-opacity-70">{followers} followers</p>
            </div>
          </div>
          
          {currentUser === user.username ? (
          <Link href="/settings">
            <Button text="Edit&nbsp;profile" textFondSize="text-sm" paddingX="px-4" />
          </Link>
        ) : (
          <div className="flex space-x-2 mr-1 items-center">
              <Button
                action={() => alert("Coming soon... ")}
                icon={<LuMailPlus className="w-4 h-4" />}
                textFondSize="text-sm"
                paddingX="px-3"
                color="bg-primary"
                textcolor="text-foreground"
                bordercolor="border-primary"
              />
            <Button
              text={isFollowingUser ? "Unfollow" : "Follow"}
              textFondSize="text-sm"
              paddingX="px-4"
              color={isFollowingUser ? "bg-foreground" : "bg-primary"}
              textcolor={isFollowingUser ? "text-primary" : "text-forgeround"}
              bordercolor="border-primary"
              action={handleFollowToggle}
            />
          </div>
        )}
        </div>
        <br/>
        <hr/>
        <br/>
        <div className="flex flex-col">
          <div className="flex flex-col">
            {posts && posts.posts && posts.posts.length > 0 ? (
              posts.posts.map((post) => (
                <Post
                  key={post._id}
                  idPost={post._id}
                  currentUser={currentUser}
                  user={{
                    username: posts.author.username,
                    pseudo: posts.author.nickname,
                    profilePicture: posts.author.avatarUrl,
                  }}
                  date={new Date(post.createdAt).toLocaleDateString("fr-FR", {
                    month: "long", day: "numeric", year: "numeric"
                  })}
                  content={post.content}
                  likes={post.likes}
                  comments={post.comments}
                />
              ))
            ) : (
              <p className="text-sm text-muted mt-4">No post available</p>
            )}
          </div>

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