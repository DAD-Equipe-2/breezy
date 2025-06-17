"use client";

export default function Button({ text, textcolor, textFondSize, bordercolor, color, action }) {
  return (
    <button
      onClick={action}
      className={`${textcolor} border ${bordercolor} ${textFondSize} font-semibold rounded-full shadow-md ${color} w-full max-w-[240px] h-9 sm:h-10 cursor-pointer transition duration-200 ease-in-out hover:opacity-80 hover:scale-105`}
    >
      {text}
    </button>
  );
}