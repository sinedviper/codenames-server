import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { typeHttpResponse } from '../types';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ImagesEntity } from './entities/images.entity';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ImagesEntity)
    private readonly imagesRepository: Repository<ImagesEntity>,

    private jwtService: JwtService,
  ) {}

  async update(
    id: number,
    file: Express.Multer.File,
  ): Promise<typeHttpResponse<{ accessToken: string }>> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (file.size <= 0 || file.size > 10 * 1024 * 1024)
      throw new HttpException("Image doesn't exists", HttpStatus.BAD_REQUEST);

    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      throw new HttpException(
        'Only image files are allowed',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.avatar) {
      const fullPath = path.join(__dirname, `../../images/${user.avatar.path}`);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      const idImage = user.avatar.id;
      user.avatar = null;
      await this.userRepository.save(user);
      await this.imagesRepository.delete(idImage);
    } else {
      const folderName = './images';
      fs.stat(folderName, (err) => {
        if (err) {
          if (err.code === 'ENOENT') {
            fs.mkdirSync(folderName, { recursive: true });
          }
        }
      });
    }

    const uniqueFileName = uuid() + path.extname(file.originalname);
    const filePath = `./images/${uniqueFileName}`;

    fs.writeFileSync(filePath, file.buffer);

    user.avatar = await this.imagesRepository.save({ path: uniqueFileName });

    await this.userRepository.save(user);
    delete user.password;

    const accessToken = this.jwtService.sign(
      { sub: user },
      { secret: process.env.PUBLIC_KEY },
    );

    return {
      statusCode: HttpStatus.OK,
      data: { accessToken },
    };
  }

  async delete(id: number): Promise<typeHttpResponse<{ accessToken: string }>> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!user.avatar) {
      throw new HttpException('Avatar not found', HttpStatus.NOT_FOUND);
    }

    const fullPath = path.join(__dirname, `../../images/${user.avatar.path}`);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
    const idImage = user.avatar.id;

    user.avatar = null;

    await this.userRepository.save(user);
    await this.imagesRepository.delete(idImage);

    delete user.password;

    const accessToken = this.jwtService.sign(
      { sub: user },
      { secret: process.env.PUBLIC_KEY },
    );

    return {
      statusCode: HttpStatus.OK,
      data: { accessToken },
    };
  }
}
