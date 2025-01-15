/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ResponseFormatInterceptor } from '@shared/interceptors';
import { RequestLoggerMiddleware } from '@shared/middlewares';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const GLOBAL_PREFIX = 'v1/api';

  app
    .use(new RequestLoggerMiddleware().use)
    .useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    .useGlobalInterceptors(new ResponseFormatInterceptor(new Reflector()))
    .setGlobalPrefix(GLOBAL_PREFIX);

  // Swagger docs setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tee baker')
    .setDescription('APIs documentation for tee-baer server')
    .setVersion('1.0')
    // .setBasePath(GLOBAL_PREFIX)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`);
}

bootstrap();
