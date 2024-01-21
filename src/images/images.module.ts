import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ImagesEntity } from './entities/images.entity';
import { ImagesController } from './images.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ImagesEntity])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
