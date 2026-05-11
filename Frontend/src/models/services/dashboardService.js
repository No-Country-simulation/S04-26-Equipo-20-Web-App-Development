/**
 * Dashboard Service — Obtiene métricas y KPIs del dashboard.
 */

import apiClient from './apiClient';

export const dashboardService = {
  /**
   * Obtiene las métricas generales del dashboard.
   * @returns {Promise<{ totalIncidents, openIncidents, resolvedToday, avgResolutionTime }>}
   */
  getMetrics: () => apiClient.get('/dashboard/metrics'),

  /**
   * Obtiene datos para los gráficos de incidentes.
   * @param {object} params - { period: 'week' | 'month' | 'year' }
   * @returns {Promise<Array>}
   */
  getChartData: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/dashboard/charts${query ? `?${query}` : ''}`);
  },

  /**
   * Obtiene los KPIs de rendimiento.
   * @returns {Promise<object>}
   */
  getKPIs: () => apiClient.get('/dashboard/kpis'),
};

export default dashboardService;
