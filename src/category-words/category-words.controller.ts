import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryWordsService } from './category-words.service';
import { CreateCategoryWordDto } from './dto/create-category-word.dto';
import { UpdateCategoryWordDto } from './dto/update-category-word.dto';

@Controller('category-words')
export class CategoryWordsController {
  constructor(private readonly categoryWordsService: CategoryWordsService) {}

  @Post()
  createCategoryWords(@Body() createCategoryWordDto: CreateCategoryWordDto) {
    return this.categoryWordsService.create(createCategoryWordDto);
  }

  @Get()
  findAllCategoryWords() {
    return this.categoryWordsService.findAll();
  }

  @Get(':id')
  findOneCategoryWords(@Param('id') id: string) {
    return this.categoryWordsService.findOne(+id);
  }

  @Patch()
  updateCategoryWords(@Body() updateCategoryWordDto: UpdateCategoryWordDto) {
    return this.categoryWordsService.update(updateCategoryWordDto);
  }

  @Delete()
  removeCategoryWords(@Body() body: { id?: string }) {
    return this.categoryWordsService.remove(+body?.id);
  }
}
