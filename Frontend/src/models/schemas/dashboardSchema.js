/**
 * Dashboard Schema — Estructura de datos del dashboard.
 */

// Períodos disponibles para filtros
export const DASHBOARD_PERIODS = {
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

/**
 * Estructura por defecto de las métricas.
 */
export const defaultMetrics = {
  totalIncidents: 0,
  openIncidents: 0,
  resolvedToday: 0,
  avgResolutionTime: '0h',
};

/**
 * Estructura por defecto de los KPIs.
 */
export const defaultKPIs = {
  resolutionRate: 0,
  avgResponseTime: '0h',
  slaCompliance: 0,
  criticalOpen: 0,
};
