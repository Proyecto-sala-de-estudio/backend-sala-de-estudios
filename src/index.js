import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import db from './db.js'

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
    apis: ['./src/index.js']
})
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos los usuarios
 *     responses:
 *       200:
 *         description: Array de usuarios
 */
app.get('/usuarios', (req, res) => {
    res.json(db.prepare('SELECT * FROM usuarios').all())
})

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               correo: { type: string }
 *               facultad: { type: string }
 *     responses:
 *       201:
 *         description: Usuario creado
 */
app.post('/usuarios', (req, res) => {
    const { nombre, correo, facultad } = req.body
    const r = db
        .prepare(
            'INSERT INTO usuarios (nombre, correo, facultad) VALUES (?, ?, ?)'
        )
        .run(nombre, correo, facultad)
    res.status(201).json({ id: r.lastInsertRowid, nombre, correo, facultad })
})

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Modifica un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               correo: { type: string }
 *               facultad: { type: string }
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: No encontrado
 */
app.put('/usuarios/:id', (req, res) => {
    const { nombre, correo, facultad } = req.body
    const i = db
        .prepare(
            'UPDATE usuarios SET nombre=?, correo=?, facultad=? WHERE id=?'
        )
        .run(nombre, correo, facultad, req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json({ mensaje: 'Usuario actualizado' })
})

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: No encontrado
 */
app.delete('/usuarios/:id', (req, res) => {
    const i = db.prepare('DELETE FROM usuarios WHERE id=?').run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json({ mensaje: 'Usuario eliminado' })
})

/**
 * @swagger
 * /administradores:
 *   get:
 *     summary: Lista todos los administradores
 *     responses:
 *       200:
 *         description: Array de administradores
 */
app.get('/administradores', (req, res) => {
    res.json(db.prepare('SELECT * FROM administradores').all())
})

/**
 * @swagger
 * /administradores:
 *   post:
 *     summary: Crea un nuevo administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario: { type: string }
 *               contrasena: { type: string }
 *     responses:
 *       201:
 *         description: Administrador creado
 */
app.post('/administradores', (req, res) => {
    const { usuario, contrasena } = req.body
    const r = db
        .prepare(
            'INSERT INTO administradores (usuario, contrasena) VALUES (?, ?)'
        )
        .run(usuario, contrasena)
    res.status(201).json({ id: r.lastInsertRowid, usuario, contrasena })
})

/**
 * @swagger
 * /administradores/{id}:
 *   put:
 *     summary: Modifica un administrador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario: { type: string }
 *               contrasena: { type: string }
 *     responses:
 *       200:
 *         description: Administrador actualizado
 *       404:
 *         description: No encontrado
 */
app.put('/administradores/:id', (req, res) => {
    const { usuario, contrasena } = req.body
    const i = db
        .prepare(
            'UPDATE administradores SET usuario=?, contrasena=? WHERE id=?'
        )
        .run(usuario, contrasena, req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Administrador no encontrado' })
    res.json({ mensaje: 'Administrador actualizado' })
})

/**
 * @swagger
 * /administradores/{id}:
 *   delete:
 *     summary: Elimina un administrador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Administrador eliminado
 *       404:
 *         description: No encontrado
 */
app.delete('/administradores/:id', (req, res) => {
    const i = db
        .prepare('DELETE FROM administradores WHERE id=?')
        .run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Administrador no encontrado' })
    res.json({ mensaje: 'Administrador eliminado' })
})

/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Lista todas las salas
 *     responses:
 *       200:
 *         description: Array de salas
 */
app.get('/salas', (req, res) => {
    res.json(db.prepare('SELECT * FROM salas').all())
})

/**
 * @swagger
 * /salas:
 *   post:
 *     summary: Crea una nueva sala
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               ubicacion: { type: string }
 *               capacidad: { type: integer }
 *               estado: { type: string }
 *               administradorId: { type: integer }
 *     responses:
 *       201:
 *         description: Sala creada
 */
app.post('/salas', (req, res) => {
    const { nombre, ubicacion, capacidad, estado, administradorId } = req.body
    const r = db
        .prepare(
            'INSERT INTO salas (nombre, ubicacion, capacidad, estado, administradorId) VALUES (?, ?, ?, ?, ?)'
        )
        .run(nombre, ubicacion, capacidad, estado, administradorId ?? null)
    res.status(201).json({
        id: r.lastInsertRowid,
        nombre,
        ubicacion,
        capacidad,
        estado,
        administradorId: administradorId ?? null
    })
})

/**
 * @swagger
 * /salas/{id}:
 *   put:
 *     summary: Modifica una sala
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               ubicacion: { type: string }
 *               capacidad: { type: integer }
 *               estado: { type: string }
 *               administradorId: { type: integer }
 *     responses:
 *       200:
 *         description: Sala actualizada
 *       404:
 *         description: No encontrado
 */
app.put('/salas/:id', (req, res) => {
    const { nombre, ubicacion, capacidad, estado, administradorId } = req.body
    const i = db
        .prepare(
            'UPDATE salas SET nombre=?, ubicacion=?, capacidad=?, estado=?, administradorId=? WHERE id=?'
        )
        .run(
            nombre,
            ubicacion,
            capacidad,
            estado,
            administradorId ?? null,
            req.params.id
        )
    if (i.changes === 0)
        return res.status(404).json({ error: 'Sala no encontrada' })
    res.json({ mensaje: 'Sala actualizada' })
})

/**
 * @swagger
 * /salas/{id}:
 *   delete:
 *     summary: Elimina una sala
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Sala eliminada
 *       404:
 *         description: No encontrado
 */
app.delete('/salas/:id', (req, res) => {
    const i = db.prepare('DELETE FROM salas WHERE id=?').run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Sala no encontrada' })
    res.json({ mensaje: 'Sala eliminada' })
})

/**
 * @swagger
 * /equipamientos:
 *   get:
 *     summary: Lista todo el equipamiento
 *     responses:
 *       200:
 *         description: Array de equipamientos
 */
app.get('/equipamientos', (req, res) => {
    res.json(db.prepare('SELECT * FROM equipamientos').all())
})

/**
 * @swagger
 * /equipamientos:
 *   post:
 *     summary: Crea un nuevo equipamiento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               salaId: { type: integer }
 *     responses:
 *       201:
 *         description: Equipamiento creado
 */
app.post('/equipamientos', (req, res) => {
    const { nombre, salaId } = req.body
    const r = db
        .prepare('INSERT INTO equipamientos (nombre, salaId) VALUES (?, ?)')
        .run(nombre, salaId)
    res.status(201).json({ id: r.lastInsertRowid, nombre, salaId })
})

/**
 * @swagger
 * /equipamientos/{id}:
 *   put:
 *     summary: Modifica un equipamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre: { type: string }
 *               salaId: { type: integer }
 *     responses:
 *       200:
 *         description: Equipamiento actualizado
 *       404:
 *         description: No encontrado
 */
app.put('/equipamientos/:id', (req, res) => {
    const { nombre, salaId } = req.body
    const i = db
        .prepare('UPDATE equipamientos SET nombre=?, salaId=? WHERE id=?')
        .run(nombre, salaId, req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Equipamiento no encontrado' })
    res.json({ mensaje: 'Equipamiento actualizado' })
})

/**
 * @swagger
 * /equipamientos/{id}:
 *   delete:
 *     summary: Elimina un equipamiento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Equipamiento eliminado
 *       404:
 *         description: No encontrado
 */
app.delete('/equipamientos/:id', (req, res) => {
    const i = db
        .prepare('DELETE FROM equipamientos WHERE id=?')
        .run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Equipamiento no encontrado' })
    res.json({ mensaje: 'Equipamiento eliminado' })
})

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Lista todas las reservas
 *     responses:
 *       200:
 *         description: Array de reservas
 */
app.get('/reservas', (req, res) => {
    res.json(db.prepare('SELECT * FROM reservas').all())
})

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crea una nueva reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha: { type: string }
 *               horaInicio: { type: string }
 *               horaFin: { type: string }
 *               estado: { type: string }
 *               cantidadPersonas: { type: integer }
 *               usuarioId: { type: integer }
 *               salaId: { type: integer }
 *     responses:
 *       201:
 *         description: Reserva creada
 */
app.post('/reservas', (req, res) => {
    const {
        fecha,
        horaInicio,
        horaFin,
        estado,
        cantidadPersonas,
        usuarioId,
        salaId
    } = req.body
    const r = db
        .prepare(
            'INSERT INTO reservas (fecha, horaInicio, horaFin, estado, cantidadPersonas, usuarioId, salaId) VALUES (?, ?, ?, ?, ?, ?, ?)'
        )
        .run(
            fecha,
            horaInicio,
            horaFin,
            estado,
            cantidadPersonas,
            usuarioId,
            salaId
        )
    res.status(201).json({
        id: r.lastInsertRowid,
        fecha,
        horaInicio,
        horaFin,
        estado,
        cantidadPersonas,
        usuarioId,
        salaId
    })
})

/**
 * @swagger
 * /reservas/{id}:
 *   put:
 *     summary: Modifica una reserva
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha: { type: string }
 *               horaInicio: { type: string }
 *               horaFin: { type: string }
 *               estado: { type: string }
 *               cantidadPersonas: { type: integer }
 *               usuarioId: { type: integer }
 *               salaId: { type: integer }
 *     responses:
 *       200:
 *         description: Reserva actualizada
 *       404:
 *         description: No encontrado
 */
app.put('/reservas/:id', (req, res) => {
    const {
        fecha,
        horaInicio,
        horaFin,
        estado,
        cantidadPersonas,
        usuarioId,
        salaId
    } = req.body
    const i = db
        .prepare(
            'UPDATE reservas SET fecha=?, horaInicio=?, horaFin=?, estado=?, cantidadPersonas=?, usuarioId=?, salaId=? WHERE id=?'
        )
        .run(
            fecha,
            horaInicio,
            horaFin,
            estado,
            cantidadPersonas,
            usuarioId,
            salaId,
            req.params.id
        )
    if (i.changes === 0)
        return res.status(404).json({ error: 'Reserva no encontrada' })
    res.json({ mensaje: 'Reserva actualizada' })
})

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Elimina una reserva
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reserva eliminada
 *       404:
 *         description: No encontrado
 */
app.delete('/reservas/:id', (req, res) => {
    const i = db.prepare('DELETE FROM reservas WHERE id=?').run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Reserva no encontrada' })
    res.json({ mensaje: 'Reserva eliminada' })
})

/**
 * @swagger
 * /reglas-sistema:
 *   get:
 *     summary: Lista todas las reglas del sistema
 *     responses:
 *       200:
 *         description: Array de reglas
 */
app.get('/reglas-sistema', (req, res) => {
    res.json(db.prepare('SELECT * FROM reglas_sistema').all())
})

/**
 * @swagger
 * /reglas-sistema:
 *   post:
 *     summary: Crea una nueva regla del sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxReservasPorUsuario: { type: integer }
 *               tiempoMaximoReserva: { type: integer }
 *               horaInicioPermitida: { type: string }
 *               horaFinPermitida: { type: string }
 *               administradorId: { type: integer }
 *     responses:
 *       201:
 *         description: Regla creada
 */
app.post('/reglas-sistema', (req, res) => {
    const {
        maxReservasPorUsuario,
        tiempoMaximoReserva,
        horaInicioPermitida,
        horaFinPermitida,
        administradorId
    } = req.body
    const r = db
        .prepare(
            'INSERT INTO reglas_sistema (maxReservasPorUsuario, tiempoMaximoReserva, horaInicioPermitida, horaFinPermitida, administradorId) VALUES (?, ?, ?, ?, ?)'
        )
        .run(
            maxReservasPorUsuario,
            tiempoMaximoReserva,
            horaInicioPermitida,
            horaFinPermitida,
            administradorId ?? null
        )
    res.status(201).json({
        id: r.lastInsertRowid,
        maxReservasPorUsuario,
        tiempoMaximoReserva,
        horaInicioPermitida,
        horaFinPermitida,
        administradorId: administradorId ?? null
    })
})

/**
 * @swagger
 * /reglas-sistema/{id}:
 *   put:
 *     summary: Modifica una regla del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxReservasPorUsuario: { type: integer }
 *               tiempoMaximoReserva: { type: integer }
 *               horaInicioPermitida: { type: string }
 *               horaFinPermitida: { type: string }
 *               administradorId: { type: integer }
 *     responses:
 *       200:
 *         description: Regla actualizada
 *       404:
 *         description: No encontrado
 */
app.put('/reglas-sistema/:id', (req, res) => {
    const {
        maxReservasPorUsuario,
        tiempoMaximoReserva,
        horaInicioPermitida,
        horaFinPermitida,
        administradorId
    } = req.body
    const i = db
        .prepare(
            'UPDATE reglas_sistema SET maxReservasPorUsuario=?, tiempoMaximoReserva=?, horaInicioPermitida=?, horaFinPermitida=?, administradorId=? WHERE id=?'
        )
        .run(
            maxReservasPorUsuario,
            tiempoMaximoReserva,
            horaInicioPermitida,
            horaFinPermitida,
            administradorId ?? null,
            req.params.id
        )
    if (i.changes === 0)
        return res.status(404).json({ error: 'Regla no encontrada' })
    res.json({ mensaje: 'Regla actualizada' })
})

/**
 * @swagger
 * /reglas-sistema/{id}:
 *   delete:
 *     summary: Elimina una regla del sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Regla eliminada
 *       404:
 *         description: No encontrado
 */
app.delete('/reglas-sistema/:id', (req, res) => {
    const i = db
        .prepare('DELETE FROM reglas_sistema WHERE id=?')
        .run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Regla no encontrada' })
    res.json({ mensaje: 'Regla eliminada' })
})

/**
 * @swagger
 * /estadisticas-uso:
 *   get:
 *     summary: Lista todas las estadisticas de uso
 *     responses:
 *       200:
 *         description: Array de estadisticas
 */
app.get('/estadisticas-uso', (req, res) => {
    res.json(db.prepare('SELECT * FROM estadisticas_uso').all())
})

/**
 * @swagger
 * /estadisticas-uso:
 *   post:
 *     summary: Crea una nueva estadistica de uso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               porcentajeUso: { type: number }
 *               cantidadReservas: { type: integer }
 *               salaId: { type: integer }
 *     responses:
 *       201:
 *         description: Estadistica creada
 */
app.post('/estadisticas-uso', (req, res) => {
    const { porcentajeUso, cantidadReservas, salaId } = req.body
    const r = db
        .prepare(
            'INSERT INTO estadisticas_uso (porcentajeUso, cantidadReservas, salaId) VALUES (?, ?, ?)'
        )
        .run(porcentajeUso, cantidadReservas, salaId)
    res.status(201).json({
        id: r.lastInsertRowid,
        porcentajeUso,
        cantidadReservas,
        salaId
    })
})

/**
 * @swagger
 * /estadisticas-uso/{id}:
 *   put:
 *     summary: Modifica una estadistica de uso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               porcentajeUso: { type: number }
 *               cantidadReservas: { type: integer }
 *               salaId: { type: integer }
 *     responses:
 *       200:
 *         description: Estadistica actualizada
 *       404:
 *         description: No encontrado
 */
app.put('/estadisticas-uso/:id', (req, res) => {
    const { porcentajeUso, cantidadReservas, salaId } = req.body
    const i = db
        .prepare(
            'UPDATE estadisticas_uso SET porcentajeUso=?, cantidadReservas=?, salaId=? WHERE id=?'
        )
        .run(porcentajeUso, cantidadReservas, salaId, req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Estadistica no encontrada' })
    res.json({ mensaje: 'Estadistica actualizada' })
})

/**
 * @swagger
 * /estadisticas-uso/{id}:
 *   delete:
 *     summary: Elimina una estadistica de uso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Estadistica eliminada
 *       404:
 *         description: No encontrado
 */
app.delete('/estadisticas-uso/:id', (req, res) => {
    const i = db
        .prepare('DELETE FROM estadisticas_uso WHERE id=?')
        .run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Estadistica no encontrada' })
    res.json({ mensaje: 'Estadistica eliminada' })
})

app.listen(3000, () => {
    console.log('API en http://localhost:3000')
    console.log('Documentación en http://localhost:3000/docs')
})
