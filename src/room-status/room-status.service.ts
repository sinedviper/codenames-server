import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoomStatusEntity } from './entities/room-status.entity';
import { CreateRoomStatusDto } from './dto/create-room-status.dto';

@Injectable()
export class RoomStatusService {
  constructor(
    @InjectRepository(RoomStatusEntity)
    private readonly roomStatus: Repository<RoomStatusEntity>,
  ) {}

  async findAllRoomStatus(): Promise<RoomStatusEntity[]> {
    return await this.roomStatus.find();
  }

  async findOneRoomStatus(id: number): Promise<RoomStatusEntity> {
    const roomStatus = await this.roomStatus.findOne({ where: { id } });
    if (!roomStatus) {
      throw new HttpException("Room status isn't found", HttpStatus.NOT_FOUND);
    }
    return roomStatus;
  }

  async createRoomStatus(
    createRoomStatusDto: CreateRoomStatusDto,
  ): Promise<RoomStatusEntity> {
    const newRoomStatus = new RoomStatusEntity();
    if (!createRoomStatusDto.typeStatus) {
      throw new HttpException("Body isn't valid", HttpStatus.NOT_ACCEPTABLE);
    }
    newRoomStatus.typeStatus = createRoomStatusDto.typeStatus;
    return this.roomStatus.save(newRoomStatus);
  }
}
