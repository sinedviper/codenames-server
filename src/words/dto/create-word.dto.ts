import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LanguageEntity } from '../../languages/entities/language.entity';
import { CategoryWordEntity } from '../../category-words/entities/category-word.entity';

@Entity()
export class CreateWordDto {
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
