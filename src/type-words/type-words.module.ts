import { Module } from '@nestjs/common';
import { TypeWordsService } from './type-words.service';
import { TypeWordsController } from './type-words.controller';

@Module({
  controllers: [TypeWordsController],
  providers: [TypeWordsService],
})
export class TypeWordsModule {}
