import { UserRepository } from "../repositories/user.repository.js";
import bcrypt from 'bcrypt'

const userRepository = new UserRepository();

export class UserService{

    async registerUser(userDate){
        const existingUser = await userRepository.findByEmail(userDate.email)
        if(existingUser){
            throw new Error("El correo ya esta registrado")
        }
        return await userRepository.createUser(userDate)
    }
}
