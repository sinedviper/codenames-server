import { Test, TestingModule } from '@nestjs/testing';
import { ColorTeamController } from './color-team.controller';
import { ColorTeamService } from './color-team.service';

describe('ColorTeamController', () => {
  let controller: ColorTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColorTeamController],
      providers: [ColorTeamService],
    }).compile();

    controller = module.get<ColorTeamController>(ColorTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
