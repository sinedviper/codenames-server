import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import {TypeUserEntity} from "../type-user/entities/type-user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,TypeUserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
