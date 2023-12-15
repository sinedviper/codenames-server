import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WordsEntity } from '../../words/entities/words.entity';
import { LanguageEntity } from '../../languages/entities/language.entity';

@Entity()
export class UkraineWordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => WordsEntity, (word) => word.id)
  @JoinColumn()
  id_words: number;

  @OneToOne(() => LanguageEntity, (language) => language.id)
  @JoinColumn()
  id_type_language: number;

  @Column({ type: 'varchar', length: 30 })
  word: string;
}
