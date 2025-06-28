import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FindOperator, IsNull, Repository } from 'typeorm';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

type OptionsType = {
  where: {
    id: number;
    deletedAt: FindOperator<any>;
  };
};

type BookType = {
  id: number;
  title: string;
  numberOfPages: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

describe('Book Service', () => {
  const REPOSITORY_TOKEN = getRepositoryToken(Book);
  const createBookDto: CreateBookDto = { title: 'Book', numberOfPages: 200 };
  const DEFAULT_ID = 1;
  const now = new Date();
  let bookService: BooksService;
  let bookRepositoryMock: Repository<Book>;
  let books: BookType[] = [];

  beforeEach(async () => {
    books = [
      {
        id: DEFAULT_ID,
        title: 'Book',
        numberOfPages: 200,
        deletedAt: null,
        createdAt: now,
        updatedAt: now,
      } as BookType,
      {
        id: 2,
        title: 'Another Book',
        numberOfPages: 300,
        deletedAt: null,
        createdAt: now,
        updatedAt: now,
      } as BookType,
      {
        id: 3,
        title: 'Third Book',
        numberOfPages: 150,
        deletedAt: null,
        createdAt: now,
        updatedAt: now,
      } as BookType,
    ];

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn((dto: CreateBookDto) => dto),
            save: jest.fn((dto: CreateBookDto) =>
              Promise.resolve({
                id: DEFAULT_ID,
                title: dto.title,
                numberOfPages: dto.numberOfPages,
                deletedAt: null,
                createdAt: now,
                updatedAt: now,
              }),
            ),
            find: jest.fn(() => Promise.resolve(books)),
            findAndCount: jest.fn(() => Promise.resolve([books, books.length])),
            findOne: jest.fn((options: OptionsType) => {
              const where = Array.isArray(options.where)
                ? options.where[0]
                : options.where;

              const book = books.find(
                (book) => book.id === where.id && book.deletedAt === null,
              );

              return Promise.resolve(book);
            }),
            update: jest.fn((id, partial) => {
              const book = books.find((b) => b.id === id);
              if (book) {
                Object.assign(book, partial);
              }
              return Promise.resolve();
            }),
          },
        },
      ],
    }).compile();

    bookService = module.get<BooksService>(BooksService);
    bookRepositoryMock = module.get<Repository<Book>>(REPOSITORY_TOKEN);
  });

  it('book service should be defined', () => {
    expect(bookService).toBeDefined();
  });

  it('book repository should be defined', () => {
    expect(bookRepositoryMock).toBeDefined();
  });

  describe('create()', () => {
    it('should call "create" method in book repository', async () => {
      const createSpy = jest.spyOn(bookRepositoryMock, 'create');
      await bookService.create(createBookDto);
      expect(createSpy).toHaveBeenCalledTimes(1);
    });

    it('should call "save" method in book repository', async () => {
      const saveSpy = jest.spyOn(bookRepositoryMock, 'save');
      await bookService.create(createBookDto);
      expect(saveSpy).toHaveBeenCalledTimes(1);
    });

    it('should create a new book', async () => {
      const book = await bookService.create(createBookDto);
      expect(book).toBeDefined();
      expect(book.id).toBe(DEFAULT_ID);
      expect(book.title).toBe(createBookDto.title);
      expect(book.numberOfPages).toBe(createBookDto.numberOfPages);
      expect(book.deletedAt).toBeNull();
    });
  });

  describe('findAll()', () => {
    it('should return paginated books', async () => {
      const result = await bookService.findAll({ page: 1, limit: 10 });
      expect(result.data).toEqual(books);
      expect(result.total).toBe(books.length);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(1);
    });

    it('should call "findAndCount" with correct pagination options', async () => {
      const spy = jest.spyOn(bookRepositoryMock, 'findAndCount');

      await bookService.findAll({ page: 2, limit: 2 });

      expect(spy).toHaveBeenCalledWith({
        where: { deletedAt: IsNull() },
        skip: 2,
        take: 2,
      });
    });
  });

  describe('findOneById()', () => {
    it('should return a book by ID', async () => {
      const book = await bookService.findOneById(DEFAULT_ID);
      expect(book).toBeDefined();
      expect(book.id).toBe(DEFAULT_ID);
    });

    it('should throw "NotFoundException" if book not found', async () => {
      await expect(bookService.findOneById(5)).rejects.toThrowError(
        new NotFoundException('Book not found'),
      );
    });

    it('should call "findOne" with correct options', async () => {
      const spy = jest.spyOn(bookRepositoryMock, 'findOne');
      await bookService.findOneById(DEFAULT_ID);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.arrayContaining([
            expect.objectContaining({
              id: DEFAULT_ID,
              deletedAt: expect.any(Object),
            }),
          ]),
        }),
      );
    });
  });

  describe('update()', () => {
    it('should update the book and return a success message', async () => {
      const updateSpy = jest.spyOn(bookRepositoryMock, 'update');

      const result = await bookService.update(DEFAULT_ID, {
        title: 'Updated Book',
        numberOfPages: 250,
      });

      expect(updateSpy).toHaveBeenCalledWith(DEFAULT_ID, {
        title: 'Updated Book',
        numberOfPages: 250,
      });
      expect(result).toEqual({ message: 'Book updated successfully' });
    });

    it('should throw "NotFoundException" if book does not exist', async () => {
      await expect(
        bookService.update(5, { title: 'New Title' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('remove()', () => {
    it('should soft delete the book by setting deletedAt', async () => {
      const updateSpy = jest.spyOn(bookRepositoryMock, 'update');

      const result = await bookService.remove(DEFAULT_ID);

      expect(updateSpy).toHaveBeenCalledWith(
        DEFAULT_ID,
        expect.objectContaining({ deletedAt: expect.any(Date) }),
      );
      expect(result).toEqual({ message: 'Book deleted successfully' });
    });

    it('should throw "NotFoundException" if book does not exist', async () => {
      await expect(bookService.remove(5)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
