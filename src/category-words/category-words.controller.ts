import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryWordsService } from './category-words.service';
import { CreateCategoryWordDto } from './dto/create-category-word.dto';
import { UpdateCategoryWordDto } from './dto/update-category-word.dto';

@Controller('category-words')
export class CategoryWordsController {
  constructor(private readonly categoryWordsService: CategoryWordsService) {}

  @Post()
  create(@Body() createCategoryWordDto: CreateCategoryWordDto) {
    return this.categoryWordsService.create(createCategoryWordDto);
  }

  @Get()
  findAll() {
    return this.categoryWordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryWordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryWordDto: UpdateCategoryWordDto) {
    return this.categoryWordsService.update(+id, updateCategoryWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryWordsService.remove(+id);
  }
}
