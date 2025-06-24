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

export async function registerUser({ username, email, password }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/`, 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to register");
  }

  return true;
}

export async function registerUserAuth({ username, password, nickname }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/gateway/register`, 
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    withCredentials: true,
    credentials: 'include',
    body: JSON.stringify({ username, password, nickname }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to register");
  }

  return true;
}