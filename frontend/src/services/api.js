import axios from 'axios';

/**
 * Base API configuration
 * All API calls go through this instance
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor for adding auth tokens (if needed in future)
 */
apiClient.interceptors.request.use(
  (config) => {
    // Can add auth tokens here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for handling errors globally
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data.message);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error: No response from server');
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// ========================================
// API ENDPOINTS
// ========================================

/**
 * Fetch all products with optional filters
 * @param {Object} params - Query parameters (category, minPrice, maxPrice, sort)
 * @returns {Promise} Products data
 */
export const fetchProducts = async (params = {}) => {
  try {
    const response = await apiClient.get('/products', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Search products by query term
 * @param {string} query - Search term
 * @returns {Promise} Search results (max 5 products)
 */
export const searchProducts = async (query) => {
  try {
    if (!query || query.trim() === '') {
      return { success: true, data: [] };
    }
    const response = await apiClient.get('/search', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch single product by ID
 * @param {string} id - Product ID
 * @returns {Promise} Product data
 */
export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
