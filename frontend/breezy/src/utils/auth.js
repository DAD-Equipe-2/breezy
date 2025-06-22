export async function loginUser(username, password) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Échec de la requête');
  }

  return true;
}

export async function registerUser({ username, password }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to register");
  }

  const data = await res.json();
  console.log("User registered:", data);
  return data;
}

export async function profileCreateOrUpdate(user) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to create or update profile');
  }

  return true;
}