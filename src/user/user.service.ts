import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { typeHttpResponse } from '../types';
import { CreateUserDto } from './dto/create-user.dto';
import { TypeUserEntity } from '../type-user/entities/type-user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TypeUserEntity)
    private readonly typeUserRepository: Repository<TypeUserEntity>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<typeHttpResponse<UserEntity>> {
    if (
      !createUserDto.username &&
      !createUserDto.type &&
      !createUserDto.password
    ) {
      throw new HttpException("Body isn't valid", HttpStatus.NOT_ACCEPTABLE);
    }

    const findUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
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

    Object.assign(newUser, createUserDto);

    try {
      newUser.password = await hash(newUser.password, 10);
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    const data = await this.userRepository.save(newUser);

    try {
      return {
        statusCode: HttpStatus.CREATED,
        data,
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findAll(): Promise<typeHttpResponse<UserEntity[]>> {
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.userRepository.find(),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findOne(id: number): Promise<typeHttpResponse<UserEntity>> {
    if (!id) {
      throw new HttpException("User id isn't in body", HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException("User isn't found", HttpStatus.NOT_FOUND);
    }
    return { statusCode: HttpStatus.OK, data: user };
  }

  async update(
    updateUpdateUserDto: UpdateUserDto,
  ): Promise<typeHttpResponse<UserEntity>> {
    if (!updateUpdateUserDto.id) {
      throw new HttpException(
        "User params aren't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const userFind = await this.userRepository.findOne({
      where: { id: updateUpdateUserDto.id },
    });

    if (!userFind) {
      throw new HttpException("User isn't found", HttpStatus.NOT_FOUND);
    }

    userFind.username = updateUpdateUserDto?.username ?? userFind.username;
    userFind.password = updateUpdateUserDto?.password
      ? await hash(updateUpdateUserDto.password, 10)
      : userFind.password;
    userFind.color = updateUpdateUserDto?.color ?? userFind.color;
    userFind.lose = updateUpdateUserDto?.lose ?? userFind.lose;
    userFind.wins = updateUpdateUserDto?.wins ?? userFind.wins;
    userFind.id_type = updateUpdateUserDto?.id_type ?? userFind.id_type;
    userFind.status = updateUpdateUserDto?.status ?? userFind.status;
    userFind.scores = updateUpdateUserDto?.scores ?? userFind.scores;

    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.userRepository.save(userFind),
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
      throw new HttpException("User id isn't in body", HttpStatus.BAD_REQUEST);
    }
    const categoryWords = await this.userRepository.findOne({ where: { id } });
    if (!categoryWords) {
      throw new HttpException("User isn't found", HttpStatus.NOT_FOUND);
    }
    try {
      await this.userRepository.delete(id);

      return { statusCode: HttpStatus.OK };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.CONFLICT);
    }
  }
}
