import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // habilita peticiones de otros dominios
  app.enableCors();

  // configuración de Swagger para documentación del API
  const config = new DocumentBuilder()
    .setTitle('Propital API')
    .setDescription('sistema para visualizar proyectos inmobiliarios')
    .setVersion('1.0')
    .addTag('properties')
    .addTag('locations')
    .addTag('property-types')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();