import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from '../../room/entities/room.entity';

@Entity()
export class CountWordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  count: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
