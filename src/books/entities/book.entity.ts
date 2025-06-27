import { BookStats } from 'src/book-stats/entities/book-stats.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column({ name: 'number_of_pages' })
  numberOfPages: number;

  @OneToOne(() => BookStats, (bookStats) => bookStats.book)
  bookStats: BookStats;
}
