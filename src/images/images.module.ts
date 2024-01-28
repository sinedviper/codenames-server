import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ImagesEntity } from './entities/images.entity';
import { ImagesController } from './images.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ImagesEntity]),
    JwtModule.register({
      global: true,
      secretOrPrivateKey: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [JwtModule],
})
export class ImagesModule {}
