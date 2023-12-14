import { Module } from '@nestjs/common';
import { RoomWordsService } from './room-words.service';
import { RoomWordsController } from './room-words.controller';

@Module({
  controllers: [RoomWordsController],
  providers: [RoomWordsService],
})
export class RoomWordsModule {}
