import api from './axios';

// Function to create a new post
export async function createPost(content) {
  try {
    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/`, { content }, {
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
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/user/${username}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    return { posts: [] };
  }
}

// Function to get the feed posts
// This function fetches the posts from the feed of the current user
export async function getFeed() {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/feed`, {
      withCredentials: true
    });
      return response.data.posts;
  } catch (error) {
    console.error("Erreur en récupérant le feed :", error);
    throw error;
  }
}

// Function to like a post
export async function likePost(postId) {
  try {
    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/like`, {}, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
}

// Function to unlike a post
export async function unlikePost(postId) {
  try {
    const response = await api.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/like`, 
      {
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
}

export async function getComments(postId) {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments`, {
      withCredentials: true
    });
    return response.data.comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}

export async function getPost(id) {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

//Add a comment to a post
export async function addComment(postId, content) {
  try {
    const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments`, { content }, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

//Update a post
export async function updatePost(postId, content) {
  try {
    const response = await api.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}`,
      { content },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}