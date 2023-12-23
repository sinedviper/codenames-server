import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTypeWordDto } from './dto/create-type-word.dto';
import { UpdateTypeWordDto } from './dto/update-type-word.dto';
import { TypeWordsEntity } from './entities/type-words.entity';
import { typeHttpResponse } from '../types';

@Injectable()
export class TypeWordsService {
  constructor(
    @InjectRepository(TypeWordsEntity)
    private readonly typeWord: Repository<TypeWordsEntity>,
  ) {}

  async create(
    createTypeWordDto: CreateTypeWordDto,
  ): Promise<typeHttpResponse<TypeWordsEntity>> {
    const newTypeWord = new TypeWordsEntity();
    if (!createTypeWordDto.type) {
      throw new HttpException("Body isn't valid", HttpStatus.NOT_ACCEPTABLE);
    }

    newTypeWord.type = createTypeWordDto.type;

    try {
      return {
        statusCode: HttpStatus.CREATED,
        data: await this.typeWord.save(newTypeWord),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findAll(): Promise<typeHttpResponse<TypeWordsEntity[]>> {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.typeWord.find(),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findOne(id: number): Promise<typeHttpResponse<TypeWordsEntity>> {
    if (!id) {
      throw new HttpException(
        "Type word id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const typeWord = await this.typeWord.findOne({ where: { id } });
    if (!typeWord) {
      throw new HttpException("Type word isn't found", HttpStatus.NOT_FOUND);
    }
    return { statusCode: HttpStatus.OK, data: typeWord };
  }

  async update(
    updateTypeWordDto: UpdateTypeWordDto,
  ): Promise<typeHttpResponse<TypeWordsEntity>> {
    if (!updateTypeWordDto?.id || !updateTypeWordDto?.type) {
      throw new HttpException(
        "Type word params aren't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const typeWordFind = await this.typeWord.findOne({
      where: { id: updateTypeWordDto?.id },
    });

    if (!typeWordFind) {
      throw new HttpException("Type word isn't found", HttpStatus.NOT_FOUND);
    }
    typeWordFind.type = updateTypeWordDto.type;

    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.typeWord.save(typeWordFind),
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
        "Type word id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }
    const typeWord = await this.typeWord.findOne({ where: { id } });
    if (!typeWord) {
      throw new HttpException("Type word isn't found", HttpStatus.NOT_FOUND);
    }
    try {
      await this.typeWord.delete(id);

      return { statusCode: HttpStatus.OK };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.CONFLICT);
    }
  }
}
