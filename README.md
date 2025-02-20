# Propital API - Sistema de Visualización de Proyectos Inmobiliarios

Esta es una API RESTful para un sistema de visualización de proyectos inmobiliarios que permite a los usuarios explorar propiedades en un mapa interactivo, buscar y filtrar proyectos, y ver información detallada de cada propiedad.

## Características

- CRUD completo de propiedades inmobiliarias
- Búsqueda avanzada con múltiples filtros
- Búsqueda por ubicación geográfica (radio de distancia)
- Paginación de resultados
- Documentación con Swagger
- Tests unitarios completos
- Dockerización del ambiente

## Stack Tecnológico

- NestJS (TypeScript)
- PostgreSQL
- TypeORM
- Docker y Docker Compose
- Jest para pruebas unitarias
- Swagger para documentación de API

## Requisitos Previos

- Docker y Docker Compose instalados
- Node.js 18+ (solo para desarrollo local)
- Git

## Configuración del Entorno

1. Clonar el repositorio:
   ```bash
   git clone <repository-url>
   cd propital-api
   ```

2. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

3. Iniciar el entorno con Docker:
   ```bash
   docker-compose up --build
   ```

La API estará disponible en:
- API Base URL: http://localhost:3001
- Documentación Swagger: http://localhost:3001/api
- Health Check: http://localhost:3001/health

## Desarrollo Local

### Opción 1: Usando Docker (Recomendado)

1. Instalar Docker y Docker Compose
2. Clonar el repositorio:
   ```bash
   git clone <repository-url>
   cd propital-api
   ```

3. Copiar el archivo de variables de entorno:
   ```bash
   cp .env.example .env
   ```

4. Iniciar los servicios:
   ```bash
   docker-compose up -d
   ```

   Esto iniciará:
   - PostgreSQL en el puerto 5433
   - API en el puerto 3001 con hot-reload

5. Ver logs de la aplicación:
   ```bash
   docker-compose logs -f api
   ```

### Opción 2: Desarrollo Local sin Docker

1. Asegúrate de tener:
   - Node.js 18+ instalado
   - PostgreSQL 15+ instalado y corriendo

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   ```
   > Nota: Asegúrate de que en tu archivo `.env` la variable `DB_HOST` esté establecida en `localhost` para desarrollo local. Si usas Docker, usa `postgres`.
   Edita el archivo `.env` con tus configuraciones locales:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=propital
   PORT=3001
   NODE_ENV=development
   ```

4. Iniciar la aplicación en modo desarrollo:
   ```bash
   npm run start:dev
   ```

### Verificar que todo funciona

1. Revisar el estado de la API:
   ```bash
   curl http://localhost:3001/health
   ```

2. Abrir Swagger UI:
   - Visitar http://localhost:3001/api en tu navegador

3. Probar un endpoint:
   ```bash
   # Obtener lista de propiedades
   curl http://localhost:3001/properties
   ```

### Solución de Problemas

1. Si hay problemas con la base de datos:
   ```bash
   # Reiniciar contenedor de PostgreSQL
   docker-compose restart postgres
   ```

2. Si hay problemas con node_modules:
   ```bash
   # Eliminar y reinstalar
   rm -rf node_modules
   npm install
   ```

3. Si necesitas reiniciar todo:
   ```bash
   # Con Docker
   docker-compose down
   docker-compose up --build

   # Sin Docker
   npm run start:dev
   ```

## Endpoints Principales

### Propiedades

- `GET /properties` - Lista paginada de propiedades
- `GET /properties/:id` - Obtener una propiedad específica
- `POST /properties` - Crear nueva propiedad
- `PUT /properties/:id` - Actualizar propiedad existente
- `DELETE /properties/:id` - Eliminar propiedad
- `GET /properties/search` - Búsqueda avanzada con filtros

### Parámetros de Búsqueda

- `type`: Tipo de propiedad
- `minPrice`/`maxPrice`: Rango de precios
- `minArea`/`maxArea`: Rango de área
- `latitude`/`longitude`/`radius`: Búsqueda por ubicación

## Testing

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:cov
```

### Estructura de Tests

Los tests están organizados en:
- Tests de Controladores (`*.controller.spec.ts`)
- Tests de Servicios (`*.service.spec.ts`)

### Ejemplo de Test

```typescript
describe('PropertiesService', () => {
  it('should search properties with filters', async () => {
    const searchParams = {
      type: 'house',
      minPrice: 100000,
      maxPrice: 200000,
    };

    const result = await service.search(searchParams);
    
    expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
    expect(result).toEqual(expectedProperties);
  });
});
```

### Mocking

Ejemplo de configuración de mocks:
```typescript
const mockRepository = {
  createQueryBuilder: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockImplementation(() => 
      Promise.resolve([/* datos de prueba */])
    ),
  }),
};
```

## Documentación API

La documentación completa de la API está disponible en Swagger:
1. Inicia el servidor
2. Visita http://localhost:3001/api
3. Explora y prueba los endpoints interactivamente
