/**
 * Auth Service — Maneja todas las peticiones de autenticación.
 * 
 * Endpoints: login, register, logout, obtener perfil.
 */

import apiClient from './apiClient';

export const authService = {
  /**
   * Inicia sesión con email y contraseña.
   * @param {object} credentials - { email, password }
   * @returns {Promise<{ token, user }>}
   */
  login: (credentials) => apiClient.post('/auth/login', credentials),

  /**
   * Registra un nuevo usuario.
   * @param {object} userData - { name, email, password, role }
   * @returns {Promise<{ token, user }>}
   */
  register: (userData) => apiClient.post('/auth/register', userData),

  /**
   * Cierra la sesión del usuario actual.
   * @returns {Promise<void>}
   */
  logout: () => apiClient.post('/auth/logout'),

  /**
   * Obtiene el perfil del usuario autenticado.
   * @returns {Promise<object>}
   */
  getProfile: () => apiClient.get('/auth/me'),
};

export default authService;
