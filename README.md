# Propital API - Sistema de Visualización de Proyectos Inmobiliarios

Esta es una API RESTful para un sistema de visualización de proyectos inmobiliarios que permite a los usuarios explorar propiedades en un mapa interactivo, buscar y filtrar proyectos, y ver información detallada de cada propiedad.

## Características

- Integración con mapa interactivo
- Marcadores de propiedades con imágenes de vista previa
- Información detallada de propiedades
- Capacidades de búsqueda y filtrado
- Navegación geográfica
- Persistencia de datos con PostgreSQL

## Stack Tecnológico

- NestJS (TypeScript)
- PostgreSQL
- TypeORM
- Docker y Docker Compose
- Swagger para documentación de API
- Jest para pruebas

## Requisitos Previos

- Docker y Docker Compose instalados en tu sistema
- Git

## Configuración del Entorno de Desarrollo

1. Clonar el repositorio:
   ```bash
   git clone <repository-url>
   cd propital-api
   ```

2. Iniciar el entorno de desarrollo:
   ```bash
   docker-compose up --build
   ```

   Esto realizará:
   - Construcción de la aplicación NestJS
   - Inicio de la base de datos PostgreSQL
   - Configuración de todos los ajustes necesarios
   - Inicio de la API en modo desarrollo con recarga automática

3. La API estará disponible en:
   - Estado de la API: http://localhost:3001
   - Verificación de Salud: http://localhost:3001/health
   - Documentación Swagger: http://localhost:3001/api

## Pruebas

Ejecutar el conjunto de pruebas: