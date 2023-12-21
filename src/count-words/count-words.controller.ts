import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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
  findOne(@Param('id') id: number) {
    return this.countWordsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateCountWordDto: UpdateCountWordDto) {
    return this.countWordsService.update(updateCountWordDto);
  }

  @Delete()
  remove(@Body('id') id?: number) {
    return this.countWordsService.remove(+id);
  }
}
