import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Safe logout
  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(null);
  };

  // Login with optional rememberMe
  const login = (userData, rememberMe = false) => {
    // ✅ Prevent re-setting user if already same token
    if (user?.token === userData.token) return;

    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
      localStorage.removeItem('user');
    }

    setUser(userData);
  };

  // Check stored user once on load
  useEffect(() => {
    const storedUser =
      localStorage.getItem('user') || sessionStorage.getItem('user');

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed); // Only once!
      } catch (err) {
        console.error('Invalid stored user data', err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
