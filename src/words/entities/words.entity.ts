import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryWordEntity } from '../../category-words/entities/category-word.entity';
import { LanguageEntity } from '../../languages/entities/language.entity';

@Entity()
export class WordsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => LanguageEntity, (language) => language.id)
  @JoinColumn()
  id_language: number;

  @OneToOne(() => CategoryWordEntity, (category_entity) => category_entity.id)
  @JoinColumn()
  id_category_word: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  word: string;
}
