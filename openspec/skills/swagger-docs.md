# OpenSpec Skill: swagger-docs

Esta skill automatiza la validación, generación y exposición de la documentación interactiva OpenAPI 3.0 (Swagger UI) para todas las rutas de la API en `GET /docs`.

---

## Requisitos de la Skill
1. **Dependencias:** Asegurar que `swagger-ui-express` y `swagger-jsdoc` estén instalados en `package.json`.
2. **Exposición del Endpoint:** Registrar `/docs` en la aplicación principal Express (`src/index.js`) sirviendo la especificación OpenAPI autogenerada.
3. **Escaneo de Rutas:** Configurar `swagger-jsdoc` para escanear de forma dinámica las anotaciones JSDoc de todos los archivos en `src/routes/*.js`.
4. **Validación de Estructura:** Comprobar que los endpoints clave (`/api/salas`, `/api/reservas`, `/api/cursos`) posean anotaciones JSDoc `@swagger` válidas con sus respectivos esquemas, parámetros y códigos de respuesta.

---

## Instrucciones de Ejecución (/openspec:skill swagger-docs)

### Paso 1: Validar Configuración en `src/index.js`
Verificar que la inicialización de `swagger-jsdoc` y la ruta `/docs` estén presentes de la siguiente forma:
```javascript
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Sala de Estudios',
            version: '1.0.0',
            description: 'API para gestionar salas de estudios'
        },
        servers: [
            { url: 'http://localhost:3000' }
        ]
    },
    apis: ['./src/routes/*.js']
})
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
```

### Paso 2: Escanear y Validar Comentarios `@swagger` en Rutas
Comprobar los siguientes archivos para confirmar que sus comentarios JSDoc se ajusten a OpenAPI 3.0:
* **[salas.js](file:///c:/Users/vicen/OneDrive/Escritorio/nombre/backend-sala-de-estudios/src/routes/salas.js):** Validar documentación de endpoints `/api/salas`.
* **[reservas.js](file:///c:/Users/vicen/OneDrive/Escritorio/nombre/backend-sala-de-estudios/src/routes/reservas.js):** Validar documentación de endpoints `/api/reservas`.
* **[cursos.js](file:///c:/Users/vicen/OneDrive/Escritorio/nombre/backend-sala-de-estudios/src/routes/cursos.js):** Validar documentación de endpoints `/api/cursos`.

### Paso 3: Lanzar y Verificar el Servidor
Lanzar la API y validar el acceso web interactivo:
1. Ejecutar el comando para iniciar el servidor.
2. Navegar a `http://localhost:3000/docs`.
3. Validar que aparezca la interfaz de Swagger UI con las secciones correspondientes y que los endpoints puedan probarse de forma interactiva.
