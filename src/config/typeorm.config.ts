import * as path from 'path';
import { DataSource,DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';  
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any, 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, '../modules/**/entities/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '../db/migrations/**/*{.ts,.js}')],
  seeds: [path.join(__dirname, '../db/seeds/*.seeder.ts')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: ['query', 'error'],

} as DataSourceOptions & SeederOptions); 