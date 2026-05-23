import { Router } from 'express'
import db from '../db.js'

const router = Router()

/**
 * @swagger
 * /reglas-sistema:
 *   get:
 *     summary: Lista todas las reglas del sistema
 *     responses:
 *       200:
 *         description: Array de reglas
 */
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const i = db
        .prepare('DELETE FROM reglas_sistema WHERE id=?')
        .run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Regla no encontrada' })
    res.json({ mensaje: 'Regla eliminada' })
})

export default router
