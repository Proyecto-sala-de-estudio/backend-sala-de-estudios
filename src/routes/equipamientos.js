import { Router } from 'express'
import db from '../db.js'

const router = Router()

/**
 * @swagger
 * /equipamientos:
 *   get:
 *     summary: Lista todo el equipamiento
 *     responses:
 *       200:
 *         description: Array de equipamientos
 */
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const i = db
        .prepare('DELETE FROM equipamientos WHERE id=?')
        .run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Equipamiento no encontrado' })
    res.json({ mensaje: 'Equipamiento eliminado' })
})

export default router
