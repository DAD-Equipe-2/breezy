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
    return { posts: [] };
  }
}

// Function to get the feed posts
// This function fetches the posts from the feed of the current user
export async function getFeed() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/feed`, {
      withCredentials: true
    });
    console.log("Feed posts fetched:", response.data);
    return response.data;
   } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.debug("Pas de posts trouvés (404).");
      return { posts: [] };
    }
    console.error("Erreur en récupérant le feed :", error);
    throw error;
  }
}

// Function to like a post
export async function likePost(postId) {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/like`, {}, {
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
    const response = await axios.delete(
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log("Pas de commentaires trouvés (404).");
      return [];
    }
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export async function getPost(id) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`, {
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
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}/comments`, { content }, {
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
    const response = await axios.patch(
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