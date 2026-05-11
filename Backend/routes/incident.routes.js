import { Router } from 'express';
import {
    createIncident,
    getIncident,
    listIncidents,
    assignTechnician,
    startProgress,
    resolveIncident,
    closeIncident,
    cancelIncident,
    addComment,
    getHistory,
} from '../controllers/incident.controller.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.middleware.js';
import {
    validateCreateIncident,
    validateAssignTechnician,
    validateResolveIncident,
    validateCreateComment,
} from '../middlewares/incident.validation.js';

const router = Router();

router.use(verifyToken);

router.post('/', validateCreateIncident, createIncident);
router.get('/', listIncidents);
router.get('/:id', getIncident);

router.put('/:id/assign', authorizeRoles('ADMIN', 'SUPERVISOR'), validateAssignTechnician, assignTechnician);
router.put('/:id/start', authorizeRoles('TECNICO'), startProgress);
router.put('/:id/resolve', authorizeRoles('TECNICO'), validateResolveIncident, resolveIncident);
router.put('/:id/close', authorizeRoles('ADMIN', 'SUPERVISOR'), closeIncident);
router.put('/:id/cancel', authorizeRoles('ADMIN', 'SUPERVISOR'), cancelIncident);

router.post('/:id/comments', validateCreateComment, addComment);
router.get('/:id/history', getHistory);

export default router;
