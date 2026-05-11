/**
 * Environment — Variables de entorno centralizadas.
 */
export const ENV = {
  API_URL: 'http://localhost:3000',
  register: '/user/createUser',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'OpsCore',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
};

export default ENV;
