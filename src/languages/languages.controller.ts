import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.languagesService.findOne(+id);
  }

  @Patch()
  update(@Body() updateLanguageDto: UpdateLanguageDto) {
    return this.languagesService.update(updateLanguageDto);
  }

  @Delete()
  remove(@Body('id') id?: number) {
    return this.languagesService.remove(+id);
  }
}
