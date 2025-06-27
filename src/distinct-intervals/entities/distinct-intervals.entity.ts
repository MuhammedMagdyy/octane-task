import { Book } from 'src/books/entities/book.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('distinct_intervals')
@Index('idx_book_pages', ['book', 'startPage', 'endPage'], { unique: true })
export class DistinctInterval extends BaseEntity {
  @Column({ name: 'start_page' })
  startPage: number;

  @Column({ name: 'end_page' })
  endPage: number;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_uuid' })
  book: Book;
}
