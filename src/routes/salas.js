import { Router } from 'express'
import db from '../../db.js'

const router = Router()

/**
 * @swagger
 * /api/salas:
 *   get:
 *     summary: Lista y filtra las salas de estudio disponibles (HU01 y HU05)
 *     parameters:
 *       - in: query
 *         name: capacidad
 *         schema: { type: integer }
 *         description: Filtra por capacidad mínima
 *       - in: query
 *         name: equipamiento
 *         schema: { type: string }
 *         description: Filtra por equipamiento (ej. Pizarra)
 *       - in: query
 *         name: edificio
 *         schema: { type: string }
 *         description: Filtra por edificio
 *     responses:
 *       200:
 *         description: Array de salas filtradas con su ubicación
 */
router.get('/', (req, res) => {
    // Extraemos los filtros que vienen en la URL
    const { capacidad, equipamiento, edificio } = req.query

    // Empezamos con una consulta base (solo salas disponibles)
    let sql = 'SELECT * FROM salas WHERE estado = "disponible"'
    const params = []

    // HU05 - CA1: Si el usuario envió filtro de capacidad, lo agregamos
    if (capacidad) {
        sql += ' AND capacidad >= ?'
        params.push(Number(capacidad))
    }

    // HU05 - CA1: Si el usuario envió filtro de equipamiento
    if (equipamiento) {
        sql += ' AND equipamiento LIKE ?'
        params.push(`%${equipamiento}%`) // LIKE busca coincidencias parciales
    }

    // HU05 - CA1: Si el usuario envió filtro de ubicación (edificio)
    if (edificio) {
        sql += ' AND edificio = ?'
        params.push(edificio)
    }

    // Ejecutamos la consulta. 
    // HU05 - CA2: Solo retorna las salas que cumplen TODAS las condiciones agregadas
    const salas = db.prepare(sql).all(...params)
    
    res.json(salas)
})
/**
 * @swagger
 * /api/salas/{id}:
 *   get:
 *     summary: Muestra la información detallada de una sala, incluyendo edificio y piso (HU01 - CA2)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Detalle de la sala
 *       404:
 *         description: Sala no encontrada
 */
router.get('/:id', (req, res) => {
    const sala = db
        .prepare('SELECT * FROM salas WHERE id = ?')
        .get(req.params.id)
        
    if (!sala) {
        return res.status(404).json({ error: 'Sala no encontrada' })
    }
    
    res.json(sala)
})

export default router