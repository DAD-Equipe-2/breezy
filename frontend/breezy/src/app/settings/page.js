"use client";

import React from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import Return from "@/components/return";
import { FaCheck } from "react-icons/fa";

export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 flex flex-col items-center">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-3xl mb-6">
        <Return></Return>
        <h1 className="text-lg font-semibold font-Roboto">Edit Profile</h1>
        <Button
          action={() => console.log("Valider")}
          icon={
            <div className="flex items-center gap-2 text-foreground">
              <FaCheck />
              Valider
            </div>
          }
          textcolor="text-foreground"
          bordercolor="border-foreground"
          textFondSize="text-sm"
          paddingX="px-4"
          color="bg-transparent"
        />
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center space-y-2 mb-6 w-full max-w-3xl">
        <div className="w-28 h-28 rounded-full bg-gray-300 dark:bg-gray-600" />
        <Button
          action={() => console.log("Changer photo")}
          text="Change Profile Picture"
          textcolor="text-foreground"
          bordercolor="border-foreground"
          textFondSize="text-sm"
          paddingX="px-6"
          color="bg-transparent"
        />
      </div>

      {/* Inputs displayed horizontally */}
      <div className="flex flex-col items-center space-y-4 w-full max-w-3xl">
        <Input Hint="Name" Type="text" FlexType="flex-row" />
        <Input Hint="Username" Type="text" FlexType="flex-row" />
        <Input Hint="Bio" textarea={true} FlexType="flex-col" />
      </div>
    </div>
  );
}
