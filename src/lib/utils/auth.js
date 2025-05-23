/**
 * @param {any} userData
 */
export function saveUserData(userData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
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
    localStorage.removeItem('userData');
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!getUserData();
}



export function clearUserData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userData');
  }
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
    const response = await fetch('/api/auth?param=register', {
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
    const response = await fetch('/api/auth/?param=login', {
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
      saveUserData(data.user);
    }
    
    return data;
  },
   // @ts-ignore
   async checkAuth(fetch) {
    try {
      const response = await fetch('/api/check', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });


      
      if (!response.ok) {
        console.log('User not authenticated: ', response.status);
        clearUserData();
        return false;
      }
      
      const data = await response.json();
      console.log('User authenticated: ', data);
      if (data.user) {
        saveUserData(data.user);
        return true;
      } else {
        console.log('User authenticated: ', data);
        clearUserData();
        return false;
      }
    } catch (error) {
        console.log('User authenticated error: ', error);
      clearUserData();
      return false;
    }
  },
  // Logout current user
  async logout() {
    const response = await fetch('/api/auth?param=logout', {
      method: 'POST',
      // This is important for cookies to work
      credentials: 'include'
    });
    
    clearUserData();
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Logout failed');
    }
    
    return await response.json();
  }
};