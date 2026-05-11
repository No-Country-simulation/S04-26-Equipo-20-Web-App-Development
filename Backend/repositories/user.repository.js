import {prisma} from '../config/db.js'

export class UserRepository{
    
    async createUser(userData){
        console.log("desde el repositorio",userData)
        return await prisma.user.create({
            
            data:{
                nombre:userData.nombre,
                email:userData.email,
                password:userData.password,
                rol:userData.rol
               
            }
        })
    }


    async findByEmail (email){
    return await prisma.user.findUnique({
        where:{email}
    })
}




}