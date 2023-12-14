import { Test, TestingModule } from '@nestjs/testing';
import { UkraineWordsService } from './ukraine-words.service';

describe('UkraineWordsService', () => {
  let service: UkraineWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UkraineWordsService],
    }).compile();

    service = module.get<UkraineWordsService>(UkraineWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
