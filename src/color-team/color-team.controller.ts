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
import { ColorTeamService } from './color-team.service';
import { CreateColorTeamDto } from './dto/create-color-team.dto';
import { UpdateColorTeamDto } from './dto/update-color-team.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('color-team')
export class ColorTeamController {
  constructor(private readonly colorTeamService: ColorTeamService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Post()
  create(@Body() createColorTeamDto: CreateColorTeamDto) {
    return this.colorTeamService.create(createColorTeamDto);
  }
  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get()
  findAll() {
    return this.colorTeamService.findAll();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.colorTeamService.findOne(+id);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Patch()
  update(@Body() updateColorTeamDto: UpdateColorTeamDto) {
    return this.colorTeamService.update(updateColorTeamDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Delete()
  remove(@Body('id') id?: number) {
    return this.colorTeamService.remove(+id);
  }
}
