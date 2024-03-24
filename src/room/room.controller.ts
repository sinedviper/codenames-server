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
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'user', 'editor']))
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['user']))
  @Get('create-params')
  getCreateParams() {
    return this.roomService.getCreateParams();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'user', 'editor']))
  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'user', 'editor']))
  @Get(':id')
  findOne(@Param('id') id?: number) {
    return this.roomService.findOne(+id);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'user', 'editor']))
  @Patch()
  update(@Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(updateRoomDto);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin', 'user', 'editor']))
  @Delete()
  remove(@Body('id') id?: number) {
    return this.roomService.remove(+id);
  }
}
