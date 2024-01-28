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
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.languagesService.findOne(+id);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Patch()
  update(@Body() updateLanguageDto: UpdateLanguageDto) {
    return this.languagesService.update(updateLanguageDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'editor']))
  @Delete()
  remove(@Body('id') id?: number) {
    return this.languagesService.remove(+id);
  }
}
