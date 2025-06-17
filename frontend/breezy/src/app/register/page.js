"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-16 h-16 mt-90 my-2  w-full">
      <img
        src="breezy_logo_dark.jpg"
        className="w-18 h-31 object-cover"
      />
        <div className="flex flex-col text-3xl text-bold font-Roboto justify-center items-center w-full max-w-md mx-auto mt-2">
            <p className="ml-2 mb-4">
                Create your account
            </p>
            <div className="flex w-full max-w-md h-3 ">
                <p className="text-quaternary text-sm font-thin font-roboto ml-5">Nickname unavailable</p>
            </div>
            <div className="flex justify-center text-base font-bold font-roboto my-3 w-full">
                <Input Hint="Nickname" Type="Text" />
            </div>
            <div className="flex justify-center text-base font-bold font-roboto my-3 w-full">
                <Input Hint="Username" Type="Text" />
            </div>
            <div className="flex justify-center text-base font-bold font-roboto my-3 w-full">
                <Input Hint="Password" Type="Password" />
            </div>
            <div className="flex w-full max-w-md h-3">
                <p className="text-quaternary text-sm font-thin font-roboto ml-5">Passwords must match</p>
            </div>
            <div className="flex justify-center my-2 w-full">
                <Input Hint="Verify Password" Type="Password" />
            </div>
            <div className="flex justify-center items-center my-2 w-full h-14 ">
                <Button
                    text="Register"
                    textcolor="text-foreground"
                    textFondSize="text-xl"
                    bordercolor="border-secondary"
                    color="bg-background"
                    action={() => console.log("Login clicked")}
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