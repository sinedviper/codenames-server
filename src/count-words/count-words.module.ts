import { Module } from '@nestjs/common';
import { CountWordsService } from './count-words.service';
import { CountWordsController } from './count-words.controller';

@Module({
  controllers: [CountWordsController],
  providers: [CountWordsService],
})
export class CountWordsModule {}
