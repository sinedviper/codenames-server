import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import {
  buildUserResponse,
  checkExistsUsername,
  hashPassword,
} from '../services/user';
import { Errors } from '../services/errors';
import { typeHttpResponse } from '../types';
import { UserResponseInterface } from '../interfaces/user/userResponce.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async registration(dto: CreateUserDto): Promise<typeHttpResponse<>> {
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

    const newUser = new UserEntity();

    Object.assign(newUser, dto);
    newUser.password = await hashPassword(newUser.password);

    return {
      statusCode: HttpStatus.CREATED,
      data: buildUserResponse(await this.userRepository.save(newUser)),
    };
  }

  async login(dto: LoginDto): Promise<typeHttpResponse<UserResponseInterface>> {
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

    return {
      statusCode: HttpStatus.OK,
      data: buildUserResponse(userByUsername),
    };
  }
}
