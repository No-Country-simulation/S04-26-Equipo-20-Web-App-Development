import { Router } from 'express';
import { createArea, listAreas } from '../controllers/area.controller.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.middleware.js';
import { validateCreateArea } from '../middlewares/incident.validation.js';

const router = Router();

router.use(verifyToken);

router.get('/', listAreas);
router.post('/', authorizeRoles('ADMIN'), validateCreateArea, createArea);

export default router;
