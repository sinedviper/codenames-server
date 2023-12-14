import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColorTeamService } from './color-team.service';
import { CreateColorTeamDto } from './dto/create-color-team.dto';
import { UpdateColorTeamDto } from './dto/update-color-team.dto';

@Controller('color-team')
export class ColorTeamController {
  constructor(private readonly colorTeamService: ColorTeamService) {}

  @Post()
  create(@Body() createColorTeamDto: CreateColorTeamDto) {
    return this.colorTeamService.create(createColorTeamDto);
  }

  @Get()
  findAll() {
    return this.colorTeamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorTeamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorTeamDto: UpdateColorTeamDto) {
    return this.colorTeamService.update(+id, updateColorTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorTeamService.remove(+id);
  }
}
