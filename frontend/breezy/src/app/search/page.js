"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '@/components/SearchBar'; // Assure-toi que le chemin est correct
import Return from '@/components/Return';
import Post from '@/components/Post';
import Footer from '@/components/Footer';

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (query) => {
        try {
            const res = await axios.get(`/api/user/search?query=${query}`);
            setResults(res.data);
        } catch (error) {
            console.error('Erreur lors de la recherche :', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground py-4 w-full pb-20">
            <div className="flex items-center justify-start mb-3 px-4 gap-4">
                <Return />
                <SearchBar
                    placeholder="Search #hashtag or @people"
                    width="w-full"
                    rounded={true}
                    query={query}
                    setQuery={setQuery}
                    handleSearch={() => handleSearch(query)}
                />
            </div>

            <div className="flex flex-col px-4 gap-4">
                {results.length > 0 ? (
                    results.map((user) => (
                        <div key={user._id} className="p-4 border rounded bg-white shadow">
                            <p className="font-bold">{user.username}</p>
                            <p className="text-sm text-gray-500">{user.bio || 'Aucune biographie disponible.'}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Aucun résultat trouvé</p>
                )}
            </div>

            <div className="flex flex-col fixed bottom-0 inset-x-0 z-20 bg-background w-full">
                <Footer />
            </div>
        </div>
    );
}
