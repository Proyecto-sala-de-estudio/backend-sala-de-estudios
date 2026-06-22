# Casos de Prueba: Gestión de Reservas

Este documento contiene la matriz de pruebas manuales para la creación de reservas (`POST /api/reservas`).

---

## Clases de Equivalencia (Equivalence Partitioning)

| ID  | Técnica | Campo Evaluado | Descripción | Input JSON | HTTP Esp. | Resultado Real |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| P01 | CE | Todo | Todos los campos válidos | `{"salaId": 1, "estudiante": "Juan Pérez", "fecha": "2026-10-15", "hora": "10:00"}` | 201 | |
| P02 | CE | estudiante | Nombre de estudiante vacío | `{"salaId": 1, "estudiante": "", "fecha": "2026-10-15", "hora": "10:00"}` | 400 | |
| P03 | CE | estudiante | Nombre ausente / nulo | `{"salaId": 1, "fecha": "2026-10-15", "hora": "10:00"}` | 400 | |
| P04 | CE | estudiante | Nombre no string (número) | `{"salaId": 1, "estudiante": 12345, "fecha": "2026-10-15", "hora": "10:00"}` | 400 | |
| P05 | CE | salaId | SalaId vacío / nulo / ausente | `{"estudiante": "Juan Pérez", "fecha": "2026-10-15", "hora": "10:00"}` | 400 | |
| P06 | CE | salaId | SalaId como string | `{"salaId": "uno", "estudiante": "Juan Pérez", "fecha": "2026-10-15", "hora": "10:00"}` | 400 | |
| P07 | CE | fecha | Fecha vacía o ausente | `{"salaId": 1, "estudiante": "Juan Pérez", "hora": "10:00"}` | 400 | |
| P08 | CE | fecha | Fecha formato incorrecto (ej. DD/MM/YYYY) | `{"salaId": 1, "estudiante": "Juan", "fecha": "15/10/2026", "hora": "10:00"}` | 400 | |
| P09 | CE | hora | Hora vacía o ausente | `{"salaId": 1, "estudiante": "Juan Pérez", "fecha": "2026-10-15"}` | 400 | |
| P10 | CE | hora | Hora formato incorrecto | `{"salaId": 1, "estudiante": "Juan", "fecha": "2026-10-15", "hora": "25:00"}` | 400 | |

---

## Análisis de Valores Límite (Boundary Value Analysis) - Campo `salaId`

| ID  | Técnica | Descripción | Input JSON | HTTP Esp. | Resultado Real |
| :--- | :--- | :--- | :--- | :--- | :--- |
| L01 | VL | salaId = 1 (mínimo entero positivo válido) | `{"salaId": 1, "estudiante": "Juan", "fecha": "2026-10-15", "hora": "10:00"}` | 201 | |
| L02 | VL | salaId = 0 (justo debajo del mínimo válido) | `{"salaId": 0, "estudiante": "Juan", "fecha": "2026-10-15", "hora": "10:00"}` | 400 | |
| L03 | VL | salaId = -1 (bajo el mínimo válido) | `{"salaId": -1, "estudiante": "Juan", "fecha": "2026-10-15", "hora": "10:00"}` | 400 | |
| L04 | VL | salaId = 1.5 (decimal, no entero) | `{"salaId": 1.5, "estudiante": "Juan", "fecha": "2026-10-15", "hora": "10:00"}` | 400 | |
