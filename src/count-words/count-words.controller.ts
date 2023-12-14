import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountWordsService } from './count-words.service';
import { CreateCountWordDto } from './dto/create-count-word.dto';
import { UpdateCountWordDto } from './dto/update-count-word.dto';

@Controller('count-words')
export class CountWordsController {
  constructor(private readonly countWordsService: CountWordsService) {}

  @Post()
  create(@Body() createCountWordDto: CreateCountWordDto) {
    return this.countWordsService.create(createCountWordDto);
  }

  @Get()
  findAll() {
    return this.countWordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countWordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountWordDto: UpdateCountWordDto) {
    return this.countWordsService.update(+id, updateCountWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countWordsService.remove(+id);
  }
}
