import axios from 'axios';

export async function loginUser(username, password) {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      { username, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return true;
  } catch (error) {
    const errMsg = error.response?.data || error.message || 'Échec de la requête';
    throw new Error(errMsg);
  }
}

export async function registerUserAuth({ username, password, nickname }) {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gateway/register`,
      { username, password, nickname },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return true;
  } catch (error) {
    const errMsg =
      error.response?.data?.error || error.response?.data || error.message || 'Failed to register';
    throw new Error(errMsg);
  }
}
