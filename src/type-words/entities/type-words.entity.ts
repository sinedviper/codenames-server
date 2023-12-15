import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomWordsEntity } from '../../room-words/entities/room-words.entity';

@Entity()
export class TypeWordsEntity {
  @OneToOne(() => RoomWordsEntity, (room_word) => room_word.id_type_words)
  @PrimaryGeneratedColumn()
  @JoinColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  type: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
