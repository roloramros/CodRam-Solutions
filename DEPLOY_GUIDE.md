Ejecutar en la terminal en la carpeta del proyecto
	npm run preparar-subida



# Comandos para ejecutar en tu VPS (vía SSH)

cd /var/www/codram
unzip -o deploy.zip
cd backend && npm install --production
cd .. && pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js

