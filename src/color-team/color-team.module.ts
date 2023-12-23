import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColorTeamService } from './color-team.service';
import { ColorTeamController } from './color-team.controller';
import { ColorTeamEntity } from './entities/color-team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorTeamEntity])],
  controllers: [ColorTeamController],
  providers: [ColorTeamService],
})
export class ColorTeamModule {}
