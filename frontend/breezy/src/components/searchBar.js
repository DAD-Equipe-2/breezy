import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ placeholder, width, rounded, query, setQuery, handleSearch }) => {
    return (
        <div className={`relative ${width}`}>
            <input
                type="text"
                className={`border p-2 pr-10 ${rounded ? 'rounded-full' : 'rounded'} w-full`}
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                }}
            />
            <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary cursor-pointer mx-4"
            >
                <FaSearch />
            </button>
        </div>
    );
};

export default SearchBar;
