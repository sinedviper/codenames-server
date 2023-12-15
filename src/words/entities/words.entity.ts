import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomWordsEntity } from '../../room-words/entities/room-words.entity';
import { CategoryWordEntity } from '../../category-words/entities/category-word.entity';
import { UkraineWordEntity } from '../../ukraine-words/entities/ukraine-word.entity';
import { EnglishWordEntity } from '../../english-words/entities/english-word.entity';

@Entity()
export class WordsEntity {
  @OneToOne(() => EnglishWordEntity, (english_word) => english_word.id_words)
  @OneToOne(() => UkraineWordEntity, (ukraine_word) => ukraine_word.id_words)
  @OneToOne(() => RoomWordsEntity, (room_words) => room_words.id_words)
  @PrimaryGeneratedColumn()
  @JoinColumn()
  id: number;

  @OneToOne(() => CategoryWordEntity, (category_entity) => category_entity.id)
  @JoinColumn()
  id_category_word: number;
}
