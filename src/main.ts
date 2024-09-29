import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module'; 
import * as dotenv from 'dotenv'
dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.APP_PREFIX  || 'api');
  await app.listen(process.env.APP_LISTEN || 3000);
}
bootstrap();
