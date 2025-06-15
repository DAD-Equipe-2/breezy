"use client";

import Input from "@/components/input";
import Button from "@/components/button";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center w-16 h-16 mt-80 my-2  w-full">
      <img
        src="breezy_logo_dark.jpg"
        className="w-18 h-31 object-cover"
      />
        <div className="flex flex-col text-3xl text-bold fond-Roboto justify-center items-center w-full max-w-md mx-auto mt-2">
            <p className="ml-2 mb-4">
                Login to Breesy
            </p>
            <div className="flex justify-center my-2 w-full">
                <Input Nickname="Nickname" />
            </div>
            <div className="flex justify-center my-2 w-full">
                <Input Nickname="Password" />
            </div>
            <div className="flex justify-center items-center w-full max-w-md ">
                <p className="text-quaternary text-sm ml-2">Wrong nickname or password</p>
            </div>
            <div className="flex justify-center items-center my-2 w-full ">
                <Button
                    text="Login"
                    textcolor="text-background"
                    textFondSize="text-xl"
                    bordercolor="border-secondary"
                    color="bg-primary"
                    action={() => console.log("Login clicked")}
                />
            </div>
            <div className="flex items-center w-full max-w-md my-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <p className="mx-4 text-foreground text-xl">OR</p>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="flex justify-center items-center my-2 w-full ">
                <Button
                    text="Register"
                    textcolor="text-foreground"
                    textFondSize="text-xl"
                    bordercolor="border-secondary"
                    color="bg-background"
                    action={() => console.log("Login clicked")}
                />
            </div>
        </div>
    </div>
  );
}