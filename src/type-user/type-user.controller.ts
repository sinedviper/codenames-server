import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { TypeUserService } from './type-user.service';
import { CreateTypeUserDto } from './dto/create-type-user.dto';
import { UpdateTypeUserDto } from './dto/update-type-user.dto';

@Controller('type-user')
export class TypeUserController {
  constructor(private readonly typeUserService: TypeUserService) {}

  @Post()
  create(@Body() createTypeUserDto: CreateTypeUserDto) {
    return this.typeUserService.create(createTypeUserDto);
  }

  @Get()
  findAll() {
    return this.typeUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.typeUserService.findOne(+id);
  }

  @Patch()
  update(@Body() updateTypeUserDto: UpdateTypeUserDto) {
    return this.typeUserService.update(updateTypeUserDto);
  }

  @Delete()
  remove(@Body('id') id: number) {
    return this.typeUserService.remove(+id);
  }
}
