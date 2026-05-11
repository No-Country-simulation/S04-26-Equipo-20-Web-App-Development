import express from 'express'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'
const app = express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use("/user/createUser", userRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto", PORT)
})