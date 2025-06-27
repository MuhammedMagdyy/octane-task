import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BookStatsModule } from './book-stats/book-stats.module';
import { BookStats } from './book-stats/entities/book-stats.entity';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { DistinctIntervalsModule } from './distinct-intervals/distinct-intervals.module';
import { DistinctInterval } from './distinct-intervals/entities/distinct-intervals.entity';
import { ReadingInterval } from './reading-intervals/entities/reading-intervals.entity';
import { ReadingIntervalsModule } from './reading-intervals/reading-intervals.module';
import { SeedersModule } from './seeders/seeders.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get<string>('POSTGRES_DB'),
          username: config.get<string>('POSTGRES_USER'),
          password: config.get<string>('POSTGRES_PASSWORD'),
          port: config.get<number>('POSTGRES_PORT'),
          host: config.get<string>('POSTGRES_HOST'),
          synchronize: config.get<string>('NODE_ENV') !== 'production',
          entities: [User, Book, ReadingInterval, DistinctInterval, BookStats],
        };
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    CommonModule,
    UsersModule,
    AuthModule,
    BooksModule,
    ReadingIntervalsModule,
    SeedersModule,
    DistinctIntervalsModule,
    BookStatsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/*path', method: RequestMethod.ALL });
  }
}
