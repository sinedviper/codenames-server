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
import { CountWordsService } from './count-words.service';
import { CreateCountWordDto } from './dto/create-count-word.dto';
import { UpdateCountWordDto } from './dto/update-count-word.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('count-words')
export class CountWordsController {
  constructor(private readonly countWordsService: CountWordsService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Post()
  create(@Body() createCountWordDto: CreateCountWordDto) {
    return this.countWordsService.create(createCountWordDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get()
  findAll() {
    return this.countWordsService.findAll();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.countWordsService.findOne(+id);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Patch()
  update(@Body() updateCountWordDto: UpdateCountWordDto) {
    return this.countWordsService.update(updateCountWordDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Delete()
  remove(@Body('id') id?: number) {
    return this.countWordsService.remove(+id);
  }
}
