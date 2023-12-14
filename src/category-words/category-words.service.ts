import { Injectable } from '@nestjs/common';
import { CreateCategoryWordDto } from './dto/create-category-word.dto';
import { UpdateCategoryWordDto } from './dto/update-category-word.dto';

@Injectable()
export class CategoryWordsService {
  create(createCategoryWordDto: CreateCategoryWordDto) {
    return 'This action adds a new categoryWord';
  }

  findAll() {
    return `This action returns all categoryWords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryWord`;
  }

  update(id: number, updateCategoryWordDto: UpdateCategoryWordDto) {
    return `This action updates a #${id} categoryWord`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryWord`;
  }
}
