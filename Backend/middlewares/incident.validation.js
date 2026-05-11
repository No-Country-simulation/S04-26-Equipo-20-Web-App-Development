import { body, validationResult } from 'express-validator';

const VALID_TYPES = ['MACHINE_FAILURE', 'ACCIDENT', 'QUALITY_DEVIATION', 'SAFETY_RISK', 'OTHER'];
const VALID_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ ok: false, errors: errors.array() });
    }
    next();
};

export const validateCreateIncident = [
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres')
        .trim(),

    body('type')
        .notEmpty().withMessage('El tipo de incidente es obligatorio')
        .isIn(VALID_TYPES).withMessage(`El tipo debe ser uno de: ${VALID_TYPES.join(', ')}`),

    body('priority')
        .notEmpty().withMessage('La prioridad es obligatoria')
        .isIn(VALID_PRIORITIES).withMessage(`La prioridad debe ser una de: ${VALID_PRIORITIES.join(', ')}`),

    body('areaId')
        .notEmpty().withMessage('El área es obligatoria')
        .isInt({ min: 1 }).withMessage('El área debe ser un ID numérico válido'),

    body('machine')
        .optional()
        .isString().withMessage('La máquina debe ser texto')
        .trim(),

    handleValidation,
];

export const validateAssignTechnician = [
    body('technicianId')
        .notEmpty().withMessage('El ID del técnico es obligatorio')
        .isInt({ min: 1 }).withMessage('El ID del técnico debe ser un número válido'),

    handleValidation,
];

export const validateResolveIncident = [
    body('solution')
        .notEmpty().withMessage('La solución es obligatoria')
        .isLength({ min: 5 }).withMessage('La solución debe tener al menos 5 caracteres')
        .trim(),

    body('rootCauseId')
        .optional()
        .isInt({ min: 1 }).withMessage('El ID de causa raíz debe ser un número válido'),

    handleValidation,
];

export const validateCreateComment = [
    body('text')
        .notEmpty().withMessage('El texto del comentario es obligatorio')
        .trim(),

    handleValidation,
];

export const validateCreateArea = [
    body('name')
        .notEmpty().withMessage('El nombre del área es obligatorio')
        .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
        .trim(),

    handleValidation,
];
