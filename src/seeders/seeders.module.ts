import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { SeedersService } from './seeders.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  providers: [SeedersService],
  exports: [SeedersService],
})
export class SeedersModule {}
