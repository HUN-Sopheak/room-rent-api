import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as path from 'path';
import { AppDataSource } from './config/typeorm.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(path.resolve(__dirname, '../src/modules/entities/*.entity{.ts,.js}'));
  console.log(path.resolve(__dirname, '../src/migrations/**/*{.ts,.js}'));
  console.log( path.resolve(__dirname, '../src/modules/**/entities/*.entity{.ts,.js}'));
  
  
}
bootstrap();
