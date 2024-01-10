import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { TypeUserEntity } from '../type-user/entities/type-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TypeUserEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
