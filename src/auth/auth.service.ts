import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as path from 'path';

import { UserEntity } from '../user/entities/user.entity';
import { typeHttpResponse } from '../types';
import { TypeUserEntity } from '../type-user/entities/type-user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(TypeUserEntity)
    private readonly typeUserRepository: Repository<TypeUserEntity>,

    private jwtService: JwtService,
  ) {}

  private readonly uploadDir = path.join(__dirname, 'uploads');

  async registration(
    dto: CreateUserDto,
  ): Promise<typeHttpResponse<{ accessToken: string }>> {
    if (!dto.username || !dto.color || !dto.password || !dto.date_recover) {
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
        'There is a user with this username',
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

    const accessToken = this.jwtService.sign(
      { sub: data },
      { secret: process.env.PUBLIC_KEY },
    );

    return {
      statusCode: HttpStatus.CREATED,
      data: { accessToken },
    };
  }

  async login(
    dto: LoginDto,
  ): Promise<typeHttpResponse<{ accessToken: string }>> {
    const userByUsername = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (!userByUsername)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const isPasswordCorrect = await compare(
      dto.password,
      userByUsername.password,
    );

    if (!isPasswordCorrect)
      throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);

    delete userByUsername.password;

    const accessToken = this.jwtService.sign(
      { sub: userByUsername },
      { secret: process.env.PUBLIC_KEY },
    );

    return {
      statusCode: HttpStatus.OK,
      data: { accessToken },
    };
  }

  async update(
    dto: UpdateUserDto,
  ): Promise<typeHttpResponse<{ accessToken: string }>> {
    if (!dto.id) {
      throw new HttpException(
        "Id params aren't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const userByUsername = await this.userRepository.findOne({
      where: { id: dto.id },
    });
    if (!userByUsername) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    userByUsername.color = dto?.color ?? userByUsername.color;
    userByUsername.status = dto?.status ?? userByUsername.status;

    if (dto?.username) {
      const userUsername = await this.userRepository.findOne({
        where: { username: dto?.username },
      });
      if (userUsername) {
        throw new HttpException(
          'There is a user with this username',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        userByUsername.username = dto?.username;
      }
    }

    if (dto.password) {
      if (!dto.old_password) {
        throw new HttpException(
          'Old password not found',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const isPasswordCorrect = await compare(
          dto.old_password,
          userByUsername.password,
        );
        if (isPasswordCorrect) {
          userByUsername.password = dto.password;
        } else {
          throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST);
        }
      }
    }

    if (dto.date_recover) {
      if (!dto.password) {
        throw new HttpException(
          "Password param aren't in body",
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const isPasswordCorrect = await compare(
          dto.password,
          userByUsername.password,
        );
        if (isPasswordCorrect) {
          userByUsername.date_recover = dto.date_recover;
        } else {
          throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST);
        }
      }
    }

    try {
      const data = await this.userRepository.save(userByUsername);
      delete data.password;

      const accessToken = this.jwtService.sign(
        { sub: userByUsername },
        { secret: process.env.PUBLIC_KEY },
      );

      return {
        statusCode: HttpStatus.OK,
        data: { accessToken },
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }
}
