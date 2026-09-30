import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

// Get API Key from environment variables (Vite & CRA supported) with fallback
const getApiKey = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_TMDB_API_KEY) {
    return import.meta.env.VITE_TMDB_API_KEY;
  }
  if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_TMDB_API_KEY) {
    return process.env.REACT_APP_TMDB_API_KEY;
  }
  return 'ebe6b002434c7e5152032713b9825393';
};

const API_KEY = getApiKey();

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to attach API key or Bearer token
tmdbClient.interceptors.request.use(
  (config) => {
    const key = getApiKey() || API_KEY;
    if (key) {
      // If key looks like JWT (Bearer token)
      if (key.startsWith('eyJ')) {
        config.headers.Authorization = `Bearer ${key}`;
      } else {
        // Otherwise use query param api_key
        config.params = {
          ...config.params,
          api_key: key,
        };
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error normalization
tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let normalizedError = {
      message: 'An unexpected error occurred. Please try again later.',
      status: error.response?.status || 0,
      code: error.code,
    };

    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        normalizedError.message = 'Invalid or missing TMDb API key. Please configure REACT_APP_TMDB_API_KEY in .env.';
      } else if (status === 404) {
        normalizedError.message = 'The requested movie or resource was not found.';
      } else if (status === 429) {
        normalizedError.message = 'Rate limit exceeded. Please wait a moment before trying again.';
      } else if (error.response.data && error.response.data.status_message) {
        normalizedError.message = error.response.data.status_message;
      }
    } else if (error.request) {
      normalizedError.message = 'Unable to connect to movie service. Please check your internet connection.';
    }

    return Promise.reject(normalizedError);
  }
);

export default tmdbClient;
