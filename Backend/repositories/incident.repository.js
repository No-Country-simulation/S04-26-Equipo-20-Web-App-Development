import { prisma } from '../config/db.js';

const INCIDENT_INCLUDE = {
    creator: { select: { id: true, nombre: true, email: true, rol: true } },
    technician: { select: { id: true, nombre: true, email: true, rol: true } },
    area: true,
    rootCause: true,
    comments: {
        include: { user: { select: { id: true, nombre: true, rol: true } } },
        orderBy: { createdAt: 'asc' },
    },
    history: { orderBy: { changedAt: 'asc' } },
};

export class IncidentRepository {

    async create(data) {
        return await prisma.incident.create({
            data,
            include: INCIDENT_INCLUDE,
        });
    }

    async findById(id) {
        return await prisma.incident.findUnique({
            where: { id },
            include: INCIDENT_INCLUDE,
        });
    }

    async findAll({ status, type, priority, areaId, technicianId, creatorId } = {}) {
        const where = {};
        if (status) where.status = status;
        if (type) where.type = type;
        if (priority) where.priority = priority;
        if (areaId) where.areaId = Number(areaId);
        if (technicianId) where.technicianId = Number(technicianId);
        if (creatorId) where.creatorId = Number(creatorId);

        return await prisma.incident.findMany({
            where,
            include: INCIDENT_INCLUDE,
            orderBy: { createdAt: 'desc' },
        });
    }

    async update(id, data) {
        return await prisma.incident.update({
            where: { id },
            data,
            include: INCIDENT_INCLUDE,
        });
    }

    async addComment(incidentId, userId, text) {
        return await prisma.comment.create({
            data: { incidentId, userId, text },
            include: { user: { select: { id: true, nombre: true, rol: true } } },
        });
    }

    async addHistory(incidentId, oldStatus, newStatus) {
        return await prisma.incidentHistory.create({
            data: { incidentId, oldStatus, newStatus },
        });
    }

    async getHistory(incidentId) {
        return await prisma.incidentHistory.findMany({
            where: { incidentId },
            orderBy: { changedAt: 'asc' },
        });
    }
}
