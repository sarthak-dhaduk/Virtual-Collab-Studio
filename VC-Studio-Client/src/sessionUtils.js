// src/utils/sessionUtils.js

/**
 * Get user data from session storage
 * @returns {Object|null} User object or null if not logged in
 */
export const getUserSession = () => {
    const userData = sessionStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  };
  
  /**
   * Get specific user property from session
   * @param {string} property - Property to retrieve (e.g., 'email', '_id')
   * @returns {*} The property value or null if not found
   */
  export const getSessionProperty = (property) => {
    const user = getUserSession();
    return user ? user[property] : null;
  };
  
  /**
   * Check if user is logged in
   * @returns {boolean} True if user is logged in
   */
  export const isLoggedIn = () => {
    return !!getUserSession();
  };
  
  /**
   * Clear user session (logout)
   */
  export const clearUserSession = () => {
    sessionStorage.removeItem('user');
  };
  
  /**
   * Set user session (login)
   * @param {Object} userData - User object to store
   */
  export const setUserSession = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
  };