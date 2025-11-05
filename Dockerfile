# Imagen base
FROM node:18-alpine

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto (asegúrate que tu app usa este puerto)
EXPOSE 3000

# Comando para correr la app
CMD ["node", "app.js"]
