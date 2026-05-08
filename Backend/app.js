import express from 'express'
import userRoutes from './routes/userRoutes.js'
const app = express()
app.use(express.json())

async function testConection(){
    try {
        await prisma.$connect()
        console.log("Conexion exitosa")
    } catch (error) {
        console.log(error)
    }
}

app.use("/user/createUser",userRoutes)

const PORT =process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto", PORT)
})