import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';

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
          entities: [],
        };
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
