import {prisma} from '../config/db.js'

export class UserRepository{

    async createUser(userData) {
        return await prisma.user.create({
            
            data:{
                nombre:userData.nombre,
                email:userData.email,
                password:userData.password,
                rol:userData.rol
               
            }
        })
    }

    async findByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    }

    async findById(id) {
        return await prisma.user.findUnique({ where: { id: parseInt(id) } });
    }

    async findByRole(rol) {
        return await prisma.user.findMany({ where: { rol } });
    }

    async findAll() {
        return await prisma.user.findMany();
    }

    async update(id, userData) {
        return await prisma.user.update({
            where: { id: parseInt(id) },
            data: userData
        });
    }

    async delete(id) {
        return await prisma.user.delete({
            where: { id: parseInt(id) }
        });
    }
}
