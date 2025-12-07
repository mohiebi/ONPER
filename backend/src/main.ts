/**
 * ONPER Backend API - Main Entry Point
 * Bootstraps the NestJS application with Swagger documentation
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend communication
  const allowedOrigins: string[] = [
    'http://localhost:8080',  // Docker frontend
    'http://localhost:5173',  // Vite dev server
    process.env.FRONTEND_URL,
  ].filter((origin): origin is string => Boolean(origin));

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Global validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('ONPER API')
    .setDescription('One Percent Runner - Premium Marathon Training API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('training', 'Training sessions')
    .addTag('motivation', 'Motivation system')
    .addTag('notifications', 'Notification management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`
  ╔═══════════════════════════════════════════╗
  ║   🏃 ONPER API - One Percent Runner      ║
  ╠═══════════════════════════════════════════╣
  ║   🚀 Server running on port ${port}        ║
  ║   📚 API Docs: http://localhost:${port}/api  ║
  ╚═══════════════════════════════════════════╝
  `);
}

bootstrap();

