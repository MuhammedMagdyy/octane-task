import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity('book_stats')
export class BookStats {
  @PrimaryColumn({ name: 'book_id', type: 'integer' })
  bookId: number;

  @OneToOne(() => Book, (book) => book.bookStats)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({ name: 'number_of_read_pages', default: 0 })
  numberOfReadPages: number;
}
