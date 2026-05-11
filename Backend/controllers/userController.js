import { UserService } from "../services/userService.js";
import UserDTO from '../dto/userDto.js'

const userService = new UserService();

/**
 * Registra un nuevo usuario en el sistema.
 * Hashea la contraseña antes de guardar.
 */
export const createUser = async (req, res) => {
    try {
        const userDto = new UserDTO(req.body);
        const newUser = await userService.registerUser(userDto)
        res.status(201).json({
            message: 'Usuario creado con éxito',
            data: { id: newUser.id, nombre: newUser.nombre, email: newUser.email, rol: newUser.rol },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
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
        res.status(401).json({ ok: false, error: error.message });
    }
};

