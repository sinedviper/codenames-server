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
import { RoomWordsModule } from './room-words/room-words.module';
import { TypeWordsModule } from './type-words/type-words.module';
import { CategoryWordsModule } from './category-words/category-words.module';
import { AuthModule } from './auth/auth.module';
import { CustomersEntity } from './customers/entities/customers.entity';
import { RoomEntity } from './room/entities/room.entity';
import { RoomStatusEntity } from './room-status/entities/room-status.entity';
import { CountWordEntity } from './count-words/entities/count-word.entity';
import { CategoryWordEntity } from './category-words/entities/category-word.entity';
import { LanguageEntity } from './languages/entities/language.entity';
import { RoomWordsEntity } from './room-words/entities/room-words.entity';
import { TeamEntity } from './team/entities/team.entity';
import { ColorTeamEntity } from './color-team/entities/color-team.entity';
import { PlayerEntity } from './players/entities/player.entity';
import { TypeUserEntity } from './type-user/entities/type-user.entity';
import { WordsEntity } from './words/entities/words.entity';
import { TypeWordsEntity } from './type-words/entities/type-words.entity';
import { FriendEntity } from './friend/entities/friend.entity';
import { RequestFriendEntity } from './request-friend/entities/request-friend.entity';
import { ValidationFilter } from './utils/helpers';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '668077Den',
      username: 'postgres',
      entities: [
        UserEntity,
        CustomersEntity,
        RoomEntity,
        RoomStatusEntity,
        CountWordEntity,
        CategoryWordEntity,
        LanguageEntity,
        RoomWordsEntity,
        TeamEntity,
        ColorTeamEntity,
        PlayerEntity,
        TypeUserEntity,
        WordsEntity,
        TypeWordsEntity,
        FriendEntity,
        RequestFriendEntity,
      ],
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
    RoomWordsModule,
    TypeWordsModule,
    CategoryWordsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ValidationFilter,
    },
  ],
})
export class AppModule {}
