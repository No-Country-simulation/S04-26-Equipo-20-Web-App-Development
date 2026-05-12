/**
 * Error de negocio/cliente con código HTTP explícito.
 * Usado en servicios para comunicar al controlador
 * exactamente qué status HTTP corresponde.
 *
 * @example
 *   throw new AppError('Incidente no encontrado', 404);
 *   throw new AppError('Transición de estado no permitida', 422);
 */
export class AppError extends Error {
    /**
     * @param {string} message  Mensaje descriptivo para el cliente.
     * @param {number} statusCode Código HTTP (400, 404, 409, 422, …).
     */
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'AppError';
    }
}
