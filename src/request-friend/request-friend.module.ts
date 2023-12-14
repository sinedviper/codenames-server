import { Module } from '@nestjs/common';
import { RequestFriendService } from './request-friend.service';
import { RequestFriendController } from './request-friend.controller';

@Module({
  controllers: [RequestFriendController],
  providers: [RequestFriendService],
})
export class RequestFriendModule {}
