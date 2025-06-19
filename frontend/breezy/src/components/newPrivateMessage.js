"use client";

export default function NewPrivateMessage({ ProfilPicture, Username, Pseudo, onClick }) {
  return (
    <button onClick={onClick} className="w-full text-left cursor-pointer">
      <div className="group flex items-start w-full bg-foreground-300 text-primary p-4 rounded-lg mb-4 
                      border-y border-gray-500 transition duration-200 ease-in-out 
                      hover:shadow-md hover:shadow-blue-300/50">
        
        <div className="shrink-0 w-10 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
          <img
            src={ProfilPicture}
            alt="Profil"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col ml-2 pr-2">
          <div className="flex whitespace-nowrap space-x-2">
            <h2 className="text-foreground font-semibold text-sm sm:text-base md:text-xl font-roboto 
                           transition duration-200 ease-in-out group-hover:scale-105 group-hover:text-blue-500">
              {Username}
            </h2>
          </div>
          <div className="flex flex-col">
            <h3 className="text-secondary text-sm sm:text-base md:text-xl font-regular font-roboto 
                           transition duration-200 ease-in-out group-hover:scale-105 group-hover:text-blue-400">
              @{Pseudo}
            </h3>
          </div>
        </div>
      </div>
    </button>
  );
}
