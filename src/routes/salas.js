import { Router } from 'express'
import db from '../db.js'

const router = Router()

/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Lista todas las salas
 *     responses:
 *       200:
 *         description: Array de salas
 */
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const i = db.prepare('DELETE FROM salas WHERE id=?').run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Sala no encontrada' })
    res.json({ mensaje: 'Sala eliminada' })
})

export default router
