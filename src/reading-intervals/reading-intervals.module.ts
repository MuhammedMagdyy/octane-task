import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookStats } from 'src/book-stats/entities/book-stats.entity';
import { BooksModule } from 'src/books/books.module';
import { DistinctIntervalsModule } from 'src/distinct-intervals/distinct-intervals.module';
import { UsersModule } from 'src/users/users.module';
import { ReadingInterval } from './entities/reading-intervals.entity';
import { ReadingIntervalsController } from './reading-intervals.controller';
import { ReadingIntervalsService } from './reading-intervals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReadingInterval, BookStats]),
    UsersModule,
    BooksModule,
    DistinctIntervalsModule,
  ],
  providers: [ReadingIntervalsService],
  controllers: [ReadingIntervalsController],
  exports: [ReadingIntervalsService],
})
export class ReadingIntervalsModule {}
