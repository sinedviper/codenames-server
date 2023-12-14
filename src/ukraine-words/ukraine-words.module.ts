import { Module } from '@nestjs/common';
import { UkraineWordsService } from './ukraine-words.service';
import { UkraineWordsController } from './ukraine-words.controller';

@Module({
  controllers: [UkraineWordsController],
  providers: [UkraineWordsService],
})
export class UkraineWordsModule {}
