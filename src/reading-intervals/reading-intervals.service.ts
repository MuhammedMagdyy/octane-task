import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import { Repository } from 'typeorm';
import { CreateIntervalDto } from './dto/create-interval.dto';
import { ReadingInterval } from './entities/reading-intervals.entity';

@Injectable()
export class ReadingIntervalsService {
  constructor(
    @InjectRepository(ReadingInterval)
    private readonly readIntervalsRepository: Repository<ReadingInterval>,
    private readonly bookService: BooksService,
  ) {}

  async create(dto: CreateIntervalDto, userUUID: string) {
    if (dto.startPage > dto.endPage) {
      throw new BadRequestException('Start page must be before end page');
    }

    const book = await this.bookService.findOneByUUID(dto.bookUUID);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (dto.endPage > book.numberOfPages) {
      throw new BadRequestException('End page exceeds book page count');
    }

    const interval = this.readIntervalsRepository.create({
      user: { uuid: userUUID },
      book: { uuid: book.uuid },
      startPage: dto.startPage,
      endPage: dto.endPage,
    });

    return this.readIntervalsRepository.save(interval);
  }
}
