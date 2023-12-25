import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColorTeamEntity } from '../../color-team/entities/color-team.entity';
import { RoomEntity } from '../../room/entities/room.entity';

@Entity()
export class CreateTeamDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ColorTeamEntity, (color_team) => color_team.id)
  @JoinColumn()
  id_color_team: number;

  @ManyToOne(() => RoomEntity, (room) => room.teams, { onDelete: 'CASCADE' })
  @JoinColumn()
  id_room: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
