import { Test, TestingModule } from '@nestjs/testing';
import { RequestFriendController } from './request-friend.controller';
import { RequestFriendService } from './request-friend.service';

describe('RequestFriendController', () => {
  let controller: RequestFriendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestFriendController],
      providers: [RequestFriendService],
    }).compile();

    controller = module.get<RequestFriendController>(RequestFriendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
