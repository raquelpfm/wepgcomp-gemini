import axios from 'axios';

// This would be your backend API base URL
const API_URL = 'http://localhost:8080/api'; // Hypothetical backend URL

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor to add the auth token to every request if it exists.
 * This is a common pattern for JWT-based authentication.
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
