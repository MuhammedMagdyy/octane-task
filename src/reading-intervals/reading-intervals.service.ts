import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookStats } from 'src/book-stats/entities/book-stats.entity';
import { BooksService } from 'src/books/books.service';
import { DistinctIntervalsService } from 'src/distinct-intervals/distinct-intervals.service';
import {
  DataSource,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateIntervalDto } from '../common/dto/create-interval.dto';
import { DistinctInterval } from '../distinct-intervals/entities/distinct-intervals.entity';
import { ReadingInterval } from './entities/reading-intervals.entity';

@Injectable()
export class ReadingIntervalsService {
  constructor(
    @InjectRepository(ReadingInterval)
    private readonly readIntervalsRepository: Repository<ReadingInterval>,
    @InjectRepository(BookStats)
    private readonly bookStatsRepository: Repository<BookStats>,
    private readonly distinctIntervalsService: DistinctIntervalsService,
    private readonly bookService: BooksService,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateIntervalDto, userId: number) {
    if (dto.startPage >= dto.endPage) {
      throw new BadRequestException('Start page must be before end page');
    }

    const book = await this.bookService.findOneById(dto.bookId);

    if (dto.endPage > book.numberOfPages) {
      throw new BadRequestException('End page exceeds book page count');
    }

    await this.dataSource.transaction(async (manager) => {
      const interval = this.readIntervalsRepository.create({
        user: { id: userId },
        book: { id: book.id },
        startPage: dto.startPage,
        endPage: dto.endPage,
      });
      await manager.save(interval);

      const overlapping = await manager.find(DistinctInterval, {
        where: {
          book: { id: book.id },
          startPage: LessThanOrEqual(dto.endPage + 1),
          endPage: MoreThanOrEqual(dto.startPage - 1),
        },
        order: { startPage: 'ASC' },
      });

      let newStartPage = dto.startPage;
      let newEndPage = dto.endPage;

      const overlappingIds = overlapping.map((i) => i.id);

      for (const currentInterval of overlapping) {
        newStartPage = Math.min(newStartPage, currentInterval.startPage);
        newEndPage = Math.max(newEndPage, currentInterval.endPage);
      }

      if (overlappingIds.length > 0) {
        await manager.delete(DistinctInterval, overlappingIds);
      }

      const newInterval = this.distinctIntervalsService.create({
        startPage: newStartPage,
        endPage: newEndPage,
        bookId: book.id,
      });
      await manager.save(newInterval);

      const allDistinct = await manager.find(DistinctInterval, {
        where: { book: { id: book.id } },
      });

      const uniquePages = allDistinct.reduce(
        (sum, i) => sum + (i.endPage - i.startPage + 1),
        0,
      );

      await manager.save(
        this.bookStatsRepository.create({
          bookId: book.id,
          numberOfReadPages: uniquePages,
        }),
      );
    });
  }
}
