import axios from 'axios';

/**
 * API Configuration
 * Base configuration for all API calls to the backend server
 */

// Create axios instance with default configuration
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
API.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
API.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    
    // Handle different error types
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please check your connection.';
    } else if (error.code === 'ERR_NETWORK') {
      error.message = 'Network error. Please check if the server is running.';
    } else if (error.response?.status === 404) {
      error.message = 'Resource not found.';
    } else if (error.response?.status === 500) {
      error.message = 'Server error. Please try again later.';
    }
    
    return Promise.reject(error);
  }
);

/**
 * Student API Functions
 * All CRUD operations for student management
 */

export const studentAPI = {
  /**
   * Get all students
   * @returns {Promise} Array of students
   */
  getAllStudents: async () => {
    try {
      const response = await API.get('/students');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  /**
   * Get single student by ID
   * @param {string} id - Student ID
   * @returns {Promise} Student object
   */
  getStudentById: async (id) => {
    try {
      const response = await API.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  /**
   * Create new student
   * @param {Object} studentData - Student information
   * @returns {Promise} Created student object
   */
  createStudent: async (studentData) => {
    try {
      const response = await API.post('/students', studentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  /**
   * Update existing student
   * @param {string} id - Student ID
   * @param {Object} studentData - Updated student information
   * @returns {Promise} Updated student object
   */
  updateStudent: async (id, studentData) => {
    try {
      const response = await API.put(`/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },

  /**
   * Delete student
   * @param {string} id - Student ID
   * @returns {Promise} Deletion confirmation
   */
  deleteStudent: async (id) => {
    try {
      const response = await API.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  },
};

export default API;