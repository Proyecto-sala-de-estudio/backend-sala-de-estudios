## 1. Configuración e Instalación

- [ ] 1.1 Ejecutar la instalación de dependencias en `frontend/` mediante el comando sugerido en consola (`npm install tailwindcss @tailwindcss/postcss postcss daisyui`) sin modificar directamente el `package.json`.
- [ ] 1.2 Crear el archivo `frontend/tailwind.config.mjs` y `frontend/postcss.config.mjs` para configurar el compilador de Tailwind y habilitar el plugin DaisyUI.
- [ ] 1.3 Modificar `frontend/app/globals.css` para importar las directivas y utilidades de Tailwind CSS, removiendo las reglas personalizadas heredadas.

## 2. Rediseño de la Interfaz

- [ ] 2.1 Refactorizar el marcado de `frontend/app/page.js` reemplazando los selectores y clases antiguas con clases utilitarias de Tailwind y componentes preestilizados de DaisyUI (botones, formularios, tablas y notificaciones).
- [ ] 2.2 Validar la visualización responsiva del catálogo de salas y del listado de reservas activas tanto en móviles como en computadoras de escritorio.

## 3. Validación

- [ ] 3.1 Ejecutar `npm run build` en la carpeta `frontend/` para comprobar que la compilación de producción del frontend se complete sin errores.
