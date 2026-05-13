const VALID_TYPES = ['MACHINE_FAILURE', 'ACCIDENT', 'QUALITY_DEVIATION', 'SAFETY_RISK', 'OTHER'];
const VALID_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export class CreateIncidentDTO {
    constructor({ description, type, priority, machine, areaId }) {
        if (!description || typeof description !== 'string' || description.trim().length < 10) {
            throw new Error('La descripción es obligatoria y debe tener al menos 10 caracteres');
        }
        if (!VALID_TYPES.includes(type)) {
            throw new Error(`El tipo debe ser uno de: ${VALID_TYPES.join(', ')}`);
        }
        if (!VALID_PRIORITIES.includes(priority)) {
            throw new Error(`La prioridad debe ser una de: ${VALID_PRIORITIES.join(', ')}`);
        }
        if (!areaId || isNaN(Number(areaId))) {
            throw new Error('El área es obligatoria y debe ser un ID numérico');
        }

        this.description = description.trim();
        this.type = type;
        this.priority = priority;
        this.machine = machine ? machine.trim() : null;
        this.areaId = Number(areaId);
    }
}

export class AssignTechnicianDTO {
    constructor({ technicianId }) {
        if (!technicianId || isNaN(Number(technicianId))) {
            throw new Error('El ID del técnico es obligatorio y debe ser numérico');
        }
        this.technicianId = Number(technicianId);
    }
}

export class ResolveIncidentDTO {
    constructor({ solution, rootCauseId }) {
        if (!solution || typeof solution !== 'string' || solution.trim().length < 5) {
            throw new Error('La solución es obligatoria y debe tener al menos 5 caracteres');
        }
        this.solution = solution.trim();
        this.rootCauseId = rootCauseId ? Number(rootCauseId) : null;
    }
}

export class CreateCommentDTO {
    constructor({ text }) {
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            throw new Error('El texto del comentario es obligatorio');
        }
        this.text = text.trim();
    }
}
