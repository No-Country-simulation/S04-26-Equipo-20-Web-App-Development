/**
 * Root Cause Service — Obtiene datos de análisis de causas raíz.
 */

import apiClient from './apiClient';

export const rootCauseService = {
  /**
   * Obtiene el análisis de causas raíz con filtros.
   * @param {object} params - { category, dateFrom, dateTo }
   * @returns {Promise<Array>}
   */
  getAnalysis: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/root-cause${query ? `?${query}` : ''}`);
  },

  /**
   * Obtiene estadísticas agrupadas por categoría.
   * @returns {Promise<Array>}
   */
  getByCategory: () => apiClient.get('/root-cause/by-category'),

  /**
   * Obtiene tendencias de causas raíz.
   * @param {string} period - 'week' | 'month' | 'year'
   * @returns {Promise<Array>}
   */
  getTrends: (period = 'month') => apiClient.get(`/root-cause/trends?period=${period}`),
};

export default rootCauseService;
