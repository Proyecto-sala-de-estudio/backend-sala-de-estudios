## Context

La aplicación de gestión de salas de estudio cuenta con las tablas `salas` y `reservas` en PostgreSQL y endpoints CRUD básicos, pero carece de validación de conflictos de reserva en el backend y de una interfaz de usuario interactiva para los estudiantes. Se requiere implementar la lógica de control de solapamientos en `POST /api/reservas` y renovar el frontend para permitir listar salas, reservar una sala específica y cancelar reservas activas.

## Goals / Non-Goals

**Goals:**
- Validar solapamientos de horario en `POST /api/reservas` (misma sala, fecha y hora).
- Reemplazar la página de inicio estática (`frontend/app/page.js`) por un panel interactivo y responsivo de gestión de reservas.
- Integrar la visualización de salas, creación de reservas y cancelación de las mismas en el frontend mediante llamadas AJAX (`fetch`).

**Non-Goals:**
- No se creará autenticación ni cuentas de usuario.
- No se modificará el esquema de base de datos relacional existente.

## Decisions

### 1. Validación en el Backend (`backend/src/routes/reservas.js`)
Para evitar reservas duplicadas, realizaremos una consulta previa en el endpoint de creación:
```javascript
const conflictResult = await db.query(
    'SELECT * FROM reservas WHERE "salaId" = $1 AND fecha = $2 AND hora = $3',
    [Number(salaId), fecha, hora]
)
if (conflictResult.rows.length > 0) {
    return res.status(400).json({ error: 'La sala ya cuenta con una reserva activa para la fecha y hora indicadas.' })
}
```
Esta validación garantiza la unicidad a nivel lógico sin necesidad de alterar restricciones físicas (índices compuestos) de la base de datos de manera inmediata.

### 2. Diseño del Panel de Usuario (`frontend/app/page.js`)
El frontend utilizará Next.js con renderizado en el cliente (`use client`) y se dividirá en:
- **Estado General:** Estados reactivos para `salas`, `reservas`, cargando (`loading`), errores, y campos de formulario.
- **Catálogo de Salas:** Listará las salas registradas. Cada tarjeta tendrá un botón "Seleccionar" que autocompleta el campo de sala en el formulario de reserva.
- **Formulario de Reserva:** Permite ingresar el nombre del estudiante, fecha (usando input tipo date) y hora (usando input tipo time).
- **Lista de Reservas Activas:** Mostrará una lista/tabla con los detalles de cada reserva. Cada fila incluirá un botón "Cancelar" que realiza una petición `DELETE /api/reservas/:id`.

## Risks / Trade-offs

- **Riesgo:** Diferencias en zonas horarias o formatos de fecha y hora.
  - **Mitigación:** Se almacenarán los datos en formato texto estándar (`YYYY-MM-DD` y `HH:MM`) provistos directamente por los selectores nativos de HTML5, asegurando consistencia entre cliente y servidor.
- **Riesgo:** Concurrencia (dos usuarios reservando a la vez).
  - **Mitigación:** En caso de reserva simultánea en el mismo milisegundo, la consulta de validación en la API prevendrá la duplicación antes del insert.
