import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCountWordDto } from './dto/create-count-word.dto';
import { UpdateCountWordDto } from './dto/update-count-word.dto';
import { typeHttpResponse } from '../types';
import { CountWordEntity } from './entities/count-word.entity';
@Injectable()
export class CountWordsService {
  constructor(
    @InjectRepository(CountWordEntity)
    private readonly countWords: Repository<CountWordEntity>,
  ) {}

  async create(
    createCountWordDto: CreateCountWordDto,
  ): Promise<typeHttpResponse<CountWordEntity>> {
    const newCountWord = new CountWordEntity();
    if (!createCountWordDto.count) {
      throw new HttpException("Body isn't valid", HttpStatus.NOT_ACCEPTABLE);
    }

    newCountWord.count = createCountWordDto.count;

    return {
      statusCode: HttpStatus.CREATED,
      data: await this.countWords.save(newCountWord),
    };
  }

  async findAll(): Promise<typeHttpResponse<CountWordEntity[]>> {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.countWords.find(),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findOne(id: number): Promise<typeHttpResponse<CountWordEntity>> {
    if (!id) {
      throw new HttpException(
        "Category word id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }
    const countWord = await this.countWords.findOne({ where: { id } });
    if (!countWord) {
      throw new HttpException(
        "Category word isn't found",
        HttpStatus.NOT_FOUND,
      );
    }
    return { statusCode: HttpStatus.OK, data: countWord };
  }

  async update(
    updateCountWordDto: UpdateCountWordDto,
  ): Promise<typeHttpResponse<CountWordEntity>> {
    if (!updateCountWordDto?.id || !updateCountWordDto?.count) {
      throw new HttpException(
        "Count words params aren't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryWordFind = await this.countWords.findOne({
      where: { id: updateCountWordDto?.id },
    });

    if (!categoryWordFind) {
      throw new HttpException("Count words isn't found", HttpStatus.NOT_FOUND);
    }
    categoryWordFind.count = updateCountWordDto.count;

    return {
      statusCode: HttpStatus.OK,
      data: await this.countWords.save(categoryWordFind),
    };
  }

  async remove(id: number): Promise<typeHttpResponse<null>> {
    if (!id) {
      throw new HttpException(
        "Count words id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }
    const categoryWords = await this.countWords.findOne({ where: { id } });
    if (!categoryWords) {
      throw new HttpException("Count words isn't found", HttpStatus.NOT_FOUND);
    }
    try {
      await this.countWords.delete(id);

      return { statusCode: HttpStatus.OK };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.CONFLICT);
    }
  }
}
