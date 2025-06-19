"use client";

import Image from "next/image";
import Post from "../components/post";
import Input from "../components/input";
import Button from "@/components/button";
import { redirect } from "next/navigation";
import NewPrivateMessage from "@/components/newPrivateMessage";
import PrivateMessage from "@/components/privateMessage";
import SearchBar from "@/components/searchBar";

export default function Home() {
  redirect("/login");
}
