import { AppError } from '../errors/AppError.js';

/**
 * Traduce errores de Prisma y de negocio en respuestas HTTP descriptivas.
 *
 * Códigos de error de Prisma relevantes:
 *  P2002 – Unique constraint violation
 *  P2003 – Foreign key constraint failed
 *  P2025 – Record not found (update/delete sobre ID inexistente)
 */
export function handleError(res, error) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ ok: false, error: error.message });
    }

    const code = error?.code;

    if (code === 'P2002') {
        const field = error.meta?.target?.join(', ') ?? 'campo';
        return res.status(409).json({
            ok: false,
            error: `Ya existe un registro con el mismo valor en: ${field}`,
        });
    }

    if (code === 'P2003') {
        const field = error.meta?.field_name ?? 'relación';
        return res.status(422).json({
            ok: false,
            error: `Clave foránea inválida — verifica que el ID referenciado exista (${field})`,
        });
    }

    if (code === 'P2025') {
        return res.status(404).json({
            ok: false,
            error: 'Registro no encontrado',
        });
    }

    console.error('[Server Error]', error);
    return res.status(500).json({ ok: false, error: 'Error interno del servidor' });
}
