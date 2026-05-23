import { Router } from 'express'
import db from '../db.js'

const router = Router()

/**
 * @swagger
 * /administradores:
 *   get:
 *     summary: Lista todos los administradores
 *     responses:
 *       200:
 *         description: Array de administradores
 */
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const i = db
        .prepare('DELETE FROM administradores WHERE id=?')
        .run(req.params.id)
    if (i.changes === 0)
        return res.status(404).json({ error: 'Administrador no encontrado' })
    res.json({ mensaje: 'Administrador eliminado' })
})

export default router
