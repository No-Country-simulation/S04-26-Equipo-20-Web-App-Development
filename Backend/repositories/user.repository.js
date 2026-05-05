import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

export class UserRepository{
    async create(data){
        return await prisma.user.create({
            data,
            include:{rol:true}
        })
    }
}