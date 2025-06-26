import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Set a global prefix for all API routes
  app.setGlobalPrefix('api');

  // 2. Enable shutdown hooks for graceful termination
  app.enableShutdownHooks();

  // 3. Apply global validation pipe with whitelist
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  // 4. Use environment variables for the port
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();