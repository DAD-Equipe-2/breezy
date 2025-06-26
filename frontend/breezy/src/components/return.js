'use client'
import { useRouter } from 'next/navigation'
import { IoIosReturnLeft } from "react-icons/io";

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        router.back()
        setTimeout(() => {
          window.location.reload()
        }, 100)
      }}
      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-foreground bg-background text-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-200"
    >
      <IoIosReturnLeft className="text-xl sm:text-2xl" />
    </button>

  )
}