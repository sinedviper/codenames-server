import { Module } from '@nestjs/common';
import { RoomStatusService } from './room-status.service';
import { RoomStatusController } from './room-status.controller';

@Module({
  controllers: [RoomStatusController],
  providers: [RoomStatusService],
})
export class RoomStatusModule {}
