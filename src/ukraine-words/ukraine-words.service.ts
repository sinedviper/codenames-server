import { Injectable } from '@nestjs/common';
import { CreateUkraineWordDto } from './dto/create-ukraine-word.dto';
import { UpdateUkraineWordDto } from './dto/update-ukraine-word.dto';

@Injectable()
export class UkraineWordsService {
  create(createUkraineWordDto: CreateUkraineWordDto) {
    return 'This action adds a new ukraineWord';
  }

  findAll() {
    return `This action returns all ukraineWords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ukraineWord`;
  }

  update(id: number, updateUkraineWordDto: UpdateUkraineWordDto) {
    return `This action updates a #${id} ukraineWord`;
  }

  remove(id: number) {
    return `This action removes a #${id} ukraineWord`;
  }
}
