// src/book.service.ts

import { Injectable } from '@nestjs/common';

import { BookRepository } from './book.repository';
import { BookResponseDto, CreateBookDto } from './book.dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getAllBooks(): Promise<BookResponseDto[]> {
    const books = await this.bookRepository.findAll();

    return books.map((book) => BookResponseDto.from(book));
  }

  async createBook(dto: CreateBookDto): Promise<BookResponseDto> {
    const book = await this.bookRepository.create(dto);

    return BookResponseDto.from(book);
  }

  async getBooksByCategory(categoryId: number) {
    return this.bookRepository.findByCategoryId(categoryId);
  }
}
