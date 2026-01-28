import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getApiBaseUrl } from '@/store/environment.store';

// Creates an axios instance with default configuration
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: 30000, // 30 seconds timeout
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - update baseURL dynamically
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Update baseURL from store on each request
      config.baseURL = getApiBaseUrl();
      // Add any auth tokens or headers here if needed
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Handle errors globally
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message = error.response.data?.message || 'An error occurred';

        if (status === 400) {
          console.error('Bad Request:', message);
        } else if (status === 500) {
          console.error('Server Error:', message);
        }
        // debugger;
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network Error: No response from server');
      } else {
        // Something else happened
        console.error('Error:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create and export the API instance
const api = createAxiosInstance();

export default api;
