import { Module } from '@nestjs/common';
import { EnglishWordsService } from './english-words.service';
import { EnglishWordsController } from './english-words.controller';

@Module({
  controllers: [EnglishWordsController],
  providers: [EnglishWordsService],
})
export class EnglishWordsModule {}
