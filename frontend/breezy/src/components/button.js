"use client";

export default function Button({ text, icon, textcolor, textFondSize, paddingX, bordercolor, color, action }) {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={action}
        className={`flex items-center justify-center ${textcolor} border ${bordercolor} ${textFondSize} font-semibold rounded-full shadow-md ${color} max-w-[240px] ${paddingX} py-2 cursor-pointer transition duration-200 ease-in-out hover:opacity-80 hover:scale-105`}
      >
        {icon ? icon : text}
      </button>
    </div>
  );
}
