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

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Post()
  createCategoryWords(@Body() createCategoryWordDto: CreateCategoryWordDto) {
    return this.categoryWordsService.create(createCategoryWordDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Get()
  findAllCategoryWords() {
    return this.categoryWordsService.findAll();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Get(':id')
  findOneCategoryWords(@Param('id') id: number) {
    return this.categoryWordsService.findOne(+id);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Patch()
  updateCategoryWords(@Body() updateCategoryWordDto: UpdateCategoryWordDto) {
    return this.categoryWordsService.update(updateCategoryWordDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Delete()
  removeCategoryWords(@Body('id') id?: number) {
    return this.categoryWordsService.remove(+id);
  }
}
