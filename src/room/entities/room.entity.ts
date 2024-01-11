import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RoomStatusEntity } from '../../room-status/entities/room-status.entity';
import { CategoryWordEntity } from '../../category-words/entities/category-word.entity';
import { LanguageEntity } from '../../languages/entities/language.entity';
import { TeamEntity } from '../../team/entities/team.entity';
import { RoomWordsEntity } from '../../room-words/entities/room-words.entity';
import { CountWordEntity } from '../../count-words/entities/count-word.entity';

@Entity()
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.rooms)
  @JoinColumn()
  id_creator: number;

  @ManyToOne(() => RoomStatusEntity, (room_status) => room_status.id)
  @JoinColumn()
  id_status: number;

  @ManyToOne(() => CountWordEntity, (count_words) => count_words.id)
  @JoinColumn()
  id_count_words: number;

  @ManyToOne(() => CategoryWordEntity, (category_words) => category_words.id, {
    nullable: true,
  })
  @JoinColumn()
  id_category_words?: number;

  @ManyToOne(() => LanguageEntity, (languages) => languages.id)
  @JoinColumn()
  id_language_words: number;

  @ManyToOne(() => LanguageEntity, (languages) => languages.id, {
    nullable: true,
  })
  @JoinColumn()
  id_translation_words?: number;

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

  @Column({ type: 'varchar', length: 6, nullable: true })
  password: string;

  @Column({ type: 'boolean' })
  close_room: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => RoomWordsEntity, (room_word) => room_word.id_room)
  roomWords: RoomWordsEntity[];

  @OneToMany(() => TeamEntity, (team) => team.id_room)
  teams: TeamEntity[];
}
