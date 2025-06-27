import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookStatsService } from './book-stats.service';
import { BookStats } from './entities/book-stats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookStats])],
  providers: [BookStatsService],
  exports: [BookStatsService],
})
export class BookStatsModule {}
