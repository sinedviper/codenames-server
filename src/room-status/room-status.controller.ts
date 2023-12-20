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
  createRoomStatus(@Body() body: { typeStatus?: string }) {
    return this.roomStatusService.createRoomStatus(body?.typeStatus);
  }

  @Delete()
  deleteRoomStatus(@Body() body: { id?: number }) {
    return this.roomStatusService.deleteRoomStatus(body?.id);
  }

  @Patch()
  updateRoomStatus(@Body() body: { id?: number; typeStatus?: string }) {
    return this.roomStatusService.updateRoomStatus(body);
  }
}
