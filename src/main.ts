import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    allowedHeaders: JSON.parse(process.env.CORS_ALLOWED_HEADERS),
    origin: JSON.parse(process.env.CORS_ALLOWED_ORIGINS),
    methods: JSON.parse(process.env.CORS_ALLOWED_METHODS)
  })
  await app.listen(3000);
}
bootstrap();
