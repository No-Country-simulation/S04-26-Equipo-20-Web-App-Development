/**
 * useAuth — Hook controlador de autenticación.
 * Conecta AuthContext (Model) con las Views de login/register.
 */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../models/store/AuthContext';
import authService from '../../models/services/authService';

export function useAuth() {
  const { user, isAuthenticated, saveAuth, clearAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      saveAuth(response.user, response.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      saveAuth(response.user, response.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  return { user, isAuthenticated, login, register, logout, loading, error };
}
