import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginatedResponse } from 'src/common/interfaces/pagination.interface';
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

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Book>> {
    const page = paginationDto.page as number;
    const limit = paginationDto.limit as number;
    const skip = (page - 1) * limit;

    const [data, total] = await this.bookRepository.findAndCount({
      where: { deletedAt: IsNull() },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return { data, total, page, limit, totalPages };
  }

  async findOneById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: [{ id, deletedAt: IsNull() }],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOneById(id);
    await this.bookRepository.update(id, updateBookDto);
    return { message: 'Book updated successfully' };
  }

  async remove(id: number) {
    await this.findOneById(id);
    await this.bookRepository.update(id, { deletedAt: new Date() });
    return { message: 'Book deleted successfully' };
  }
}
