import { UserService } from "../services/userService.js";
import UserDTO from '../dto/userDto.js'

const userService = new UserService();

export const createUser = async (req, res) => {
    try {
        const userDto = new UserDTO(req.body);
        const newUser = await userService.registerUser(userDto)
        res.status(201).json({
            message:"Usuario creado con exito",
            status:"Sucess",
            data:newUser
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};