import { Test, TestingModule } from '@nestjs/testing';
import { EnglishWordsService } from './english-words.service';

describe('EnglishWordsService', () => {
  let service: EnglishWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnglishWordsService],
    }).compile();

    service = module.get<EnglishWordsService>(EnglishWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
