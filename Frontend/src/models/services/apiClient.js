/**
 * API Client — Cliente HTTP base para todas las peticiones al backend.
 * 
 * Centraliza la configuración de baseURL, headers y manejo de errores.
 * Todos los services deben usar este cliente en lugar de fetch directamente.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Realiza una petición HTTP genérica.
 * @param {string} endpoint - Ruta relativa (ej: '/incidents')
 * @param {object} options - Opciones de fetch (method, body, headers)
 * @returns {Promise<any>} - Respuesta parseada como JSON
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: error.message || `Error ${response.status}`,
        data: error,
      };
    }

    // Si el response es 204 (No Content), no intentar parsear JSON
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`[API Error] ${options.method || 'GET'} ${endpoint}:`, error);
    throw error;
  }
}

const apiClient = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, data) => request(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) => request(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (endpoint, data) => request(endpoint, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default apiClient;
