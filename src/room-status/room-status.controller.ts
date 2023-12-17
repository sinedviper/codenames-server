import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RoomStatusService } from './room-status.service';
import { CreateRoomStatusDto } from './dto/create-room-status.dto';

@Controller('room-status')
export class RoomStatusController {
  constructor(private readonly roomStatusService: RoomStatusService) {}

  @Get()
  getAllRoomStatus() {
    return this.roomStatusService.findAllRoomStatus();
  }

  @Get(':id')
  getRoomStatus(@Param('id') id: number) {
    return this.roomStatusService.findOneRoomStatus(id);
  }

  @Post()
  createRoomStatus(@Body() createRoomStatusDto: CreateRoomStatusDto) {
    return this.roomStatusService.createRoomStatus(createRoomStatusDto);
  }
}
