import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from 'bcrypt'

const userRepository = new UserRepository();

export class UserService{

    async registerUser(createUserDto){
        const existingUser = await UserRepository.findByEmail(createUserDto.correo)
        if(existingUser){
            throw new Error("El correo ya esta restringido")
        }
        return await UserRepository.create(createUserDto)
    }
}
