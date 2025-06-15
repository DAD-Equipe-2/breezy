"use client";

import Image from "next/image";
import Post from "../components/post";
import Input from "../components/input";
import Button from "@/components/button";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}
