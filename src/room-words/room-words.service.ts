import { Injectable } from '@nestjs/common';
import { CreateRoomWordDto } from './dto/create-room-word.dto';
import { UpdateRoomWordDto } from './dto/update-room-word.dto';

@Injectable()
export class RoomWordsService {
  create(createRoomWordDto: CreateRoomWordDto) {
    return 'This action adds a new roomWord';
  }

  findAll() {
    return `This action returns all roomWords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomWord`;
  }

  update(updateRoomWordDto: UpdateRoomWordDto) {
    return `This action updates a roomWord`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomWord`;
  }
}
