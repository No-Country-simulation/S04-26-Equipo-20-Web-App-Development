import express from 'express'
import { UserController } from './controllers/userController.js'

const app = expres()
app.use(express.json())

const userController = new UserController()

async function testConection(){
    try {
        await prisma.$connect()
        console.log("Conexion exitosa")
    } catch (error) {
        console.log(error)
    }
}

app.post("/users",(req,res)=>userController(req,res))

const PORT =process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto", PORT)
})