import { IncidentService } from '../services/incident.service.js';
import {
    CreateIncidentDTO,
    AssignTechnicianDTO,
    ResolveIncidentDTO,
    CreateCommentDTO,
} from '../dto/incident.dto.js';

const incidentService = new IncidentService();

/**
 * Registra un nuevo incidente.
 * Estado inicial: OPEN.
 */
export const createIncident = async (req, res) => {
    try {
        const dto = new CreateIncidentDTO(req.body);
        const incident = await incidentService.createIncident(req.user.id, dto);
        res.status(201).json({ ok: true, message: 'Incidente registrado con éxito', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

/**
 * Obtiene el detalle de un incidente por ID.
 * Incluye historial de estados y comentarios.
 */
export const getIncident = async (req, res) => {
    try {
        const incident = await incidentService.getIncident(Number(req.params.id));
        res.status(200).json({ ok: true, data: incident });
    } catch (error) {
        res.status(404).json({ ok: false, error: error.message });
    }
};

/**
 * Lista incidentes con filtros opcionales (status, type, priority, areaId).
 */
export const listIncidents = async (req, res) => {
    try {
        const { status, type, priority, areaId } = req.query;
        const incidents = await incidentService.listIncidents({ status, type, priority, areaId });
        res.status(200).json({ ok: true, data: incidents });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

/**
 * Asigna un técnico a un incidente.
 * Solo ADMIN o SUPERVISOR.
 * Cambia estado a: ASSIGNED.
 */
export const assignTechnician = async (req, res) => {
    try {
        const dto = new AssignTechnicianDTO(req.body);
        const incident = await incidentService.assignTechnician(Number(req.params.id), dto, req.user.id);
        res.status(200).json({ ok: true, message: 'Técnico asignado con éxito', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

/**
 * Inicia el progreso del incidente.
 * Solo el TECNICO asignado.
 * Cambia estado a: IN_PROGRESS.
 */
export const startProgress = async (req, res) => {
    try {
        const incident = await incidentService.startProgress(Number(req.params.id), req.user.id);
        res.status(200).json({ ok: true, message: 'Incidente en progreso', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

/**
 * Resuelve el incidente con una solución y causa raíz.
 * Solo el TECNICO asignado.
 * Cambia estado a: RESOLVED.
 */
export const resolveIncident = async (req, res) => {
    try {
        const dto = new ResolveIncidentDTO(req.body);
        const incident = await incidentService.resolveIncident(Number(req.params.id), req.user.id, dto);
        res.status(200).json({ ok: true, message: 'Incidente resuelto', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

/**
 * Cierra formalmente el incidente.
 * Solo ADMIN o SUPERVISOR.
 * Cambia estado a: CLOSED.
 */
export const closeIncident = async (req, res) => {
    try {
        const incident = await incidentService.closeIncident(Number(req.params.id));
        res.status(200).json({ ok: true, message: 'Incidente cerrado', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

/**
 * Cancela el incidente.
 * Solo ADMIN o SUPERVISOR.
 * Cambia estado a: CANCELLED.
 */
export const cancelIncident = async (req, res) => {
    try {
        const incident = await incidentService.cancelIncident(Number(req.params.id));
        res.status(200).json({ ok: true, message: 'Incidente cancelado', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

/**
 * Agrega un comentario a un incidente.
 */
export const addComment = async (req, res) => {
    try {
        const dto = new CreateCommentDTO(req.body);
        const comment = await incidentService.addComment(Number(req.params.id), req.user.id, dto);
        res.status(201).json({ ok: true, message: 'Comentario agregado', data: comment });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

/**
 * Obtiene la trazabilidad de cambios de estado del incidente.
 */
export const getHistory = async (req, res) => {
    try {
        const history = await incidentService.getHistory(Number(req.params.id));
        res.status(200).json({ ok: true, data: history });
    } catch (error) {
        res.status(404).json({ ok: false, error: error.message });
    }
};

