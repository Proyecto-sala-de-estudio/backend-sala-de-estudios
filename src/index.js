import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import administradoresRouter from './routes/administradores.js'
import equipamientosRouter from './routes/equipamientos.js'
import estadisticasUsoRouter from './routes/estadisticas-uso.js'
import reglasSistemaRouter from './routes/reglas-sistema.js'
import reservasRouter from './routes/reservas.js'
import salasRouter from './routes/salas.js'
import usuariosRouter from './routes/usuarios.js'

const app = express()
app.use(express.json())

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Sala de Estudios',
            version: '1.0.0',
            description: 'API para gestionar salas de estudios'
        },
        servers: [
            { url: 'http://localhost:3000' },
            { url: 'https://backend-sala-de-estudios.onrender.com' }
        ]
    },
    apis: ['./src/routes/*.js']
})
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/usuarios', usuariosRouter)
app.use('/administradores', administradoresRouter)
app.use('/salas', salasRouter)
app.use('/equipamientos', equipamientosRouter)
app.use('/reservas', reservasRouter)
app.use('/reglas-sistema', reglasSistemaRouter)
app.use('/estadisticas-uso', estadisticasUsoRouter)

app.listen(3000, () => {
    console.log('API en http://localhost:3000')
    console.log('Documentación en http://localhost:3000/docs')
})
