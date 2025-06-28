import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookStats } from './entities/book-stats.entity';

@Injectable()
export class BookStatsService {
  constructor(
    @InjectRepository(BookStats)
    private readonly bookStatsRepository: Repository<BookStats>,
  ) {}

  async getTopBooks() {
    const data = await this.bookStatsRepository.find({
      order: { numberOfReadPages: 'DESC' },
      take: 5,
      relations: ['book'],
      select: {
        book: { title: true, numberOfPages: true },
        bookId: true,
        numberOfReadPages: true,
      },
    });

    return {
      message: 'Top 5 books',
      data: data.map((item) => ({
        bookId: item.bookId,
        title: item.book.title,
        numberOfPages: item.book.numberOfPages,
        numberOfReadPages: item.numberOfReadPages,
      })),
    };
  }
}
