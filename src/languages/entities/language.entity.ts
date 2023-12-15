import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UkraineWordEntity } from '../../ukraine-words/entities/ukraine-word.entity';
import { EnglishWordEntity } from '../../english-words/entities/english-word.entity';
import { RoomEntity } from '../../room/entities/room.entity';

@Entity()
export class LanguageEntity {
  @OneToOne(() => RoomEntity, (room) => room.id_language_words)
  @OneToOne(() => RoomEntity, (room) => room.id_translation_words)
  @OneToOne(
    () => UkraineWordEntity,
    (ukraine_word) => ukraine_word.id_type_language,
  )
  @OneToOne(
    () => EnglishWordEntity,
    (english_word) => english_word.id_type_language,
  )
  @PrimaryGeneratedColumn()
  @JoinColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  language: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
