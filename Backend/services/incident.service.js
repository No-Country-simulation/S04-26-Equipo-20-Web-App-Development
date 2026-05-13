import { IncidentRepository } from '../repositories/incident.repository.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AreaRepository } from '../repositories/area.repository.js';
import { RootCauseRepository } from '../repositories/rootCause.repository.js';
import { AppError } from '../errors/AppError.js';

const incidentRepository = new IncidentRepository();
const userRepository = new UserRepository();
const areaRepository = new AreaRepository();
const rootCauseRepository = new RootCauseRepository();

const ALLOWED_TRANSITIONS = {
    OPEN: ['ASSIGNED', 'CANCELLED'],
    ASSIGNED: ['IN_PROGRESS', 'CANCELLED'],
    IN_PROGRESS: ['RESOLVED', 'CANCELLED'],
    RESOLVED: ['CLOSED', 'CANCELLED'],
    CLOSED: [],
    CANCELLED: [],
};

export class IncidentService {

    async createIncident(creatorId, dto) {
        const area = await areaRepository.findById(dto.areaId);
        if (!area) {
            throw new AppError('El área especificada no existe', 404);
        }

        return await incidentRepository.create({
            description: dto.description,
            type: dto.type,
            priority: dto.priority,
            machine: dto.machine,
            areaId: dto.areaId,
            creatorId,
            status: 'OPEN',
        });
    }

    async getIncident(id) {
        const incident = await incidentRepository.findById(id);
        if (!incident) {
            throw new AppError('Incidente no encontrado', 404);
        }
        return incident;
    }

    async listIncidents(filters) {
        return await incidentRepository.findAll(filters);
    }

    async assignTechnician(incidentId, dto, actorId) {
        const incident = await this.getIncident(incidentId);
        this.validateTransition(incident.status, 'ASSIGNED');

        const technician = await userRepository.findById(dto.technicianId);
        if (!technician) {
            throw new AppError('El técnico especificado no existe', 404);
        }
        if (technician.rol !== 'TECNICO') {
            throw new AppError('El usuario asignado debe tener rol TECNICO', 422);
        }

        await incidentRepository.addHistory(incidentId, incident.status, 'ASSIGNED');

        return await incidentRepository.update(incidentId, {
            technicianId: dto.technicianId,
            status: 'ASSIGNED',
            assignedAt: new Date(),
        });
    }

    async startProgress(incidentId, userId) {
        const incident = await this.getIncident(incidentId);
        this.validateTransition(incident.status, 'IN_PROGRESS');

        if (incident.technicianId !== userId) {
            throw new AppError('Solo el técnico asignado puede iniciar el progreso', 403);
        }

        await incidentRepository.addHistory(incidentId, incident.status, 'IN_PROGRESS');

        return await incidentRepository.update(incidentId, {
            status: 'IN_PROGRESS',
            startedAt: new Date(),
        });
    }

    async resolveIncident(incidentId, userId, dto) {
        const incident = await this.getIncident(incidentId);
        this.validateTransition(incident.status, 'RESOLVED');

        if (incident.technicianId !== userId) {
            throw new AppError('Solo el técnico asignado puede resolver el incidente', 403);
        }

        if (dto.rootCauseId) {
            const rootCause = await rootCauseRepository.findById(dto.rootCauseId);
            if (!rootCause) {
                throw new AppError(
                    `La causa raíz con ID ${dto.rootCauseId} no existe. Regístrela primero en /api/root-causes`,
                    404,
                );
            }
        }

        await incidentRepository.addHistory(incidentId, incident.status, 'RESOLVED');

        return await incidentRepository.update(incidentId, {
            status: 'RESOLVED',
            solution: dto.solution,
            rootCauseId: dto.rootCauseId ?? null,
            resolvedAt: new Date(),
        });
    }

    async closeIncident(incidentId) {
        const incident = await this.getIncident(incidentId);
        this.validateTransition(incident.status, 'CLOSED');

        await incidentRepository.addHistory(incidentId, incident.status, 'CLOSED');

        return await incidentRepository.update(incidentId, {
            status: 'CLOSED',
            closedAt: new Date(),
        });
    }

    async cancelIncident(incidentId) {
        const incident = await this.getIncident(incidentId);
        this.validateTransition(incident.status, 'CANCELLED');

        await incidentRepository.addHistory(incidentId, incident.status, 'CANCELLED');

        return await incidentRepository.update(incidentId, {
            status: 'CANCELLED',
        });
    }

    async addComment(incidentId, userId, dto) {
        await this.getIncident(incidentId);
        return await incidentRepository.addComment(incidentId, userId, dto.text);
    }

    async getHistory(incidentId) {
        await this.getIncident(incidentId);
        return await incidentRepository.getHistory(incidentId);
    }

    validateTransition(currentStatus, targetStatus) {
        const allowed = ALLOWED_TRANSITIONS[currentStatus] || [];
        if (!allowed.includes(targetStatus)) {
            throw new AppError(
                `No se puede cambiar el estado de ${currentStatus} a ${targetStatus}`,
                422,
            );
        }
    }
}
