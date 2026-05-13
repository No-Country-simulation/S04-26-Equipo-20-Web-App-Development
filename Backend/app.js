import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import incidentRoutes from './routes/incident.routes.js'
import areaRoutes from './routes/area.routes.js'
import rootCauseRoutes from './routes/rootCause.routes.js'

const app = express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}))

app.use('/api/users', userRoutes)
app.use('/api/incidents', incidentRoutes)
app.use('/api/areas', areaRoutes)
app.use('/api/root-causes', rootCauseRoutes)

const PORT =process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto", PORT)
})
