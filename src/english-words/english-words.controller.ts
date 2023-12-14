import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnglishWordsService } from './english-words.service';
import { CreateEnglishWordDto } from './dto/create-english-word.dto';
import { UpdateEnglishWordDto } from './dto/update-english-word.dto';

@Controller('english-words')
export class EnglishWordsController {
  constructor(private readonly englishWordsService: EnglishWordsService) {}

  @Post()
  create(@Body() createEnglishWordDto: CreateEnglishWordDto) {
    return this.englishWordsService.create(createEnglishWordDto);
  }

  @Get()
  findAll() {
    return this.englishWordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.englishWordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnglishWordDto: UpdateEnglishWordDto) {
    return this.englishWordsService.update(+id, updateEnglishWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.englishWordsService.remove(+id);
  }
}
