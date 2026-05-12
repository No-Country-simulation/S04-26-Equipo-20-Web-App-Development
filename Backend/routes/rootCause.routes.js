import { Router } from 'express';
import {
    createRootCause,
    listRootCauses,
    getRootCause,
    updateRootCause,
    deleteRootCause,
} from '../controllers/rootCause.controller.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.middleware.js';
import {
    validateCreateRootCause,
    validateUpdateRootCause,
} from '../middlewares/rootCause.validation.js';

const router = Router();

router.use(verifyToken);

router.get('/', listRootCauses);
router.get('/:id', getRootCause);
router.post('/', authorizeRoles('ADMIN', 'SUPERVISOR'), validateCreateRootCause, createRootCause);
router.patch('/:id', authorizeRoles('ADMIN', 'SUPERVISOR'), validateUpdateRootCause, updateRootCause);
router.delete('/:id', authorizeRoles('ADMIN'), deleteRootCause);

export default router;
