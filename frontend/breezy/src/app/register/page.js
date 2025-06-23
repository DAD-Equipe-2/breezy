"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { profileCreateOrUpdate, registerUser, registerUserAuth } from "@/utils/auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [verifPassword, setVerifPassword] = useState("");
  const [error, setError]= useState("");
  const [errorPassword, setErrorPassword]= useState("");
  const [errorPasswordRequirement, setErrorPasswordRequirement]= useState("");
  const [errorUsername, setErrorUsername]= useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
      setError("");
      if (!username || !nickname || !password || !verifPassword) {
        setError("Please complete all fields.");
        return;
      }
      setErrorPassword("");
      if (password !== verifPassword) {
        setErrorPassword("Passwords do not match");
        return;
      }
      setErrorPasswordRequirement("");
      if (
        password.length <= 6 ||
        !/\d/.test(password) ||                          // chiffre
        !/[A-Z]/.test(password) ||                       // majuscule
        !/[a-z]/.test(password)                          // minuscule
        ) {
        setErrorPasswordRequirement(
            "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
        );
        return;
        }
      setErrorUsername("");
      if (username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
        setErrorUsername("Username must be at least 3 characters long and can only contain letters, numbers, and underscores");
        return;
      }
      setLoading(true);
      try {
        await registerUser({username, email : nickname, password});
        await registerUserAuth({username, password});

        router.push("/login?registered=true");
      } catch (err) {
        console.error(err);
        setError("An error occurred during registration. Please try again.");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex flex-col justify-center items-center my-2 w-full">
      <img
        src="/breezy_logo_dark.jpg"
        className="w-18 h-31 object-cover"
      />
        <div className="flex flex-col text-3xl text-bold font-Roboto justify-center items-center w-full max-w-md mx-auto mt-2">
            <p className="mb-4">
                Create your account
            </p>
            {errorUsername && (
            <p className="text-red-600 text-sm font-thin my-2">
                {errorUsername}
            </p>
            )}
            <div className="flex justify-center text-base font-bold font-roboto my-3 w-full">
                <Input Hint="Username" Type="Text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            
            <div className="flex justify-center text-base font-bold font-roboto my-3 w-full">
                <Input Hint="Nickname" Type="Text" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
            </div>
            {errorPasswordRequirement && (
            <p className="text-red-600 text-sm font-thin my-2">
                {errorPasswordRequirement}
            </p>
            )}
            <div className="flex justify-center text-base font-bold font-roboto my-3 w-full">
                <Input Hint="Password" Type="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {errorPassword && (
            <p className="text-red-600 text-sm font-thin my-2">
                {errorPassword}
            </p>
            )}
            <div className="flex justify-center my-2 w-full">
                <Input Hint="Confirm Password" Type="Password" value={verifPassword} onChange={(e) => setVerifPassword(e.target.value)}/>
            </div>
            {error && (
            <p className="text-red-600 text-sm font-thin my-2">
                {error}
            </p>
            )}
            <div className="my-2">
                <Button
                    text={loading ? "Loading..." : "Register"}
                    textcolor="text-foreground"
                    textFondSize="text-xl"
                    paddingX="px-30"
                    bordercolor="border-secondary"
                    color="bg-background"
                    action={handleLogin}
                    disabled={loading}
                />
            </div>
            <div className="flex justify-center items-center w-full max-w-md">
                <p className="text-foreground text-sm font-thin font-roboto ">Already have an account ? 
                    <Link href="/login" className="text-tertiary font-thin font-roboto hover:underline ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    </div>
  );
}