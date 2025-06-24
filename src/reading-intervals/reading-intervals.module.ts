import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';
import { ReadingInterval } from './entities/reading-intervals.entity';
import { ReadingIntervalsController } from './reading-intervals.controller';
import { ReadingIntervalsService } from './reading-intervals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReadingInterval]),
    UsersModule,
    BooksModule,
  ],
  providers: [ReadingIntervalsService],
  controllers: [ReadingIntervalsController],
})
export class ReadingIntervalsModule {}
