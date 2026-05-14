import { Router } from "express";
import { createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser, changeUserRole, getMe } from '../controllers/userController.js';
import { validateUser, validateLogin, validateUpdateUser } from '../middlewares/user.validation.js';
import { verifyToken, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router()

// Rutas públicas
router.post("/register", validateUser, createUser)
router.post('/login', validateLogin, loginUser);

// Rutas protegidas (Requieren autenticación)
router.use(verifyToken);

router.get("/me", getMe);
router.get("/", authorizeRoles('ADMIN', 'SUPERVISOR'), getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", validateUpdateUser, updateUser);
router.delete("/:id", authorizeRoles('ADMIN'), deleteUser);

// Ruta específica para cambio de rol (Solo ADMIN)
router.patch("/:id/role", authorizeRoles('ADMIN'), changeUserRole);

export default router
