import { Router } from 'express'
import db from '../db.js'

const router = Router()

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Lista todas las reservas
 *     responses:
 *       200:
 *         description: Array de reservas
 */
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const i = db.prepare('DELETE FROM reservas WHERE id=?').run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Reserva no encontrada' })
    res.json({ mensaje: 'Reserva eliminada' })
})

export default router
