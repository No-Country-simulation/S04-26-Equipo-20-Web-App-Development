import { UserRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const userRepository = new UserRepository();
const SALT_ROUNDS = 10;

export class UserService{

    async registerUser(userData){
        const existingUser = await userRepository.findByEmail(userData.email)
        if(existingUser){
            throw new Error("El correo ya esta registrado")
        }
        const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
        return await userRepository.createUser({ ...userData, password: hashedPassword });
    }

    async loginUser(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Credenciales inválidas');
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        return { token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } };
    }
}
