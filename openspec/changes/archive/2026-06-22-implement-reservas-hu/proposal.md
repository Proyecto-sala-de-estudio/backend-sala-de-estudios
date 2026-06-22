## Why

El proyecto requiere la implementación de una historia de usuario completa (HU03: Reservar sala) que conecte dos entidades de la base de datos (Salas y Reservas) tanto en frontend como en backend para cumplir con los requisitos de la Sumativa 2. Actualmente el sistema carece de una interfaz interactiva para realizar y cancelar reservas, y el backend no valida si una sala ya está reservada en la misma fecha y hora.

## What Changes

- **Backend:** Modificar el endpoint de creación de reservas (`POST /api/reservas`) para verificar si la sala ya cuenta con una reserva activa para la misma fecha y hora, retornando un error `400` en caso de conflicto.
- **Frontend:** Diseñar e implementar una interfaz de usuario interactiva y responsiva en Next.js (`frontend/app/page.js`) que permita listar las salas disponibles, completar un formulario para reservar una sala en una fecha/hora específicas y listar las reservas activas con la opción de cancelarlas directamente.

## Capabilities

### New Capabilities
- `reservas-hu`: Definición de los requisitos funcionales de creación, validación de solapamiento y cancelación de reservas de salas de estudio en el frontend y backend.

### Modified Capabilities
- Ninguna.

## Impact

- **API del Backend:** Se agrega validación de lógica de negocio en `POST /api/reservas`.
- **Frontend:** Reemplazo de la página de inicio estática (`frontend/app/page.js`) por un panel interactivo de reservas.
- **Base de Datos:** Se consultará la tabla `reservas` antes de procesar una nueva reserva para asegurar la exclusividad de horario.
