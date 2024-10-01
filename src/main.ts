import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module'; 
import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(path.join(__dirname, '../src/db/seeds/*.seeder{.ts,.js}'));
  console.log(path.join(__dirname, '../db/migrations/**/*{.ts,.js}'));
  
  app.setGlobalPrefix(process.env.APP_PREFIX  || 'api');
  await app.listen(process.env.APP_LISTEN || 3000);
}
bootstrap();
