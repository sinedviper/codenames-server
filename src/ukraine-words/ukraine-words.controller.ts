import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UkraineWordsService } from './ukraine-words.service';
import { CreateUkraineWordDto } from './dto/create-ukraine-word.dto';
import { UpdateUkraineWordDto } from './dto/update-ukraine-word.dto';

@Controller('ukraine-words')
export class UkraineWordsController {
  constructor(private readonly ukraineWordsService: UkraineWordsService) {}

  @Post()
  create(@Body() createUkraineWordDto: CreateUkraineWordDto) {
    return this.ukraineWordsService.create(createUkraineWordDto);
  }

  @Get()
  findAll() {
    return this.ukraineWordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ukraineWordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUkraineWordDto: UpdateUkraineWordDto) {
    return this.ukraineWordsService.update(+id, updateUkraineWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ukraineWordsService.remove(+id);
  }
}
