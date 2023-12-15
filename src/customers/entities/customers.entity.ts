import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RoomEntity } from '../../room/entities/room.entity';

@Entity()
export class CustomersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoomEntity, (room) => room.id) // Устанавливаем отношение OneToOne между Key и Lock
  @JoinColumn()
  id_room: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  id_user: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
