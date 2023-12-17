import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserEntity} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {hash} from "bcrypt"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() : Promise<Omit<UserEntity, "password">[]> {
    const users = await this.userRepository.find();

    return users.map(({password, ...userWithoutPassword}) => userWithoutPassword);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, dto: UpdateUserDto) : Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({where:{id}})

    if(!findUser)
      throw new HttpException("User not found!",HttpStatus.BAD_REQUEST)

    if(dto.password)
      findUser.password = await hash(dto.password,10)

    this.userRepository.merge(findUser,dto)

    return  await this.userRepository.save(findUser)
  }

  async remove(id: number) {
    const findUser = await this.userRepository.findOne({where:{id}})

    if(!findUser)
      throw new HttpException("User not found!",HttpStatus.BAD_REQUEST)

    await this.userRepository.remove(findUser);
  }
}
