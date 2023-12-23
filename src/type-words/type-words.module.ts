import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeWordsService } from './type-words.service';
import { TypeWordsController } from './type-words.controller';
import { TypeWordsEntity } from './entities/type-words.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeWordsEntity])],
  controllers: [TypeWordsController],
  providers: [TypeWordsService],
})
export class TypeWordsModule {}
