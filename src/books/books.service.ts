import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({ where: { deletedAt: IsNull() } });
  }

  async findOneByUUID(uuid: string): Promise<Book | null> {
    return this.bookRepository.findOne({
      where: [{ uuid, deletedAt: IsNull() }],
    });
  }

  async update(uuid: string, updateBookDto: UpdateBookDto) {
    const book = await this.findOneByUUID(uuid);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    await this.bookRepository.update(uuid, updateBookDto);
    return { message: 'Book updated successfully' };
  }

  async remove(uuid: string) {
    const book = await this.findOneByUUID(uuid);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    await this.bookRepository.update(uuid, { deletedAt: new Date() });
    return { message: 'Book deleted successfully' };
  }
}
