import { Injectable } from '@nestjs/common';
import { CreateEnglishWordDto } from './dto/create-english-word.dto';
import { UpdateEnglishWordDto } from './dto/update-english-word.dto';

@Injectable()
export class EnglishWordsService {
  create(createEnglishWordDto: CreateEnglishWordDto) {
    return 'This action adds a new englishWord';
  }

  findAll() {
    return `This action returns all englishWords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} englishWord`;
  }

  update(id: number, updateEnglishWordDto: UpdateEnglishWordDto) {
    return `This action updates a #${id} englishWord`;
  }

  remove(id: number) {
    return `This action removes a #${id} englishWord`;
  }
}
