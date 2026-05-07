import { UserService } from "../services/userService.js";
import CreateUserDto from '../dto/userDto.js'

const userService = new UserService();

export class UserController {

    async createUser(req,res){
        try {
            const userDTO = new CreateUserDto(req.body)
            const newUser = await UserService.registerUser(userDTO)

            res.status(201).json({
                message:'Usuario creado exitosamente',
                data:newUser
            })
            
        } catch (error) {
            res.status(400).json({
                error:error.message
            })
        }
    }

}