import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeWordsService } from './type-words.service';
import { CreateTypeWordDto } from './dto/create-type-word.dto';
import { UpdateTypeWordDto } from './dto/update-type-word.dto';

@Controller('type-words')
export class TypeWordsController {
  constructor(private readonly typeWordsService: TypeWordsService) {}

  @Post()
  create(@Body() createTypeWordDto: CreateTypeWordDto) {
    return this.typeWordsService.create(createTypeWordDto);
  }

  @Get()
  findAll() {
    return this.typeWordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.typeWordsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateTypeWordDto: UpdateTypeWordDto) {
    return this.typeWordsService.update(updateTypeWordDto);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.typeWordsService.remove(+id);
  }
}
