import prisma from '../config/db.js'

export class UserRepository{
    
    async create(userData){
        return await prisma.user.create({
            data:userData
        })
    }


    async findByEmail (correo){
    return await prisma.user.findUnique({
        where:{correo}
    })
}




}