import { Injectable } from '@nestjs/common';
import { CreateTypeWordDto } from './dto/create-type-word.dto';
import { UpdateTypeWordDto } from './dto/update-type-word.dto';

@Injectable()
export class TypeWordsService {
  create(createTypeWordDto: CreateTypeWordDto) {
    return 'This action adds a new typeWord';
  }

  findAll() {
    return `This action returns all typeWords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeWord`;
  }

  update(id: number, updateTypeWordDto: UpdateTypeWordDto) {
    return `This action updates a #${id} typeWord`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeWord`;
  }
}
