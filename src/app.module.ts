import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { CustomersModule } from './customers/customers.module';
import { RoomStatusModule } from './room-status/room-status.module';
import { CountWordsModule } from './count-words/count-words.module';
import { LanguagesModule } from './languages/languages.module';
import { ColorTeamModule } from './color-team/color-team.module';
import { WordsModule } from './words/words.module';
import { RoomModule } from './room/room.module';
import { TeamModule } from './team/team.module';
import { PlayersModule } from './players/players.module';
import { FriendModule } from './friend/friend.module';
import { TypeUserModule } from './type-user/type-user.module';
import { RequestFriendModule } from './request-friend/request-friend.module';
import { EnglishWordsModule } from './english-words/english-words.module';
import { UkraineWordsModule } from './ukraine-words/ukraine-words.module';
import { RoomWordsModule } from './room-words/room-words.module';
import { TypeWordsModule } from './type-words/type-words.module';
import { CategoryWordsModule } from './category-words/category-words.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '668077Den',
      username: 'postgres',
      entities: [UserEntity],
      database: 'codenames',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    CustomersModule,
    RoomStatusModule,
    CountWordsModule,
    LanguagesModule,
    ColorTeamModule,
    WordsModule,
    RoomModule,
    TeamModule,
    PlayersModule,
    FriendModule,
    TypeUserModule,
    RequestFriendModule,
    EnglishWordsModule,
    UkraineWordsModule,
    RoomWordsModule,
    TypeWordsModule,
    CategoryWordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
