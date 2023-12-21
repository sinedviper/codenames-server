import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountWordsService } from './count-words.service';
import { CountWordsController } from './count-words.controller';
import { CountWordEntity } from './entities/count-word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountWordEntity])],
  controllers: [CountWordsController],
  providers: [CountWordsService],
})
export class CountWordsModule {}
