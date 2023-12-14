import { Test, TestingModule } from '@nestjs/testing';
import { CountWordsService } from './count-words.service';

describe('CountWordsService', () => {
  let service: CountWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountWordsService],
    }).compile();

    service = module.get<CountWordsService>(CountWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
