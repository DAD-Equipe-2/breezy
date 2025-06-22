export default async function loginUser(username, password) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',               // ← ici
      body: JSON.stringify({ username, password }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Échec de la requête');
  }

  // Le cookie est automatiquement enregistré par le navigateur.
  // Si tu veux juste savoir que tout est OK, tu peux retourner la réponse ou un drapeau :
  return true;
}