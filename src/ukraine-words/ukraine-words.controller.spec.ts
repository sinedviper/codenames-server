import { Test, TestingModule } from '@nestjs/testing';
import { UkraineWordsController } from './ukraine-words.controller';
import { UkraineWordsService } from './ukraine-words.service';

describe('UkraineWordsController', () => {
  let controller: UkraineWordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UkraineWordsController],
      providers: [UkraineWordsService],
    }).compile();

    controller = module.get<UkraineWordsController>(UkraineWordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
