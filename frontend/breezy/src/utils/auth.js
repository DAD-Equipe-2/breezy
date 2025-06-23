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

export async function registerUserAuth({ username, password }) {
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

  return true;
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