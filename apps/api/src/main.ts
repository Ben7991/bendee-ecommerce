import { NestFactory } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/health', method: RequestMethod.GET }],
  });
  app.use(cookieParser());

  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get('PORT') ?? 3030;

  const config = new DocumentBuilder()
    .setTitle('Jofak Ecommerce')
    .setDescription('Api docs for all related request for jofak')
    .addBearerAuth()
    .addServer(`http://localhost:${PORT}`, 'Local server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
await bootstrap();
