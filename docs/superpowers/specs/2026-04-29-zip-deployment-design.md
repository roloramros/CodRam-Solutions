# Especificación de Despliegue: Enfoque ZIP & SSH

Este documento detalla el procedimiento para desplegar el proyecto **CodRam** en un VPS utilizando un método de compresión ZIP para optimizar el tiempo de transferencia.

## 1. Alcance
Desplegar tanto el frontend (estático) como el backend (Express) en el servidor de destino, minimizando la cantidad de archivos transferidos individualmente.

## 2. Componentes del Paquete
El archivo comprimido (`deploy.zip`) debe contener:
- `backend/`: Código fuente del servidor (excluyendo `node_modules` y `.env`).
- `frontend/dist/`: Archivos compilados del frontend (generados con `npm run build`).
- `ecosystem.config.js`: Configuración para el gestor de procesos PM2.
- `package.json` y `package-lock.json` de la raíz.

## 3. Flujo de Trabajo

### Paso A: Preparación Local
1. Limpiar carpetas de compilación previas.
2. Ejecutar `npm run build` en la carpeta `frontend/`.
3. Comprimir los archivos mencionados en el punto 2.

### Paso B: Transferencia
1. Subir `deploy.zip` al directorio raíz de la aplicación en el VPS vía SFTP.

### Paso C: Despliegue en Servidor (vía SSH)
1. Descomprimir el archivo: `unzip -o deploy.zip`.
2. Instalar dependencias del backend: `cd backend && npm install --production`.
3. (Opcional) Instalar dependencias de la raíz si es necesario.
4. Reiniciar el servicio: `pm2 reload ecosystem.config.js` o `pm2 start ecosystem.config.js`.

## 4. Consideraciones de Seguridad
- No se debe incluir el archivo `backend/.env` en el ZIP. Este archivo debe configurarse manualmente en el servidor una sola vez.
- Se recomienda usar `npm install --production` para evitar instalar dependencias de desarrollo en el VPS.

## 5. Criterios de Éxito
- El frontend es accesible a través del servidor web (Nginx/Apache).
- El backend responde a las peticiones API.
- El tiempo de subida es inferior a 1 minuto (dependiendo de la conexión).
