import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoomStatusEntity } from './entities/room-status.entity';
import { typeHttpResponse } from '../types';
import { UpdateRoomStatusDto } from './dto/update-room-status.dto';
import { CreateRoomStatusDto } from './dto/create-room-status.dto';

@Injectable()
export class RoomStatusService {
  constructor(
    @InjectRepository(RoomStatusEntity)
    private readonly roomStatus: Repository<RoomStatusEntity>,
  ) {}

  async findAll(): Promise<typeHttpResponse<RoomStatusEntity[]>> {
    try {
      return { statusCode: HttpStatus.OK, data: await this.roomStatus.find() };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async findOne(id: number): Promise<typeHttpResponse<RoomStatusEntity>> {
    if (!id) {
      throw new HttpException("Room id isn't in body", HttpStatus.BAD_REQUEST);
    }
    try {
      const roomStatus = await this.roomStatus.findOne({ where: { id } });
      if (!roomStatus) {
        throw new HttpException(
          "Room status isn't found",
          HttpStatus.NOT_FOUND,
        );
      }
      return { statusCode: HttpStatus.OK, data: roomStatus };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async create(
    roomStatus: CreateRoomStatusDto,
  ): Promise<typeHttpResponse<RoomStatusEntity>> {
    const newRoomStatus = new RoomStatusEntity();
    if (!roomStatus?.typeStatus) {
      throw new HttpException("Body isn't valid", HttpStatus.NOT_ACCEPTABLE);
    }
    newRoomStatus.typeStatus = roomStatus.typeStatus;
    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.roomStatus.save(newRoomStatus),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async delete(id: number): Promise<typeHttpResponse<null>> {
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
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async update(
    roomStatus: UpdateRoomStatusDto,
  ): Promise<typeHttpResponse<RoomStatusEntity>> {
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

    try {
      return {
        statusCode: HttpStatus.OK,
        data: await this.roomStatus.save(roomStatusFind),
      };
    } catch (e) {
      throw new HttpException(
        'Something was wrong',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }
}
