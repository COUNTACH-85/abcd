import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export API methods
export default {
  // Auth endpoints
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getProfile: () => api.get('/auth/profile'),
  },
  
  // Portfolio endpoints
  portfolio: {
    getAll: () => api.get('/portfolio'),
    getByPlatform: (platform) => api.get(`/portfolio/platform/${platform}`),
    getById: (id) => api.get(`/portfolio/${id}`),
  },
  
  // Mutual Fund endpoints
  mutualFunds: {
    search: (query) => api.get(`/mf/search?q=${query}`),
    getDetails: (schemeCode) => api.get(`/mf/${schemeCode}`),
    buy: (orderData) => api.post('/mf/buy', orderData),
    sell: (orderData) => api.post('/mf/sell', orderData),
  },
  
  // Stock endpoints
  stocks: {
    search: (query) => api.get(`/stocks/search?q=${query}`),
    getDetails: (symbol) => api.get(`/stocks/${symbol}`),
    buy: (orderData) => api.post('/stocks/buy', orderData),
    sell: (orderData) => api.post('/stocks/sell', orderData),
  },
  
  // Comparison endpoints
  comparison: {
    compare: (items) => api.post('/comparison', { items }),
    getRecommendations: (itemId) => api.get(`/comparison/recommendations/${itemId}`),
  },
};
