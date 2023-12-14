import { Test, TestingModule } from '@nestjs/testing';
import { CountWordsController } from './count-words.controller';
import { CountWordsService } from './count-words.service';

describe('CountWordsController', () => {
  let controller: CountWordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountWordsController],
      providers: [CountWordsService],
    }).compile();

    controller = module.get<CountWordsController>(CountWordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
