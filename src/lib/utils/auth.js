

// Save auth token to localStorage
/**
 * Auth utility functions for client-side use
 * @param {string} token
 */
export function saveAuthToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
}

// Save user data to localStorage
/**
 * @param {any} userData
 */
export function saveUserData(userData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
}

// Get auth token from localStorage
export function getAuthToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

// Get user data from localStorage
export function getUserData() {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
}

// Clear auth data on logout
export function clearAuthData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!getAuthToken();
}

// Add auth header to fetch requests
export function addAuthHeader(headers = {}) {
  const token = getAuthToken();
  if (token) {
    return {
      ...headers,
      'Authorization': `Bearer ${token}`
    };
  }
  return headers;
}

// Auth API client
export const authApi = {
  // Register a new user
  /**
     * @param {any} email
     * @param {any} password
     * @param {any} username
     */
  async register(email, password, username) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, username })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    
    return data;
  },
  
  // Login an existing user
  /**
     * @param {any} email
     * @param {any} password
     */
  async login(email, password) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    // Save auth data if login is successful
    if (data.user && data.user.userAuthToken) {
      saveAuthToken(data.user.userAuthToken);
      saveUserData(data.user);
    }
    
    return data;
  },
  
  // Logout current user
  logout() {
    clearAuthData();
  }
};