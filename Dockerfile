# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package files and install all dependencies (including dev dependencies)
COPY package*.json ./
RUN npm install

# Copy the rest of your source code and build the app
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copy only the production package files and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the built output from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
