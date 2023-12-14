import { Test, TestingModule } from '@nestjs/testing';
import { CategoryWordsController } from './category-words.controller';
import { CategoryWordsService } from './category-words.service';

describe('CategoryWordsController', () => {
  let controller: CategoryWordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryWordsController],
      providers: [CategoryWordsService],
    }).compile();

    controller = module.get<CategoryWordsController>(CategoryWordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
