/**
 * Constants — Configuración global de la aplicación.
 */

// Roles de usuario
export const ROLES = {
  ADMIN: 'admin',
  SUPERVISOR: 'supervisor',
  OPERATOR: 'operator',
};

// Estados de incidentes (para UI labels)
export const STATUS_LABELS = {
  open: 'Abierto',
  in_progress: 'En Progreso',
  resolved: 'Resuelto',
  closed: 'Cerrado',
};

// Prioridades con colores Bootstrap
export const PRIORITY_COLORS = {
  low: 'info',
  medium: 'primary',
  high: 'warning',
  critical: 'danger',
};

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
};
