import * as path from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/user/entities/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any, 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname,'src/modules/**/entities/*.entity.ts'],
  migrations: [path.join(__dirname, '../migrations/**/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: ['query', 'error'],
});
