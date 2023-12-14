import { Module } from '@nestjs/common';
import { ColorTeamService } from './color-team.service';
import { ColorTeamController } from './color-team.controller';

@Module({
  controllers: [ColorTeamController],
  providers: [ColorTeamService],
})
export class ColorTeamModule {}
