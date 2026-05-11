import { Router } from "express";
import { createUser, loginUser } from '../controllers/userController.js';
import { validateUser, validateLogin } from '../middlewares/user.validation.js';

const router = Router()

router.post("/register",createUser)
router.post('/login', validateLogin, loginUser);

export default router
