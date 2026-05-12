import { body } from 'express-validator';
import { handleValidation } from './validation.helper.js';
export const validateCreateRootCause = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 150 }).withMessage('El nombre debe tener entre 3 y 150 caracteres')
        .trim(),
    body('category')
        .notEmpty().withMessage('La categoría es obligatoria')
        .isLength({ min: 3, max: 100 }).withMessage('La categoría debe tener entre 3 y 100 caracteres')
        .trim(),
    handleValidation,
];

export const validateUpdateRootCause = [
    body('name')
        .optional()
        .isLength({ min: 3, max: 150 }).withMessage('El nombre debe tener entre 3 y 150 caracteres')
        .trim(),
    body('category')
        .optional()
        .isLength({ min: 3, max: 100 }).withMessage('La categoría debe tener entre 3 y 100 caracteres')
        .trim(),
    handleValidation,
];
