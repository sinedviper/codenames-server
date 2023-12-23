import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTypeUserDto } from './dto/create-type-user.dto';
import { UpdateTypeUserDto } from './dto/update-type-user.dto';
import { TypeUserEntity } from './entities/type-user.entity';
import { typeHttpResponse } from '../types';

@Injectable()
export class TypeUserService {
  constructor(
    @InjectRepository(TypeUserEntity)
    private readonly typeUser: Repository<TypeUserEntity>,
  ) {}

  async create(
    createTypeUserDto: CreateTypeUserDto,
  ): Promise<typeHttpResponse<TypeUserEntity>> {
    const newTypeUser = new TypeUserEntity();
    if (!createTypeUserDto.type) {
      throw new HttpException("Body isn't valid", HttpStatus.NOT_ACCEPTABLE);
    }

    newTypeUser.type = createTypeUserDto.type;

    try {
      return {
        statusCode: HttpStatus.CREATED,
        data: await this.typeUser.save(newTypeUser),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findAll() {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.typeUser.find(),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findOne(id: number): Promise<typeHttpResponse<TypeUserEntity>> {
    if (!id) {
      throw new HttpException(
        "Type user id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const typeUser = await this.typeUser.findOne({ where: { id } });
    if (!typeUser) {
      throw new HttpException("Type user isn't found", HttpStatus.NOT_FOUND);
    }
    return { statusCode: HttpStatus.OK, data: typeUser };
  }

  async update(
    updateTypeUserDto: UpdateTypeUserDto,
  ): Promise<typeHttpResponse<TypeUserEntity>> {
    if (!updateTypeUserDto?.id || !updateTypeUserDto?.type) {
      throw new HttpException(
        "Type user params aren't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const typeUserFind = await this.typeUser.findOne({
      where: { id: updateTypeUserDto?.id },
    });

    if (!typeUserFind) {
      throw new HttpException("Type user isn't found", HttpStatus.NOT_FOUND);
    }
    typeUserFind.type = updateTypeUserDto.type;

    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.typeUser.save(typeUserFind),
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
        "Type user id isn't in body",
        HttpStatus.BAD_REQUEST,
      );
    }
    const typeUser = await this.typeUser.findOne({ where: { id } });
    if (!typeUser) {
      throw new HttpException("Type user isn't found", HttpStatus.NOT_FOUND);
    }
    try {
      await this.typeUser.delete(id);

      return { statusCode: HttpStatus.OK };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.CONFLICT);
    }
  }
}
