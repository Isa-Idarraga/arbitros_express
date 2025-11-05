FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar el resto de archivos
COPY . .

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto (pueden ser sobrescritas)
ENV PORT=3000
ENV NODE_ENV=production

# Comando para iniciar la aplicación
CMD ["node", "server.js"]