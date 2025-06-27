import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('book_stats')
export class BookStats {
  @PrimaryColumn('uuid')
  book_uuid: string;

  @OneToOne(() => Book, (book) => book.bookStats)
  @JoinColumn({ name: 'book_uuid' })
  book: Book;

  @Column({ name: 'number_of_read_pages', default: 0 })
  numberOfReadPages: number;
}
