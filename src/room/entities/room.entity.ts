import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RoomStatusEntity } from '../../room-status/entities/room-status.entity';
import { CategoryWordEntity } from '../../category-words/entities/category-word.entity';
import { LanguageEntity } from '../../languages/entities/language.entity';
import { PlayerEntity } from '../../players/entities/player.entity';
import { TeamEntity } from '../../team/entities/team.entity';
import { RoomWordsEntity } from '../../room-words/entities/room-words.entity';
import { CountWordEntity } from '../../count-words/entities/count-word.entity';

@Entity()
export class RoomEntity {
  @OneToMany(() => RoomWordsEntity, (room_word) => room_word.id_room)
  @OneToMany(() => TeamEntity, (team) => team.id_room)
  @OneToMany(() => PlayerEntity, (players) => players.id_room)
  @PrimaryGeneratedColumn()
  @JoinColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  id_creator: number;

  @OneToOne(() => RoomStatusEntity, (room_status) => room_status.id)
  @JoinColumn()
  id_status: number;

  @OneToOne(() => CountWordEntity, (count_words) => count_words.id)
  @JoinColumn()
  id_count_words: number;

  @OneToOne(() => CategoryWordEntity, (category_words) => category_words.id, {
    nullable: true,
  })
  @JoinColumn()
  id_category_words?: number;

  @OneToOne(() => LanguageEntity, (languages) => languages.id)
  @JoinColumn()
  id_language_words: number;

  @OneToOne(() => LanguageEntity, (languages) => languages.id)
  @JoinColumn()
  id_translation_words: number;

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
