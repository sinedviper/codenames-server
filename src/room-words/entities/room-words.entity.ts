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
  id_words: WordsEntity;

  @ManyToOne(() => TeamEntity, (team) => team.roomWords)
  @JoinColumn()
  id_team: TeamEntity;

  @ManyToOne(() => RoomEntity, (room) => room.roomWords)
  @JoinColumn()
  id_room: RoomEntity;

  @OneToOne(() => TypeWordsEntity, (type_word) => type_word.id)
  @JoinColumn()
  id_type_words: TypeWordsEntity;

  @Column({ type: 'boolean' })
  guess_word: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
