import { Test, TestingModule } from '@nestjs/testing';
import { TypeWordsService } from './type-words.service';

describe('TypeWordsService', () => {
  let service: TypeWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeWordsService],
    }).compile();

    service = module.get<TypeWordsService>(TypeWordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
