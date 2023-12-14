import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColorTeamEntity } from '../../color-team/entities/color-team.entity';
import { RoomEntity } from '../../room/entities/room.entity';

@Entity()
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ColorTeamEntity, (color_team) => color_team.id)
  @JoinColumn()
  id_color_team: number;

  @ManyToOne(() => RoomEntity, (room) => room.id)
  @JoinColumn()
  id_room: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
