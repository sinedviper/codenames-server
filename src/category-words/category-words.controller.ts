import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryWordsService } from './category-words.service';
import { CreateCategoryWordDto } from './dto/create-category-word.dto';
import { UpdateCategoryWordDto } from './dto/update-category-word.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('category-words')
export class CategoryWordsController {
  constructor(private readonly categoryWordsService: CategoryWordsService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Post()
  createCategoryWords(@Body() createCategoryWordDto: CreateCategoryWordDto) {
    return this.categoryWordsService.create(createCategoryWordDto);
  }

  @Get()
  findAllCategoryWords() {
    return this.categoryWordsService.findAll();
  }

  @Get(':id')
  findOneCategoryWords(@Param('id') id: number) {
    return this.categoryWordsService.findOne(+id);
  }

  @Patch()
  updateCategoryWords(@Body() updateCategoryWordDto: UpdateCategoryWordDto) {
    return this.categoryWordsService.update(updateCategoryWordDto);
  }

  @Delete()
  removeCategoryWords(@Body('id') id?: number) {
    return this.categoryWordsService.remove(+id);
  }
}
