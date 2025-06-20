export default function SearchBar({ value, onChange, placeholder = "Rechercher...", onIconClick, width = "w-[90]", rounded = true}) {
  return (
    <div className={`flex items-center border bg-quinary ${rounded ? "rounded-md" : ""} px-1 py-1 ${width} `}>
      {/* Icône loupe SVG cliquable */}
      <button
        type="button"
        onClick={onIconClick}
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
          />
        </svg>
      </button>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="ml-2 flex-grow outline-none text-sm text-secondary font-roboto font-regular"
      />
    </div>
  );
}
