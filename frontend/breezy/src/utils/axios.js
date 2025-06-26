// lib/axios.js
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
});

// lib/axios.js (suite)
if (typeof window !== 'undefined') {
  api.interceptors.response.use(
        response => {
            return response; // ✅ n'oublie pas ce return
        },
        error => {
            if (error?.code === "ERR_NETWORK") {
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
}

export default api;
