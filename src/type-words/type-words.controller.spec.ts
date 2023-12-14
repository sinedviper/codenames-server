import { Test, TestingModule } from '@nestjs/testing';
import { TypeWordsController } from './type-words.controller';
import { TypeWordsService } from './type-words.service';

describe('TypeWordsController', () => {
  let controller: TypeWordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeWordsController],
      providers: [TypeWordsService],
    }).compile();

    controller = module.get<TypeWordsController>(TypeWordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
