import { Injectable } from '@nestjs/common';
import { CreateCountWordDto } from './dto/create-count-word.dto';
import { UpdateCountWordDto } from './dto/update-count-word.dto';

@Injectable()
export class CountWordsService {
  create(createCountWordDto: CreateCountWordDto) {
    return 'This action adds a new countWord';
  }

  findAll() {
    return `This action returns all countWords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} countWord`;
  }

  update(id: number, updateCountWordDto: UpdateCountWordDto) {
    return `This action updates a #${id} countWord`;
  }

  remove(id: number) {
    return `This action removes a #${id} countWord`;
  }
}
