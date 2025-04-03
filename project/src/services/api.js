import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your actual API URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
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
    logout: () => api.post('/auth/logout'),
  },
  
  // Portfolio endpoints
  portfolio: {
    getAll: () => api.get('/portfolio'),
    getById: (id) => api.get(`/portfolio/${id}`),
    getByPlatform: (platform) => api.get(`/portfolio/platform/${platform}`),
    create: (data) => api.post('/portfolio', data),
    update: (id, data) => api.put(`/portfolio/${id}`, data),
    delete: (id) => api.delete(`/portfolio/${id}`),
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
  
  // Transaction endpoints
  transactions: {
    execute: (data) => api.post('/transactions/execute', data),
    getHistory: () => api.get('/transactions/history'),
  },
};
