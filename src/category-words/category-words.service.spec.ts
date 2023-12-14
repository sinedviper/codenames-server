import { Test, TestingModule } from '@nestjs/testing';
import { CategoryWordsService } from './category-words.service';

describe('CategoryWordsService', () => {
  let service: CategoryWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryWordsService],
    }).compile();

    service = module.get<CategoryWordsService>(CategoryWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
