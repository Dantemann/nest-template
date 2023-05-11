import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfiguration, JoiValidationSchema } from './config';
import { AuthModule } from './modules';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonModule } from './modules/common/common.module';
import { ErrorCatch } from './modules/common/interceptos/error-catch.interceptor';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({ load: [EnvConfiguration],  validationSchema: JoiValidationSchema }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, synchronize: true
    }),
    AuthModule,
    CommonModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorCatch
    }
  ],
})
export class AppModule {}
