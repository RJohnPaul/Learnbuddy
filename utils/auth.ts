// utils/auth.ts
export const login = (username: string, password: string): boolean => {
    if (username === 'user' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      // Also set a cookie for the middleware
      document.cookie = 'isLoggedIn=true; path=/';
      return true;
    }
    return false;
  };
  
  export const logout = () => {
    localStorage.removeItem('isLoggedIn');
    // Also remove the cookie
    document.cookie = 'isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };