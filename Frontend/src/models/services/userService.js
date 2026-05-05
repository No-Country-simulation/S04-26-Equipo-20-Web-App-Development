/**
 * User Service — CRUD para gestión de usuarios.
 */

import apiClient from './apiClient';

export const userService = {
  /**
   * Obtiene todos los usuarios.
   * @param {object} params - { role, page, limit }
   * @returns {Promise<{ data: Array, total: number }>}
   */
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/users${query ? `?${query}` : ''}`);
  },

  /**
   * Obtiene un usuario por ID.
   * @param {string} id
   * @returns {Promise<object>}
   */
  getById: (id) => apiClient.get(`/users/${id}`),

  /**
   * Crea un nuevo usuario.
   * @param {object} data - { name, email, password, role }
   * @returns {Promise<object>}
   */
  create: (data) => apiClient.post('/users', data),

  /**
   * Actualiza un usuario existente.
   * @param {string} id
   * @param {object} data
   * @returns {Promise<object>}
   */
  update: (id, data) => apiClient.put(`/users/${id}`, data),

  /**
   * Elimina un usuario.
   * @param {string} id
   * @returns {Promise<void>}
   */
  delete: (id) => apiClient.delete(`/users/${id}`),
};

export default userService;
