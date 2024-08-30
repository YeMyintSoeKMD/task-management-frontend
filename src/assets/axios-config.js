import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
});

// Add an interceptor to set the Authorization header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('taskToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }else {
    console.log('no token - from config');
  }
  return config;
});

// this is just to remove token from local storage when there is no token in the server
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
      // Handle 401 Unauthorized errors
      if (error.response && error.response.status === 401) {
          localStorage.removeItem('taskToken');
          window.location.replace("/");
      }
      return Promise.reject(error);
  }
);

export default axiosInstance;