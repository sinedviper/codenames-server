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

import { TypeUserService } from './type-user.service';
import { CreateTypeUserDto } from './dto/create-type-user.dto';
import { UpdateTypeUserDto } from './dto/update-type-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('type-user')
export class TypeUserController {
  constructor(private readonly typeUserService: TypeUserService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Post()
  create(@Body() createTypeUserDto: CreateTypeUserDto) {
    return this.typeUserService.create(createTypeUserDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get()
  findAll() {
    return this.typeUserService.findAll();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.typeUserService.findOne(+id);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Patch()
  update(@Body() updateTypeUserDto: UpdateTypeUserDto) {
    return this.typeUserService.update(updateTypeUserDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Delete()
  remove(@Body('id') id: number) {
    return this.typeUserService.remove(+id);
  }
}
