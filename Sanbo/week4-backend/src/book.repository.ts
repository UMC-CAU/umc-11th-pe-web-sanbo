// src/book.repository.ts

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { Pool } from 'mysql2/promise';
import { DATABASE_CONNECTION } from './database.provider';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './book.entity';
import { Category } from './category.entity';
import { CreateBookDto } from './book.dto';

@Injectable()
export class BookRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly pool: Pool,

    @InjectRepository(Book)
    private readonly repository: Repository<Book>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.repository.find({
      relations: {
        category: true,
      },
      order: {
        bookId: 'DESC',
      },
    });
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const category = await this.categoryRepository.findOneBy({
      categoryId: dto.categoryId,
    });

    if (!category) {
      throw new NotFoundException('존재하지 않는 카테고리입니다.');
    }

    const book = this.repository.create({
      category,
      title: dto.title,
      description: dto.description ?? null,
      isAvailable: true,
    });

    return this.repository.save(book);
  }

  async findByCategoryId(categoryId: number) {
    const [rows] = await this.pool.execute(
      'SELECT * FROM book WHERE category_id = ?',
      [categoryId],
    );

    return rows;
  }
}
