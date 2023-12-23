import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryWordEntity } from './entities/category-word.entity';
import { CreateCategoryWordDto } from './dto/create-category-word.dto';
import { UpdateCategoryWordDto } from './dto/update-category-word.dto';
import { typeHttpResponse } from '../types';

@Injectable()
export class CategoryWordsService {
  constructor(
    @InjectRepository(CategoryWordEntity)
    private readonly categoryWords: Repository<CategoryWordEntity>,
  ) {}

  async create(
    createCategoryWordDto: CreateCategoryWordDto,
  ): Promise<typeHttpResponse<CategoryWordEntity>> {
    const newCategoryWords = new CategoryWordEntity();
    if (!createCategoryWordDto.category) {
      throw new HttpException("Body isn't valid", HttpStatus.NOT_ACCEPTABLE);
    }

    newCategoryWords.category = createCategoryWordDto.category;

    try {
      return {
        statusCode: HttpStatus.CREATED,
        data: await this.categoryWords.save(newCategoryWords),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findAll(): Promise<typeHttpResponse<CategoryWordEntity[]>> {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.categoryWords.find(),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findOne(id: number): Promise<typeHttpResponse<CategoryWordEntity>> {
    if (!id) {
      throw new HttpException(
        "Category word id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryWords = await this.categoryWords.findOne({ where: { id } });
    if (!categoryWords) {
      throw new HttpException(
        "Category word isn't found",
        HttpStatus.NOT_FOUND,
      );
    }
    return { statusCode: HttpStatus.OK, data: categoryWords };
  }

  async update(
    updateCategoryWordDto: UpdateCategoryWordDto,
  ): Promise<typeHttpResponse<CategoryWordEntity>> {
    if (!updateCategoryWordDto?.id || !updateCategoryWordDto?.category) {
      throw new HttpException(
        "Category word params aren't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryWordFind = await this.categoryWords.findOne({
      where: { id: updateCategoryWordDto?.id },
    });

    if (!categoryWordFind) {
      throw new HttpException(
        "Category word isn't found",
        HttpStatus.NOT_FOUND,
      );
    }
    categoryWordFind.category = updateCategoryWordDto.category;

    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.categoryWords.save(categoryWordFind),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async remove(id: number): Promise<typeHttpResponse<null>> {
    if (!id) {
      throw new HttpException(
        "Category word id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }
    const categoryWords = await this.categoryWords.findOne({ where: { id } });
    if (!categoryWords) {
      throw new HttpException(
        "Category word isn't found",
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this.categoryWords.delete(id);

      return { statusCode: HttpStatus.OK };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.CONFLICT);
    }
  }
}
