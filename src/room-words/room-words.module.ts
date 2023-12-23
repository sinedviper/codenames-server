import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomWordsService } from './room-words.service';
import { RoomWordsController } from './room-words.controller';
import { RoomWordsEntity } from './entities/room-words.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomWordsEntity])],
  controllers: [RoomWordsController],
  providers: [RoomWordsService],
})
export class RoomWordsModule {}
