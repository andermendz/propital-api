# Propital API - Real Estate Project Visualization System

This is a RESTful API for a real estate project visualization system that allows users to explore properties on an interactive map, search and filter projects, and view detailed information about each property.

## Features

- Interactive map integration
- Property markers with preview images
- Detailed property information
- Search and filtering capabilities
- Geographic navigation
- Data persistence with PostgreSQL

## Tech Stack

- NestJS (TypeScript)
- PostgreSQL
- TypeORM
- Docker & Docker Compose
- Swagger for API documentation
- Jest for testing

## Prerequisites

- Docker and Docker Compose installed on your system
- Git

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd propital-api
   ```

2. Start the development environment:
   ```bash
   docker-compose up -d
   ```

   This will:
   - Build the NestJS application
   - Start PostgreSQL database
   - Set up all necessary configurations

3. The API will be available at:
   - API Endpoint: http://localhost:3000
   - Swagger Documentation: http://localhost:3000/api

## Testing

Run the test suite:
```bash
docker-compose exec api npm run test
```

Run end-to-end tests:
```bash
docker-compose exec api npm run test:e2e
```

## API Documentation

Once the application is running, you can access the Swagger documentation at http://localhost:3000/api to explore all available endpoints and their specifications.

## Database Schema

The system uses PostgreSQL with the following main entities:

- Properties
- Locations
- PropertyTypes
- PropertyDetails
- Images

## Contributing

Please read through our contributing guidelines before making any changes.

## License

This project is licensed under the UNLICENSED license.