import api from './api';

// Helper function to store authentication data
const saveAuthData = (data) => {
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
};

// Helper function to clear authentication data
const clearAuthData = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

// Get stored user data
const getStoredUser = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

// Check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('auth_token');
};

const authService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.auth.login({ email, password });
      saveAuthData(response.data);
      return response.data.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await api.auth.register(userData);
      saveAuthData(response.data);
      return response.data.user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    if (!isAuthenticated()) {
      return null;
    }
    
    try {
      // Try to get fresh data from API
      const response = await api.auth.getProfile();
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      // If API call fails, return stored user data
      return getStoredUser();
    }
  },

  // Logout user
  logout: () => {
    clearAuthData();
    // Optionally call logout endpoint if needed
    // await api.auth.logout();
  },

  // Check if user is authenticated
  isAuthenticated,

  // Get stored user without API call
  getStoredUser,
};

export default authService;