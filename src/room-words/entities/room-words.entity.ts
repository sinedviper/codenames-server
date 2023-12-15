import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamEntity } from '../../team/entities/team.entity';
import { RoomEntity } from '../../room/entities/room.entity';
import { TypeWordsEntity } from '../../type-words/entities/type-words.entity';
import { WordsEntity } from '../../words/entities/words.entity';

@Entity()
export class RoomWordsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => WordsEntity, (word) => word.id)
  @JoinColumn()
  id_words: number;

  @ManyToOne(() => TeamEntity, (team) => team.id)
  @JoinColumn()
  id_team: number;

  @ManyToOne(() => RoomEntity, (room) => room.id)
  @JoinColumn()
  id_room: number;

  @OneToOne(() => TypeWordsEntity, (type_word) => type_word.id)
  @JoinColumn()
  id_type_words: number;

  @Column({ type: 'boolean' })
  guess_word: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
