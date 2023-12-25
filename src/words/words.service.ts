import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { typeHttpResponse } from '../types';
import { WordsEntity } from './entities/words.entity';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordsEntity)
    private readonly words: Repository<WordsEntity>,
  ) {}

  async create(
    createWordDto: CreateWordDto,
  ): Promise<typeHttpResponse<WordsEntity>> {
    const words = new WordsEntity();
    if (!words.word) {
      throw new HttpException("Body haven't word", HttpStatus.NOT_ACCEPTABLE);
    }
    if (!words.id_category_word) {
      throw new HttpException(
        "Body haven't category",
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    if (!words.id_language) {
      throw new HttpException(
        "Body haven't language",
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    words.word = createWordDto.word;
    words.id_category_word = createWordDto.id_category_word;
    words.id_language = createWordDto.id_language;

    try {
      const newWords = await this.words.save(words);

      return {
        statusCode: HttpStatus.CREATED,
        data: newWords,
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findAll(): Promise<typeHttpResponse<WordsEntity[]>> {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.words.find(),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async update(
    updateWordDto: UpdateWordDto,
  ): Promise<typeHttpResponse<WordsEntity>> {
    if (
      !updateWordDto?.id ||
      !updateWordDto?.word ||
      !updateWordDto?.id_category_word ||
      !updateWordDto?.id_language
    ) {
      throw new HttpException(
        "Update params aren't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const wordsFind = await this.words.findOne({
      where: { id: updateWordDto?.id },
    });

    if (!wordsFind) {
      throw new HttpException("Word isn't found", HttpStatus.NOT_FOUND);
    }
    if (updateWordDto.word) {
      wordsFind.word = updateWordDto.word;
    }
    if (updateWordDto.id_category_word) {
      wordsFind.id_category_word = updateWordDto.id_category_word;
    }
    if (updateWordDto.id_language) {
      wordsFind.id_language = updateWordDto.id_language;
    }

    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.words.save(wordsFind),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new HttpException("Word id isn't in body", HttpStatus.BAD_REQUEST);
    }
    const words = await this.words.findOne({ where: { id } });
    if (!words) {
      throw new HttpException("Word isn't found", HttpStatus.NOT_FOUND);
    }
    try {
      await this.words.delete(id);

      return { statusCode: HttpStatus.OK };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.CONFLICT);
    }
  }
}
