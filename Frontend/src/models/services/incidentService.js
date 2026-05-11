/**
 * Incident Service — CRUD completo para incidentes.
 * 
 * Endpoints: listar, obtener por ID, crear, actualizar, eliminar.
 */

import apiClient from './apiClient';

export const incidentService = {
  /**
   * Obtiene todos los incidentes con filtros opcionales.
   * @param {object} params - { status, priority, page, limit }
   * @returns {Promise<{ data: Array, total: number }>}
   */
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/incidents${query ? `?${query}` : ''}`);
  },

  /**
   * Obtiene un incidente por su ID.
   * @param {string} id
   * @returns {Promise<object>}
   */
  getById: (id) => apiClient.get(`/incidents/${id}`),

  /**
   * Crea un nuevo incidente.
   * @param {object} data - { title, description, priority, category, assignedTo }
   * @returns {Promise<object>}
   */
  create: (data) => apiClient.post('/incidents', data),

  /**
   * Actualiza un incidente existente.
   * @param {string} id
   * @param {object} data
   * @returns {Promise<object>}
   */
  update: (id, data) => apiClient.put(`/incidents/${id}`, data),

  /**
   * Cambia el estado de un incidente.
   * @param {string} id
   * @param {string} status - 'open' | 'in_progress' | 'resolved' | 'closed'
   * @returns {Promise<object>}
   */
  updateStatus: (id, status) => apiClient.patch(`/incidents/${id}/status`, { status }),

  /**
   * Elimina un incidente.
   * @param {string} id
   * @returns {Promise<void>}
   */
  delete: (id) => apiClient.delete(`/incidents/${id}`),
};

export default incidentService;
