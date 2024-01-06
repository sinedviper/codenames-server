import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsEntity } from './entities/words.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WordsEntity])],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
