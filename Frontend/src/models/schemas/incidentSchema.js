/**
 * Incident Schema — Estructura y validación de datos de incidentes.
 */

// Estados posibles de un incidente
export const INCIDENT_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
};

// Niveles de prioridad
export const INCIDENT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

// Categorías de incidentes
export const INCIDENT_CATEGORIES = [
  'Hardware',
  'Software',
  'Red',
  'Seguridad',
  'Infraestructura',
  'Otro',
];

/**
 * Valida los datos de un incidente antes de enviarlo al backend.
 * @param {object} data - Datos del formulario
 * @returns {{ isValid: boolean, errors: object }}
 */
export function validateIncident(data) {
  const errors = {};

  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'El título debe tener al menos 5 caracteres';
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres';
  }

  if (!data.priority || !Object.values(INCIDENT_PRIORITY).includes(data.priority)) {
    errors.priority = 'Selecciona una prioridad válida';
  }

  if (!data.category || !INCIDENT_CATEGORIES.includes(data.category)) {
    errors.category = 'Selecciona una categoría válida';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Estructura por defecto de un nuevo incidente.
 */
export const defaultIncident = {
  title: '',
  description: '',
  priority: INCIDENT_PRIORITY.MEDIUM,
  category: '',
  status: INCIDENT_STATUS.OPEN,
  assignedTo: '',
};
