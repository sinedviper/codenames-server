import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RoomStatusEntity } from '../../room-status/entities/room-status.entity';
import { CategoryWordEntity } from '../../category-words/entities/category-word.entity';
import { LanguageEntity } from '../../languages/entities/language.entity';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  id_creator: number;

  @OneToOne(() => RoomStatusEntity, (room_status) => room_status.id)
  @JoinColumn()
  id_status: number;

  @OneToOne(() => CategoryWordEntity, (category_words) => category_words.id)
  @JoinColumn()
  id_category_words: number;

  @OneToOne(() => LanguageEntity, (languages) => languages.id)
  @JoinColumn()
  id_language_word: number;

  @OneToOne(() => LanguageEntity, (languages) => languages.id)
  @JoinColumn()
  id_translation_word: number;

  @Column({ type: 'integer' })
  time_for_break: number;

  @Column({ type: 'integer' })
  time_for_start: number;

  @Column({ type: 'integer' })
  time_for_round: number;

  @Column({ type: 'integer' })
  time_for_guess: number;

  @Column({ type: 'boolean' })
  translation_card: boolean;

  @Column({ type: 'varchar', length: 30, nullable: true })
  password: string;

  @Column({ type: 'boolean' })
  close_room: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
