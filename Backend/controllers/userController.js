import { UserService } from "../services/userService.js";
import UserDTO from '../dto/userDto.js';
import { handleError } from '../middlewares/errorHandler.js';

const userService = new UserService();

/**
 * Registra un nuevo usuario en el sistema.
 * Hashea la contraseña antes de guardar.
 */
export const createUser = async (req, res) => {
    try {
        const userDto = new UserDTO(req.body);
        const newUser = await userService.registerUser(userDto);
        res.status(201).json({
            ok: true,
            message: 'Usuario creado con éxito',
            data: { id: newUser.id, nombre: newUser.nombre, email: newUser.email, rol: newUser.rol },
        });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Autentica un usuario y genera un token JWT.
 */
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);
        res.status(200).json({ ok: true, ...result });
    } catch (error) {
        handleError(res, error);
    }
};
