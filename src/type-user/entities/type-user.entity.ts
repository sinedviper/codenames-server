import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerEntity } from '../../players/entities/player.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class TypeUserEntity {
  @OneToOne(() => UserEntity, (user) => user.id_type)
  @OneToOne(() => PlayerEntity, (players) => players.id_type_user)
  @PrimaryGeneratedColumn()
  @JoinColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  type: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
