import { Book } from 'src/books/entities/book.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('reading_intervals')
export class ReadingInterval extends BaseEntity {
  @Column({ name: 'start_page' })
  startPage: number;

  @Column({ name: 'end_page' })
  endPage: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_uuid' })
  user: User;

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_uuid' })
  book: Book;
}
