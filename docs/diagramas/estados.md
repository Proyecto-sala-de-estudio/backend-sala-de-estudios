```mermaid
stateDiagram-v2
    [*] --> Pendiente : Crear reserva
    Pendiente --> Confirmada : Validar disponibilidad
    Confirmada --> EnCurso : Iniciar uso de sala
    EnCurso --> Finalizada : Terminar tiempo
    Confirmada --> Cancelada : Usuario cancela
    Pendiente --> Cancelada : Usuario cancela
    
    Finalizada --> [*]
    Cancelada --> [*]
```
