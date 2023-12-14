import { Module } from '@nestjs/common';
import { CategoryWordsService } from './category-words.service';
import { CategoryWordsController } from './category-words.controller';

@Module({
  controllers: [CategoryWordsController],
  providers: [CategoryWordsService],
})
export class CategoryWordsModule {}
