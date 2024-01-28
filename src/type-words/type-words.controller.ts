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
import { TypeWordsService } from './type-words.service';
import { CreateTypeWordDto } from './dto/create-type-word.dto';
import { UpdateTypeWordDto } from './dto/update-type-word.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('type-words')
export class TypeWordsController {
  constructor(private readonly typeWordsService: TypeWordsService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Post()
  create(@Body() createTypeWordDto: CreateTypeWordDto) {
    return this.typeWordsService.create(createTypeWordDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get()
  findAll() {
    return this.typeWordsService.findAll();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.typeWordsService.findOne(+id);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Patch()
  update(@Body() updateTypeWordDto: UpdateTypeWordDto) {
    return this.typeWordsService.update(updateTypeWordDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Delete()
  remove(@Body('id') id: number) {
    return this.typeWordsService.remove(+id);
  }
}
