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
  return localStorage.getItem('currentUser');
}