# OpenSpec Skill: test-cases

Esta skill analiza la entidad principal de la API (en este caso, **Cursos**) y genera una matriz de casos de prueba manuales aplicando técnicas de diseño de pruebas: Clases de Equivalencia (CE) y Análisis de Valores Límite (VL).

---

## Requisitos de la Skill
1. **Destino de Salida:** Generar el archivo `docs/test-cases.md`.
2. **Métodos Cubiertos:** Crear casos para `POST /api/cursos` y `PUT /api/cursos` (si estuviera disponible) o los endpoints clave de mutación de datos.
3. **Técnicas Requeridas:**
   * **Clases de Equivalencia (CE):**
     * Al menos 1 clase válida para cada campo.
     * Al menos 2 clases inválidas para cada campo relevante (nombre, instructor, créditos).
   * **Análisis de Valores Límite (VL):**
     * Límite inferior y superior de créditos (mínimo de créditos = 1, valores menores = 0, -1, vacíos).
4. **Columnas de la Matriz:** ID, Técnica, Descripción, Input JSON, Código HTTP Esperado, y columna vacía "Resultado Real".

---

## Instrucciones de Ejecución (/openspec:skill test-cases)

### Paso 1: Generar la estructura del archivo `docs/test-cases.md`
Crear el archivo en la ruta [docs/test-cases.md](file:///c:/Users/vicen/OneDrive/Escritorio/nombre/backend-sala-de-estudios/docs/test-cases.md) con las tablas detalladas a continuación para validar el comportamiento del endpoint de Cursos.

### Paso 2: Ejecutar Casos de Prueba Manuales
El evaluador debe utilizar Thunder Client, curl o la interfaz Swagger para enviar las peticiones HTTP y completar la columna "Resultado Real".
