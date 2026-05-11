import { IncidentService } from '../services/incident.service.js';
import {
    CreateIncidentDTO,
    AssignTechnicianDTO,
    ResolveIncidentDTO,
    CreateCommentDTO,
} from '../dto/incident.dto.js';

const incidentService = new IncidentService();

export const createIncident = async (req, res) => {
    try {
        const dto = new CreateIncidentDTO(req.body);
        const incident = await incidentService.createIncident(req.user.id, dto);
        res.status(201).json({ ok: true, message: 'Incidente registrado con éxito', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const getIncident = async (req, res) => {
    try {
        const incident = await incidentService.getIncident(Number(req.params.id));
        res.status(200).json({ ok: true, data: incident });
    } catch (error) {
        res.status(404).json({ ok: false, error: error.message });
    }
};

export const listIncidents = async (req, res) => {
    try {
        const { status, type, priority, areaId } = req.query;
        const incidents = await incidentService.listIncidents({ status, type, priority, areaId });
        res.status(200).json({ ok: true, data: incidents });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const assignTechnician = async (req, res) => {
    try {
        const dto = new AssignTechnicianDTO(req.body);
        const incident = await incidentService.assignTechnician(Number(req.params.id), dto, req.user.id);
        res.status(200).json({ ok: true, message: 'Técnico asignado con éxito', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const startProgress = async (req, res) => {
    try {
        const incident = await incidentService.startProgress(Number(req.params.id), req.user.id);
        res.status(200).json({ ok: true, message: 'Incidente en progreso', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const resolveIncident = async (req, res) => {
    try {
        const dto = new ResolveIncidentDTO(req.body);
        const incident = await incidentService.resolveIncident(Number(req.params.id), req.user.id, dto);
        res.status(200).json({ ok: true, message: 'Incidente resuelto', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const closeIncident = async (req, res) => {
    try {
        const incident = await incidentService.closeIncident(Number(req.params.id));
        res.status(200).json({ ok: true, message: 'Incidente cerrado', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const cancelIncident = async (req, res) => {
    try {
        const incident = await incidentService.cancelIncident(Number(req.params.id));
        res.status(200).json({ ok: true, message: 'Incidente cancelado', data: incident });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const dto = new CreateCommentDTO(req.body);
        const comment = await incidentService.addComment(Number(req.params.id), req.user.id, dto);
        res.status(201).json({ ok: true, message: 'Comentario agregado', data: comment });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const history = await incidentService.getHistory(Number(req.params.id));
        res.status(200).json({ ok: true, data: history });
    } catch (error) {
        res.status(404).json({ ok: false, error: error.message });
    }
};
