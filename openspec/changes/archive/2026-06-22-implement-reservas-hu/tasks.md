## 1. Backend

- [x] 1.1 Implementar la consulta de validación de solapamientos en `backend/src/routes/reservas.js` antes de la inserción de una nueva reserva.
- [x] 1.2 Retornar código de estado `400` y el mensaje de error correspondiente cuando exista un conflicto de horario para la sala en `backend/src/routes/reservas.js`.

## 2. Frontend

- [x] 2.1 Diseñar e implementar el catálogo de salas disponibles en `frontend/app/page.js` con soporte para seleccionar una sala con un solo clic.
- [x] 2.2 Implementar el formulario interactivo de reservas en `frontend/app/page.js` conectándolo con la API del backend (`POST /api/reservas`).
- [x] 2.3 Implementar el listado de reservas activas y el botón para cancelar reservas (`DELETE /api/reservas/:id`) con refresco de datos en tiempo real.
- [x] 2.4 Integrar notificaciones y mensajes de error estilizados para alertar al usuario sobre campos incompletos o conflictos de horario.
