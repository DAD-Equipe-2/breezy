import api from './axios';

export async function getCurrentUser() {
  let currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
      withCredentials: true
    })
      .then(response => {
      localStorage.setItem('currentUser', response.data.username);
    })
    .catch(error => {
      console.error('Error using Axios:', error);
    });
  }
  return localStorage.getItem('currentUser');
}

export async function getUserByUsername(username) {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}`, {
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
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}/followers`, {
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
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}/following`, {
      withCredentials: true
    });
    numbers.following = response.data.length;
  } catch (error) {
    console.error('Error fetching following:', error);
    throw error;
  }
  return numbers;
}

/**
 * Recherche des utilisateurs par username partiel.
 * @param {string} username
 * @returns {Promise<Array<{ username: string; nickname: string; avatarUrl: string }>>}
 */
export async function searchUsers(username) {
  const text = username?.trim();
  if (!text) {
    return [];
  }

  try {
    const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/search`,
        {
          params: { username: text },
          withCredentials: true
        }
    );
    // response.data doit être un tableau d’objets { username, nickname, avatarUrl }
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
}

export function getUserProfilePictureUrl(username) {
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${username}/avatar`
}

// Function to check if a user is following another user
export async function isFollowing(targetUsername) {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/is-following/${targetUsername}`, {
      withCredentials: true
    });
    return response.data.isFollowing; // Assuming the API returns an object with isFollowing property
  } catch (error) {
    console.error('Error checking following status:', error);
    throw error;
  }
}

export async function followUser(targetUsername) {
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${targetUsername}/follow`,
      null,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
}


// Function to unfollow a user
export async function unfollowUser(targetUsername) {
  try {
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${targetUsername}/follow`,
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
}

// Function to update user profile
export async function updateUserProfile(nickname, bio) {
  try {
    const response = await api.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
      { nickname, bio },
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

// Function to upload a profile picture
export async function uploadProfilePicture(file) {
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    const response = await api.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
}

// Function to get the authenticated user's profile
export async function getAuthenticatedUserProfile() {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching authenticated user profile:", error);
    throw error;
  }
}