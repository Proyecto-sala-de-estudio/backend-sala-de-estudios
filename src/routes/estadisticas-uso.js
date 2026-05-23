import { Router } from 'express'
import db from '../db.js'

const router = Router()

/**
 * @swagger
 * /estadisticas-uso:
 *   get:
 *     summary: Lista todas las estadisticas de uso
 *     responses:
 *       200:
 *         description: Array de estadisticas
 */
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const i = db
        .prepare('DELETE FROM estadisticas_uso WHERE id=?')
        .run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Estadistica no encontrada' })
    res.json({ mensaje: 'Estadistica eliminada' })
})

export default router
