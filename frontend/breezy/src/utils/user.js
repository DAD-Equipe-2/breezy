import axios from 'axios';

export async function getCurrentUser() {
  let currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
      withCredentials: true
    })
      .then(response => {
      console.log('Axios is working:', response.data);
      localStorage.setItem('currentUser', response.data.username);
    })
    .catch(error => {
      console.error('Error using Axios:', error);
    });
  }
}

export async function getUserByUsername(username) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // User not found
    }
    console.error('Error fetching user by username:', error);
    throw error;
  }
}

export async function getNumberOfFollowersAndFollowingByUsername(username) {
  let numbers = {followers : 0, following : 0};
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}/followers`, {
      withCredentials: true
    });
    numbers.followers = response.data.length;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // User not found
    }
    console.error('Error fetching followers and following:', error);
    throw error;
  }
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}/following`, {
      withCredentials: true
    });
    numbers.following = response.data.length;
  } catch (error) {
    console.error('Error fetching following:', error);
    throw error;
  }
  return numbers;
}

export function getUserProfilePictureUrl(username) {
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}/avatar`
}