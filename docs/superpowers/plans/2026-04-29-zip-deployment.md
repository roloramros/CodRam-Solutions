# Plan de Implementación: Despliegue ZIP & SSH

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preparar y automatizar la creación de un paquete de despliegue comprimido para el proyecto CodRam.

**Architecture:** Generación de build estático del frontend, empaquetado selectivo de archivos fuente del backend (excluyendo node_modules) y automatización de pasos de post-despliegue en el VPS.

**Tech Stack:** Node.js, Vite, Express, PM2, ZIP/SSH.

---

### Tarea 1: Preparación del Frontend y Estructura de Raíz

**Files:**
- Modify: `frontend/package.json`
- Modify: `package.json`

- [ ] **Paso 1: Verificar scripts de build en frontend**

Asegurarse de que el script `build` en `frontend/package.json` genere la carpeta `dist`.
Run: `npm run build --prefix frontend`
Expected: Carpeta `frontend/dist` creada con `index.html` y activos.

- [ ] **Paso 2: Agregar script de empaquetado en la raíz**

Añadir un script que facilite crear el ZIP sin archivos innecesarios.
Modify: `package.json`

```json
{
  "scripts": {
    "package": "powershell -Command \"Compress-Archive -Path backend, frontend/dist, ecosystem.config.js, package.json -DestinationPath deploy.zip -Force\""
  }
}
```

- [ ] **Paso 3: Ejecutar empaquetado**

Run: `npm run package`
Expected: Archivo `deploy.zip` generado en la raíz (peso < 10MB).

### Tarea 2: Guía de Acciones en el VPS (Manual/SSH)

**Files:**
- Create: `DEPLOY_GUIDE.md` (Temporal para referencia del usuario)

- [ ] **Paso 1: Crear guía de comandos para el servidor**

Create: `DEPLOY_GUIDE.md` con el siguiente contenido:

```markdown
# Comandos para ejecutar en tu VPS (vía SSH)

1. Ir a la carpeta del proyecto:
   `cd /ruta/a/tu/proyecto`

2. Descomprimir (sobrescribiendo anteriores):
   `unzip -o deploy.zip`

3. Instalar dependencias del backend:
   `cd backend && npm install --production`

4. Volver a la raíz y reiniciar procesos:
   `cd .. && pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js`
```

### Tarea 3: Verificación y Commit

- [ ] **Paso 1: Verificar contenido del ZIP**

Abrir el ZIP manualmente o por comando para asegurar que no tiene `node_modules`.

- [ ] **Paso 2: Commit de cambios de configuración**

```bash
git add package.json
git commit -m "chore: add deployment packaging script"
```
