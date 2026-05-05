/**
 * Auth Context — Estado global de autenticación.
 * 
 * Provee: user, token, isAuthenticated, login, logout.
 * Wrap la app en <AuthProvider> para que todos los componentes accedan al estado de auth.
 */

import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Al montar, verificar si hay token guardado
  useEffect(() => {
    if (token) {
      // TODO: Validar token con el backend (GET /auth/me)
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [token]);

  const saveAuth = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    saveAuth,
    clearAuth,
  };

  return (
    <AuthContext value={value}>
      {children}
    </AuthContext>
  );
}

export default AuthContext;
