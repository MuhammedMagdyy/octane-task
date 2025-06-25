import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
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
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Roles(UserType.ADMIN, UserType.USER)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.booksService.findAll(paginationDto);
  }

  @Roles(UserType.ADMIN, UserType.USER)
  @Get(':uuid')
  async findOneByUUID(@Param('uuid') uuid: string) {
    return this.booksService.findOneByUUID(uuid);
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(uuid, updateBookDto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    return this.booksService.remove(uuid);
  }
}
