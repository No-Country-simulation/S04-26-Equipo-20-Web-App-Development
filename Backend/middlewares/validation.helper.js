import { validationResult } from 'express-validator';

/**
 * Middleware reutilizable que evalúa los errores de express-validator
 * acumulados en la cadena previa y responde 400 si hay alguno.
 * Se exporta para ser compartido por todos los archivos de validación.
 */
export const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, errors: errors.array() });
    }
    next();
};
