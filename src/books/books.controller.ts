import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/users/decorators/user-role.decorator';
import { UserType } from 'src/users/enums/user-type.enum';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Roles(UserType.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiSecurity('bearer')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Roles(UserType.ADMIN, UserType.USER)
  @Get()
  async findAll() {
    return this.booksService.findAll();
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
