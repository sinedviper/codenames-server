import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoomStatusEntity } from './entities/room-status.entity';

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
    if (!id) {
      throw new HttpException("Room id isn't in body", HttpStatus.BAD_REQUEST);
    }
    const roomStatus = await this.roomStatus.findOne({ where: { id } });
    if (!roomStatus) {
      throw new HttpException("Room status isn't found", HttpStatus.NOT_FOUND);
    }
    return roomStatus;
  }

  async createRoomStatus(typeStatus: string): Promise<RoomStatusEntity> {
    const newRoomStatus = new RoomStatusEntity();
    if (!typeStatus) {
      throw new HttpException("Body isn't valid", HttpStatus.NOT_ACCEPTABLE);
    }
    newRoomStatus.typeStatus = typeStatus;
    return this.roomStatus.save(newRoomStatus);
  }

  async deleteRoomStatus(id: number): Promise<{ statusCode: number }> {
    if (!id) {
      throw new HttpException("Room id isn't in body", HttpStatus.BAD_REQUEST);
    }
    const roomStatus = await this.roomStatus.findOne({ where: { id } });
    if (!roomStatus) {
      throw new HttpException("Room status isn't found", HttpStatus.NOT_FOUND);
    }
    try {
      await this.roomStatus.delete(id);

      return { statusCode: HttpStatus.OK };
    } catch (e) {
      throw new HttpException(e?.message, HttpStatus.CONFLICT);
    }
  }

  async updateRoomStatus(roomStatus: {
    id?: number;
    typeStatus?: string;
  }): Promise<RoomStatusEntity> {
    if (!roomStatus?.id || !roomStatus?.typeStatus) {
      throw new HttpException(
        "Room all params aren't in body",
        HttpStatus.BAD_REQUEST,
      );
    }

    const roomStatusFind = await this.roomStatus.findOne({
      where: { id: roomStatus?.id },
    });

    if (!roomStatusFind) {
      throw new HttpException("Room status isn't found", HttpStatus.NOT_FOUND);
    }
    roomStatusFind.typeStatus = roomStatus.typeStatus;

    return this.roomStatus.save(roomStatusFind);
  }
}
