import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id?: number) {
    return this.roomService.findOne(+id);
  }

  @Patch()
  update(@Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(updateRoomDto);
  }

  @Delete()
  remove(@Body('id') id?: number) {
    return this.roomService.remove(+id);
  }
}
