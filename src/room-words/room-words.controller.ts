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
import { RoomWordsService } from './room-words.service';
import { CreateRoomWordDto } from './dto/create-room-word.dto';
import { UpdateRoomWordDto } from './dto/update-room-word.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('room-words')
export class RoomWordsController {
  constructor(private readonly roomWordsService: RoomWordsService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Post()
  create(@Body() createRoomWordDto: CreateRoomWordDto) {
    return this.roomWordsService.create(createRoomWordDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get()
  findAll() {
    return this.roomWordsService.findAll();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roomWordsService.findOne(+id);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Patch()
  update(@Body() updateRoomWordDto: UpdateRoomWordDto) {
    return this.roomWordsService.update(updateRoomWordDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Delete(':id')
  remove(@Body('id') id?: number) {
    return this.roomWordsService.remove(+id);
  }
}
