import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { TypeUserEntity } from '../type-user/entities/type-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TypeUserEntity]),
    JwtModule.register({
      global: true,
      secretOrPrivateKey: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
