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
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Post()
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(createWordDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Get()
  findAll() {
    return this.wordsService.findAll();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Patch()
  update(@Body() updateWordDto: UpdateWordDto) {
    return this.wordsService.update(updateWordDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Delete()
  remove(@Param() id: number) {
    return this.wordsService.remove(+id);
  }
}
