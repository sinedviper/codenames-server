import { Test, TestingModule } from '@nestjs/testing';
import { RoomWordsService } from './room-words.service';

describe('RoomWordsService', () => {
  let service: RoomWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomWordsService],
    }).compile();

    service = module.get<RoomWordsService>(RoomWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
