import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomEntity } from './entities/room.entity';
import { TeamEntity } from '../team/entities/team.entity';
import { UserEntity } from '../user/entities/user.entity';
import { CategoryWordEntity } from '../category-words/entities/category-word.entity';
import { LanguageEntity } from '../languages/entities/language.entity';
import { CountWordEntity } from '../count-words/entities/count-word.entity';
import { RoomStatusEntity } from '../room-status/entities/room-status.entity';
import { ColorTeamEntity } from '../color-team/entities/color-team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoomEntity,
      TeamEntity,
      UserEntity,
      CategoryWordEntity,
      LanguageEntity,
      CountWordEntity,
      RoomStatusEntity,
      ColorTeamEntity,
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
