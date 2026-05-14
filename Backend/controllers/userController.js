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

/**
 * Obtiene el perfil del usuario autenticado.
 */
export const getMe = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        res.status(200).json({ ok: true, data: user });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Obtiene todos los usuarios.
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ ok: true, data: users });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Obtiene un usuario por ID.
 */
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        res.status(200).json({ ok: true, data: user });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Actualiza un usuario.
 */
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await userService.updateUser(id, req.body);
        res.status(200).json({
            ok: true,
            message: 'Usuario actualizado con éxito',
            data: updatedUser,
        });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Elimina un usuario.
 */
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(200).json({
            ok: true,
            message: 'Usuario eliminado con éxito',
        });
    } catch (error) {
        handleError(res, error);
    }
};

/**
 * Cambia el rol de un usuario.
 */
export const changeUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { rol } = req.body;
        
        if (!rol) {
            return res.status(400).json({ ok: false, error: 'El rol es requerido' });
        }

        const updatedUser = await userService.updateUser(id, { rol });
        res.status(200).json({
            ok: true,
            message: 'Rol de usuario actualizado con éxito',
            data: updatedUser,
        });
    } catch (error) {
        handleError(res, error);
    }
};
