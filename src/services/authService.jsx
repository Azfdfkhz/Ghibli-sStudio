import { storage, STORAGE_KEYS } from '../utils/storage';

export const authService = {
  // Check apakah user sudah login
  isAuthenticated: () => {
    const authData = storage.get(STORAGE_KEYS.AUTH);
    return authData?.isLoggedIn && authData?.username;
  },

  // Get current user
  getCurrentUser: () => {
    const authData = storage.get(STORAGE_KEYS.AUTH);
    return authData?.username || null;
  },

  // Login user
  login: (username) => {
    const authData = {
      isLoggedIn: true,
      username: username,
      loginTime: new Date().toISOString()
    };
    return storage.set(STORAGE_KEYS.AUTH, authData);
  },

  // Logout user
  logout: () => {
    return storage.remove(STORAGE_KEYS.AUTH);
  },

  // Get auth data
  getAuthData: () => {
    return storage.get(STORAGE_KEYS.AUTH, {
      isLoggedIn: false,
      username: ''
    });
  }
};