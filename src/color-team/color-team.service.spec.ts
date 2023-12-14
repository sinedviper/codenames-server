import { Test, TestingModule } from '@nestjs/testing';
import { ColorTeamService } from './color-team.service';

describe('ColorTeamService', () => {
  let service: ColorTeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColorTeamService],
    }).compile();

    service = module.get<ColorTeamService>(ColorTeamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
