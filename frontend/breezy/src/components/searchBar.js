import React from 'react';

const SearchBar = ({ placeholder, width, rounded, query, setQuery, handleSearch }) => {
    return (
        <div className={`${width}`}>
            <input
                type="text"
                className={`border p-2 ${rounded ? 'rounded-full' : 'rounded'} w-full`}
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                }}
            />
            <button onClick={handleSearch} className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
                Rechercher
            </button>
        </div>
    );
};

export default SearchBar;
