import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryWordEntity } from '../../category-words/entities/category-word.entity';
import {LanguageEntity} from "../../languages/entities/language.entity";

@Entity()
export class WordsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => LanguageEntity, (language) => language.id)
  @JoinColumn()
  id_language: LanguageEntity;

  @OneToOne(() => CategoryWordEntity, (category_entity) => category_entity.id)
  @JoinColumn()
  id_category_word: CategoryWordEntity;
}
