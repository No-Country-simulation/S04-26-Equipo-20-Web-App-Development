import { UserRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { AppError } from '../errors/AppError.js';

dotenv.config();

const userRepository = new UserRepository();
const SALT_ROUNDS = 10;

export class UserService{

    async registerUser(userData){
        const existingUser = await userRepository.findByEmail(userData.email)
        if(existingUser){
            throw new AppError("El correo ya esta registrado", 409)
        }
        const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
        return await userRepository.createUser({ ...userData, password: hashedPassword });
    }

    async loginUser(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Credenciales inválidas', 401);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError('Credenciales inválidas', 401);
        }
        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        return { token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } };
    }

    async getAllUsers() {
        const users = await userRepository.findAll();
        return users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError('Usuario no encontrado', 404);
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async updateUser(id, userData) {
        const { password, ...updateData } = userData;
        const updatedUser = await userRepository.update(id, updateData);
        const { password: _, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }

    async deleteUser(id) {
        return await userRepository.delete(id);
    }
}
