import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { RoomStatusService } from './room-status.service';
import { CreateRoomStatusDto } from './dto/create-room-status.dto';
import { UpdateRoomStatusDto } from './dto/update-room-status.dto';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('room-status')
export class RoomStatusController {
  constructor(private readonly roomStatusService: RoomStatusService) {}

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get()
  getAllRoomStatus() {
    return this.roomStatusService.findAll();
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Get(':id')
  getRoomStatus(@Param('id') id: number) {
    return this.roomStatusService.findOne(id);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Post()
  createRoomStatus(@Body() body: CreateRoomStatusDto) {
    return this.roomStatusService.create(body);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Delete()
  deleteRoomStatus(@Body('id') id?: number) {
    return this.roomStatusService.delete(+id);
  }

  @UseGuards(new AuthGuard(new JwtService(), ['admin']))
  @Patch()
  updateRoomStatus(@Body() body: UpdateRoomStatusDto) {
    return this.roomStatusService.update(body);
  }
}
