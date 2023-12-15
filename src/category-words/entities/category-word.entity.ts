import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WordsEntity } from '../../words/entities/words.entity';
import { RoomEntity } from '../../room/entities/room.entity';

@Entity()
export class CategoryWordEntity {
  @OneToOne(() => RoomEntity, (room) => room.id_category_words)
  @OneToOne(() => WordsEntity, (words) => words.id_category_word)
  @PrimaryGeneratedColumn()
  @JoinColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  category: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
