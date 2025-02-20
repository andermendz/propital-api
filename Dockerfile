# desarrollo
FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

# instalar todas las dependencias (incluyendo devDependencies)
RUN npm install @nestjs/terminus @nestjs/axios && \
    npm install

COPY . .

RUN npm run build

# producción
FROM node:18-alpine As production

WORKDIR /usr/src/app

COPY package*.json ./

# instalar solo dependencias de producción
RUN npm install --only=production @nestjs/terminus @nestjs/axios && \
    npm install --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]