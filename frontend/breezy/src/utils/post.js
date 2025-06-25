import axios from 'axios';

// Function to create a new post
export async function createPost(content) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/`, { content }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Function to get all posts
export async function getPosts(username) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/user/${username}`, {
      withCredentials: true
    });
    console.log("Posts fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}