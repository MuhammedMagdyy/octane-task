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
