// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseProviders } from './database.provider';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';

import { RentalController } from './rental.controller';
import { RentalRepository } from './rental.repository';
import { RentalService } from './rental.service';

import { Book } from './book.entity';
import { Category } from './category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',

        host: configService.get<string>('DB_HOST', 'localhost'),

        port: configService.get<number>('DB_PORT', 3306),

        username: configService.get<string>('DB_USER', 'root'),

        password: configService.get<string>('DB_PASSWORD', ''),

        database: configService.get<string>('DB_NAME', 'study'),

        autoLoadEntities: true,

        synchronize: false,
      }),
    }),

    TypeOrmModule.forFeature([Book, Category]),
  ],

  controllers: [AppController, BookController, RentalController],

  providers: [
    ...databaseProviders,

    AppService,

    BookService,
    BookRepository,

    RentalService,
    RentalRepository,
  ],

  exports: [...databaseProviders],
})
export class AppModule {}
