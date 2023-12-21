import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageEntity } from './entities/language.entity';
import { typeHttpResponse } from '../types';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languages: Repository<LanguageEntity>,
  ) {}

  async create(
    createLanguageDto: CreateLanguageDto,
  ): Promise<typeHttpResponse<LanguageEntity>> {
    const language = new LanguageEntity();
    if (!createLanguageDto.language) {
      throw new HttpException("Body isn't valid", HttpStatus.NOT_ACCEPTABLE);
    }

    language.language = createLanguageDto.language;

    try {
      return {
        statusCode: HttpStatus.CREATED,
        data: await this.languages.save(language),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findAll(): Promise<typeHttpResponse<LanguageEntity[]>> {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.languages.find(),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findOne(id: number): Promise<typeHttpResponse<LanguageEntity>> {
    if (!id) {
      throw new HttpException(
        "Language id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const language = await this.languages.findOne({ where: { id } });
      if (!language) {
        throw new HttpException("Language isn't found", HttpStatus.NOT_FOUND);
      }
      return { statusCode: HttpStatus.OK, data: language };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async update(
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<typeHttpResponse<LanguageEntity>> {
    if (!updateLanguageDto?.id || !updateLanguageDto?.language) {
      throw new HttpException(
        "Language params aren't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const languageFind = await this.languages.findOne({
      where: { id: updateLanguageDto?.id },
    });

    if (!languageFind) {
      throw new HttpException("Language isn't found", HttpStatus.NOT_FOUND);
    }
    languageFind.language = updateLanguageDto.language;

    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.languages.save(languageFind),
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
        "Language id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }
    const language = await this.languages.findOne({ where: { id } });
    if (!language) {
      throw new HttpException("Language isn't found", HttpStatus.NOT_FOUND);
    }
    try {
      await this.languages.delete(id);

      return { statusCode: HttpStatus.OK };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.CONFLICT);
    }
  }
}
