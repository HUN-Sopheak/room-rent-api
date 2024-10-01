import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module'; 
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'
import * as path from 'path'
import helmet from 'helmet';
dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
        frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
      },
    },
  }));
  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
    whitelist: true, 
    forbidNonWhitelisted: true, 
  }));
  
  app.setGlobalPrefix(process.env.APP_PREFIX  || 'api');
  await app.listen(process.env.APP_LISTEN || 3000);
}
bootstrap();
