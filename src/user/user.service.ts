import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { typeHttpResponse } from '../types';
import {
  buildUserResponse,
  checkExistsUsername,
  hashPassword,
} from '../services/user';
import { UserResponseInterface } from '../interfaces/user/userResponce.interface';
import { Errors } from '../services/errors';
import { CreateCRMUserDto } from './dto/createCRM-user.dto';
import { TypeUserEntity } from '../type-user/entities/type-user.entity';
import * as path from 'path';
import { v4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TypeUserEntity)
    private readonly typeUserRepository: Repository<TypeUserEntity>,
  ) {}

  private readonly uploadDir = path.join(__dirname, 'uploads');

  async createUserForCRM(
    dto: CreateCRMUserDto,
  ): Promise<typeHttpResponse<UserResponseInterface>> {
    if (await checkExistsUsername(this.userRepository, dto.username)) {
      throw new HttpException(
        Errors.USERNAME_TAKEN,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();

    Object.assign(newUser, dto);

    newUser.password = await hashPassword(newUser.password);

    const findUserType = await this.typeUserRepository.findOneBy({
      id: dto.type,
    });

    if (findUserType) {
      newUser.id_type = findUserType;
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: buildUserResponse(await this.userRepository.save(newUser)),
    };
  }

  async findAll(): Promise<typeHttpResponse<UserResponseInterface[]>> {
    const users = await this.userRepository.find();

    return {
      statusCode: HttpStatus.OK,
      data: users.map((v) => buildUserResponse(v)),
    };
  }

  async findOne(id: number): Promise<typeHttpResponse<UserResponseInterface>> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      data: buildUserResponse(user),
    };
  }

  async update(
    id: number,
    dto: UpdateUserDto,
  ): Promise<typeHttpResponse<UserResponseInterface>> {
    const findUser = await this.userRepository.findOneBy({ id });

    if (!findUser)
      throw new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    if (dto.password) findUser.password = await hash(dto.password, 10);

    this.userRepository.merge(findUser, dto);

    return {
      statusCode: HttpStatus.OK,
      data: buildUserResponse(await this.userRepository.save(findUser)),
    };
  }

  async remove(id: number): Promise<typeHttpResponse<boolean>> {
    const findUser = await this.userRepository.findOneBy({ id });

    if (!findUser)
      throw new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    await this.userRepository.remove(findUser);

    return {
      statusCode: HttpStatus.OK,
      data: true,
    };
  }

  async setAvatar(
    id: number,
    file: Express.Multer.File,
  ): Promise<typeHttpResponse<Boolean>> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user)
      throw new HttpException(Errors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    if (file.size <= 0)
      throw new HttpException("Img doesn't exists!", HttpStatus.BAD_REQUEST);

    if (user.avatar) {
      const fullPath = path.join(__dirname, '..', '..', user.avatar);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    const uniqueFileName = v4() + path.extname(file.originalname);
    const filePath = `./image/${uniqueFileName}`;

    fs.writeFileSync(filePath, file.buffer);

    user.avatar = filePath;
    await this.userRepository.save(user);

    return {
      statusCode: HttpStatus.OK,
      data: true,
    };
  }

  async deleteAvatar() {}
}
