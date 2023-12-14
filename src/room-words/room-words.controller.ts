import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomWordsService } from './room-words.service';
import { CreateRoomWordDto } from './dto/create-room-word.dto';
import { UpdateRoomWordDto } from './dto/update-room-word.dto';

@Controller('room-words')
export class RoomWordsController {
  constructor(private readonly roomWordsService: RoomWordsService) {}

  @Post()
  create(@Body() createRoomWordDto: CreateRoomWordDto) {
    return this.roomWordsService.create(createRoomWordDto);
  }

  @Get()
  findAll() {
    return this.roomWordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomWordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomWordDto: UpdateRoomWordDto) {
    return this.roomWordsService.update(+id, updateRoomWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomWordsService.remove(+id);
  }
}
