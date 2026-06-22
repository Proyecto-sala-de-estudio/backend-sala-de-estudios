# reservas-hu Specification

## Purpose
Esta especificación define los requisitos y criterios de aceptación funcionales y técnicos para la gestión interactiva de reservas de salas de estudio en el frontend y la validación de exclusividad de horarios en el backend.
## Requirements
### Requirement: Validación de solapamiento en reservas
El sistema MUST validar de manera estricta que no exista un conflicto de horario para la misma sala de estudio en el endpoint de creación de reservas.

#### Scenario: Reserva de horario disponible
- **WHEN** un estudiante envía una solicitud de reserva con `salaId`, `fecha` y `hora` que no presentan conflictos en la base de datos
- **THEN** el sistema MUST registrar la reserva y retornar un código de estado `201`.

#### Scenario: Reserva de horario ocupado
- **WHEN** un estudiante envía una solicitud de reserva para una sala, fecha y hora que ya cuentan con un registro activo
- **THEN** el sistema MUST rechazar la transacción, no almacenar datos y retornar un código de estado `400` con un mensaje explicativo de conflicto.

### Requirement: Cancelación de reservas
El sistema MUST permitir la cancelación o eliminación de un registro de reserva existente en el backend a través de su identificador único.

#### Scenario: Cancelación exitosa
- **WHEN** se envía una solicitud `DELETE` con el id de una reserva válida
- **THEN** el sistema MUST eliminar el registro de la base de datos, liberar el espacio/horario y retornar un mensaje de éxito.

### Requirement: Interfaz interactiva de gestión de reservas
La aplicación web frontend MUST ofrecer una interfaz gráfica amigable que liste las salas, incluya un formulario de reserva dinámico y muestre los registros de reserva con opción de cancelación en tiempo real.

#### Scenario: Creación de reserva desde el formulario
- **WHEN** el usuario completa el nombre del estudiante, selecciona una sala, fecha y hora libre, y presiona el botón de confirmación
- **THEN** la aplicación envía los datos a la API y MUST refrescar el listado de reservas activas inmediatamente.

