# Casos de Prueba: Gestión de Cursos

Este documento contiene la matriz de pruebas manuales para la creación de cursos (`POST /api/cursos`).

---

## Clases de Equivalencia (Equivalence Partitioning)

| ID  | Técnica | Campo Evaluado | Descripción | Input JSON | HTTP Esp. | Resultado Real |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| P01 | CE | Todo | Todos los campos válidos | `{"nombre": "Cálculo Integral", "instructor": "Dr. Ruiz", "creditos": 4}` | 201 | |
| P02 | CE | nombre | Nombre vacío | `{"nombre": "", "instructor": "Dr. Ruiz", "creditos": 4}` | 400 | |
| P03 | CE | nombre | Nombre ausente / nulo | `{"instructor": "Dr. Ruiz", "creditos": 4}` | 400 | |
| P04 | CE | nombre | Nombre no string (número) | `{"nombre": 12345, "instructor": "Dr. Ruiz", "creditos": 4}` | 400 | |
| P05 | CE | instructor | Instructor vacío | `{"nombre": "Cálculo Integral", "instructor": "", "creditos": 4}` | 400 | |
| P06 | CE | instructor | Instructor ausente / nulo | `{"nombre": "Cálculo Integral", "creditos": 4}` | 400 | |
| P07 | CE | instructor | Instructor no string | `{"nombre": "Cálculo Integral", "instructor": true, "creditos": 4}` | 400 | |
| P08 | CE | creditos | Créditos negativos | `{"nombre": "Cálculo Integral", "instructor": "Dr. Ruiz", "creditos": -5}` | 400 | |
| P09 | CE | creditos | Créditos como texto | `{"nombre": "Cálculo Integral", "instructor": "Dr. Ruiz", "creditos": "cuatro"}` | 400 | |
| P10 | CE | creditos | Créditos nulos / ausentes | `{"nombre": "Cálculo Integral", "instructor": "Dr. Ruiz"}` | 400 | |

---

## Análisis de Valores Límite (Boundary Value Analysis) - Campo `creditos`

| ID  | Técnica | Descripción | Input JSON | HTTP Esp. | Resultado Real |
| :--- | :--- | :--- | :--- | :--- | :--- |
| L01 | VL | creditos = 1 (mínimo entero positivo válido) | `{"nombre": "Cálculo Integral", "instructor": "Dr. Ruiz", "creditos": 1}` | 201 | |
| L02 | VL | creditos = 0 (justo debajo del mínimo válido) | `{"nombre": "Cálculo Integral", "instructor": "Dr. Ruiz", "creditos": 0}` | 400 | |
| L03 | VL | creditos = -1 (bajo el mínimo válido) | `{"nombre": "Cálculo Integral", "instructor": "Dr. Ruiz", "creditos": -1}` | 400 | |
| L04 | VL | creditos = 4.5 (decimal, no entero) | `{"nombre": "Cálculo Integral", "instructor": "Dr. Ruiz", "creditos": 4.5}` | 400 | |
