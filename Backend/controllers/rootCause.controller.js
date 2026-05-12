import { RootCauseService } from '../services/rootCause.service.js';
import { handleError } from '../middlewares/errorHandler.js';

const rootCauseService = new RootCauseService();

/**
 * Crea una nueva causa raíz.
 * Solo ADMIN o SUPERVISOR.
 */
export const createRootCause = async (req, res) => {
    try {
        const rootCause = await rootCauseService.createRootCause(req.body);
        res.status(201).json({ ok: true, message: 'Causa raíz creada con éxito', data: rootCause });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Lista todas las causas raíz registradas.
 */
export const listRootCauses = async (req, res) => {
    try {
        const rootCauses = await rootCauseService.listRootCauses();
        res.status(200).json({ ok: true, data: rootCauses });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Obtiene una causa raíz por ID.
 */
export const getRootCause = async (req, res) => {
    try {
        const rootCause = await rootCauseService.getRootCause(Number(req.params.id));
        res.status(200).json({ ok: true, data: rootCause });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Actualiza nombre o categoría de una causa raíz.
 * Solo ADMIN o SUPERVISOR.
 */
export const updateRootCause = async (req, res) => {
    try {
        const rootCause = await rootCauseService.updateRootCause(Number(req.params.id), req.body);
        res.status(200).json({ ok: true, message: 'Causa raíz actualizada', data: rootCause });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Elimina una causa raíz por ID.
 * Solo ADMIN.
 */
export const deleteRootCause = async (req, res) => {
    try {
        await rootCauseService.deleteRootCause(Number(req.params.id));
        res.status(200).json({ ok: true, message: 'Causa raíz eliminada' });
    } catch (error) {
        handleError(res, error);
    }
};
