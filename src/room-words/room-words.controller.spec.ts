import { Test, TestingModule } from '@nestjs/testing';
import { RoomWordsController } from './room-words.controller';
import { RoomWordsService } from './room-words.service';

describe('RoomWordsController', () => {
  let controller: RoomWordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomWordsController],
      providers: [RoomWordsService],
    }).compile();

    controller = module.get<RoomWordsController>(RoomWordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
