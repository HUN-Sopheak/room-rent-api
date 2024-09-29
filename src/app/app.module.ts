import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/modules/user/user.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'path'
import { HelpersModule } from 'src/utils/helper/helpers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get<string>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<string>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [path.resolve(__dirname, '../src/modules/**/entities/*.entity{.ts,.js}')],
          migration:[path.resolve(__dirname, '../src/db/migrations/**/*{.ts,.js}')],
          synchronize: false,
        } as TypeOrmModuleAsyncOptions
      },
    }),
    UserModule,
    HelpersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
