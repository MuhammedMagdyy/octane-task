import { Injectable } from '@nestjs/common';
import { Book } from 'src/books/entities/book.entity';
import { ReadingIntervalsService } from 'src/reading-intervals/reading-intervals.service';

@Injectable()
export class RecommendationsService {
  constructor(
    private readonly readingIntervalsService: ReadingIntervalsService,
  ) {}

  // TODO: need to optimize it
  async getTopReadBooks() {
    const intervals = await this.readingIntervalsService.findAll();

    const bookPagesMap = new Map<string, { book: Book; pages: Set<number> }>();

    for (const interval of intervals) {
      const { book, startPage, endPage } = interval;

      if (!bookPagesMap.has(book.uuid)) {
        bookPagesMap.set(book.uuid, { book, pages: new Set<number>() });
      }

      const pagesSet = bookPagesMap.get(book.uuid)!.pages;
      for (let i = startPage; i <= endPage; i++) {
        pagesSet.add(i);
      }
    }

    const sorted = [...bookPagesMap.values()]
      .map(({ book, pages }) => ({
        bookUUID: book.uuid,
        bookTitle: book.title,
        numberOfPages: book.numberOfPages,
        numberOfReadPages: pages.size,
      }))
      .sort((a, b) => b.numberOfReadPages - a.numberOfReadPages)
      .slice(0, 5);

    return sorted;
  }
}
