import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';

import { UserEntity } from '../user/entities/user.entity';
import { typeHttpResponse } from '../types';
import { TypeUserEntity } from '../type-user/entities/type-user.entity';
import { Errors } from '../services/errors';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(TypeUserEntity)
    private readonly typeUserRepository: Repository<TypeUserEntity>,
  ) {}

  async registration(
    dto: CreateUserDto,
  ): Promise<typeHttpResponse<Omit<UserEntity, 'password'>>> {
    if (!dto.username || !dto.color || !dto.password) {
      throw new HttpException(
        "Update params aren't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const findUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (findUser) {
      throw new HttpException(
        'A user with that nickname already exists',
        HttpStatus.CONFLICT,
      );
    }

    const findUserStatus = await this.typeUserRepository.findOne({
      where: { type: 'user' },
    });
    if (!findUserStatus) {
      throw new HttpException('A user type isn`t found', HttpStatus.CONFLICT);
    }

    const newUser = new UserEntity();
    newUser.id_type = findUserStatus;

    Object.assign(newUser, dto);

    try {
      newUser.password = await hash(newUser.password, 10);
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const data = await this.userRepository.save(newUser);
    delete data.password;

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  async login(
    dto: LoginDto,
  ): Promise<typeHttpResponse<Omit<UserEntity, 'password'>>> {
    const userByUsername = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (!userByUsername)
      throw new HttpException(Errors.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);

    const isPasswordCorrect = await compare(
      dto.password,
      userByUsername.password,
    );

    if (!isPasswordCorrect)
      throw new HttpException(
        Errors.INCORRECT_PASSWORD,
        HttpStatus.BAD_REQUEST,
      );

    delete userByUsername.password;

    return {
      statusCode: HttpStatus.OK,
      data: userByUsername,
    };
  }
}
