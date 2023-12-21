import { Module } from '@nestjs/common';
import { CategoryWordsService } from './category-words.service';
import { CategoryWordsController } from './category-words.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryWordEntity } from './entities/category-word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryWordEntity])],
  controllers: [CategoryWordsController],
  providers: [CategoryWordsService],
})
export class CategoryWordsModule {}
