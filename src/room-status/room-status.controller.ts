import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { RoomStatusService } from './room-status.service';
import { CreateRoomStatusDto } from './dto/create-room-status.dto';
import { UpdateRoomStatusDto } from './dto/update-room-status.dto';

@Controller('room-status')
export class RoomStatusController {
  constructor(private readonly roomStatusService: RoomStatusService) {}

  @Get()
  getAllRoomStatus() {
    return this.roomStatusService.findAll();
  }

  @Get(':id')
  getRoomStatus(@Param('id') id: number) {
    return this.roomStatusService.findOne(id);
  }

  @Post()
  createRoomStatus(@Body() body: CreateRoomStatusDto) {
    return this.roomStatusService.create(body?.typeStatus);
  }

  @Delete()
  deleteRoomStatus(@Body('id') id?: number) {
    return this.roomStatusService.delete(+id);
  }

  @Patch()
  updateRoomStatus(@Body() body: UpdateRoomStatusDto) {
    return this.roomStatusService.update(body);
  }
}
