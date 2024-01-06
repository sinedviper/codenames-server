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
export class TeamDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ColorTeamEntity, (color_team) => color_team.id)
  @JoinColumn()
  color_team: ColorTeamEntity;

  @ManyToOne(() => RoomEntity, (room) => room.teams, { onDelete: 'CASCADE' })
  @JoinColumn()
  id_room: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
