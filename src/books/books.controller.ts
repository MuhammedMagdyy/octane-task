import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BookStatsService } from 'src/book-stats/book-stats.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Roles } from 'src/users/decorators/user-role.decorator';
import { UserType } from 'src/users/enums/user-type.enum';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Roles(UserType.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly bookStatsService: BookStatsService,
  ) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Roles(UserType.ADMIN, UserType.USER)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.booksService.findAll(paginationDto);
  }

  @Roles(UserType.USER)
  @Get('top')
  async getTopBooks() {
    return this.bookStatsService.getTopBooks();
  }

  @Roles(UserType.ADMIN, UserType.USER)
  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}
