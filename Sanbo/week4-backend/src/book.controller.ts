import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { BookService } from './book.service';
import { CreateBookDto } from './book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks() {
    return this.bookService.getAllBooks();
  }

  @Post()
  createBook(@Body() dto: CreateBookDto) {
    return this.bookService.createBook(dto);
  }

  @Get('category/:categoryId')
  getBooksByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.bookService.getBooksByCategory(categoryId);
  }
}
