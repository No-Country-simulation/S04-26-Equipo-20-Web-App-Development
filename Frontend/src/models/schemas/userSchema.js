/**
 * User Schema — Estructura y validación de datos de usuarios.
 */

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  SUPERVISOR: 'SUPERVISOR',
  OPERATOR: 'OPERARIO',
};

/**
 * Valida los datos de un usuario.
 * @param {object} data
 * @returns {{ isValid: boolean, errors: object }}
 */
export function validateUser(data) {
  const errors = {};

  if (!data.nombre || data.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Ingresa un email válido';
  }

  if (data.password && data.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  if (!data.rol || !Object.values(USER_ROLES).includes(data.rol)) {
    errors.rol = 'Selecciona un rol válido';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export const defaultUser = {
  nombre: '',
  email: '',
  password: '',
  rol: USER_ROLES.OPERATOR,
};
