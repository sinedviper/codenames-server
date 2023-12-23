import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeUserService } from './type-user.service';
import { TypeUserController } from './type-user.controller';
import { TypeUserEntity } from './entities/type-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeUserEntity])],
  controllers: [TypeUserController],
  providers: [TypeUserService],
})
export class TypeUserModule {}
