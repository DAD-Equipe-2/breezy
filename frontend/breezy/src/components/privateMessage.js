"use client";

export default function PrivateMessage({ ProfilPicture, Username, Pseudo, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left"
    >
      <div className="flex items-start w-full p-4 mb-4 border-y border-gray-500 bg-foreground-300 
                      rounded-lg transition duration-200 ease-in-out
                      hover:scale-[1.01]">
        <div className="shrink-0 w-10 h-10 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
          <img
            src={ProfilPicture}
            alt="Profil"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col ml-2 w-full">
          {/* Ligne supérieure : Username + Pseudo à gauche, heure à droite */}
          <div className="flex justify-between items-start w-full">
            <div className="flex whitespace-nowrap space-x-1">
              <h2 className="text-foreground font-semibold text-sm sm:text-base md:text-lg font-roboto 
                             transition duration-200">
                {Username}
              </h2>
              <h3 className="text-secondary text-xs sm:text-sm md:text-base font-regular font-roboto mt-[1px] 
                             transition duration-200">
                @{Pseudo}
              </h3>
            </div>

            <h4 className="text-secondary text-xs sm:text-sm md:text-base font-regular font-roboto mt-[1px]">
              12:34 PM
            </h4>
          </div>

          {/* Dernier message */}
          <div className="flex flex-col">
            <p className="text-secondary text-sm sm:text-sm md:text-base font-regular font-roboto 
                           transition duration-200">
              Lorem ipsum dolor sit amet zeazezaeaz.
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
