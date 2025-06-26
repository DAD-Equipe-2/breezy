'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import SearchBar from '@/components/searchBar';
import Return from '@/components/return';
import Footer from '@/components/footer';
import { searchUsers } from '@/utils/user'; // adapte le chemin

export default function Search() {
    const [query, setQuery]     = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (q) => {
        const users = await searchUsers(q);
        setResults(users);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] py-4 w-full pb-20">
            {/* Barre de retour + recherche */}
            <div className="flex items-start justify-start mb-3 px-4 gap-4">
                <Return />
                <div className="mt-1 w-full">
                    <SearchBar
                    placeholder="Search @people"
                    width="w-full"
                    rounded
                    query={query}
                    setQuery={setQuery}
                    handleSearch={() => handleSearch(query)}
                    />
                </div>
            </div>

            {/* Résultats */}
            <div className="flex flex-col px-4 gap-4">
                {results.length > 0 ? (
                    results.map((user) => (
                        <Link
                            key={user.username}
                            href={`/user/${encodeURIComponent(user.username)}`}
                            className="
                block p-4
                border
                border-[var(--color-quinary)]
                rounded
                bg-[var(--color-background)]
                shadow-sm
                hover:bg-[var(--color-quinary)]
                transition-colors
              "
                        >
                            <div className="flex items-center">
                                {/* Avatar */}
                                {user.avatarUrl ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt={user.username}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-[var(--color-quinary)] rounded-full mr-4" />
                                )}

                                {/* Infos */}
                                <div>
                                    <p className="font-bold text-lg text-[var(--color-foreground)]">
                                        {user.username}
                                    </p>
                                    <p className="text-sm text-[var(--color-secondary)]">
                                        @{user.nickname || 'Pas de pseudo'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex-1 flex items-center justify-center text-secondary text-center min-h-[40vh]">
                        Aucun résultat trouvé
                    </div>
                )}
            </div>

            {/* Footer fixe */}
            <div className="flex flex-col fixed bottom-0 inset-x-0 z-20 bg-[var(--color-background)] w-full">
                <Footer />
            </div>
        </div>
    );
}
