import { Router } from 'express'
import db from '../db.js'

const router = Router()

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos los usuarios
 *     responses:
 *       200:
 *         description: Array de usuarios
 */
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const i = db.prepare('DELETE FROM usuarios WHERE id=?').run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json({ mensaje: 'Usuario eliminado' })
})

export default router
