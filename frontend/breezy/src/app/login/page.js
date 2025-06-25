"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loginUser } from "@/utils/auth";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(null);

  // Récupère registered dès que le composant monte
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRegistered(params.get('registered'));
  }, []);

  const handleLogin = async () => {
    setRegistered(null);
    setError("");
    if (!username || !password) {
      setError("Please complete all fields.");
      return;
    }
    setLoading(true);
    try {
      await loginUser(username, password);
      // cookie 'accessToken' est déjà posé par le navigateur
      router.push("/home");
    } catch (err) {
      console.error(err);
      setError("Invalid identifiers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-2 w-full">
      <img
        src="/breezy_logo_dark.jpg"
        alt="Logo Breezy"
        className="w-18 h-31 object-cover"
      />
      <div className="flex flex-col text-3xl font-bold font-Roboto justify-center items-center w-full max-w-md mx-auto mt-2">
        <p className="ml-2 mb-4">Login to Breesy</p>

        {/* Username input */}
        <div className="flex w-full my-2 items-center justify-center">
          <Input
            Hint="Username"
            Type="Text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password input */}
        <div className="flex items-center justify-center w-full my-2">
          <Input
            Hint="Password"
            Type="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm font-thin my-2">
            {error}
          </p>
        )}
        <div className="flex flex-col text-green text-sm font-bold font-Roboto justify-center items-center w-full max-w-md mx-auto mt-2">
        {registered === 'true' && <p>Account created successfully !</p>}
        
        {/* Login submit button */}
        </div>
        <div className="my-4">
          <Button
            text={loading ? "Loading..." : "Login"}
            textcolor="text-background"
            textFondSize="text-xl"
            paddingX="px-30"
            bordercolor="border-secondary"
            color="bg-primary"
            action={handleLogin}
            disabled={loading}
          />
        </div>

        <div className="flex items-center w-full max-w-md my-2">
          <div className="flex-grow border-t border-gray-300"></div>
          <p className="mx-4 text-foreground text-xl">OR</p>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="my-2">
          <Button
            text="Register"
            textcolor="text-foreground"
            textFondSize="text-xl"
            paddingX="px-30"
            bordercolor="border-secondary"
            color="bg-background"
            action={() => router.push("/register")}
          />
        </div>
      </div>
    </div>
  );
}