import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ColorTeamEntity } from '../../color-team/entities/color-team.entity';
import { RoomEntity } from '../../room/entities/room.entity';
import { PlayerEntity } from '../../players/entities/player.entity';
import { RoomWordsEntity } from '../../room-words/entities/room-words.entity';

@Entity()
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ColorTeamEntity, (color_team) => color_team.id)
  @JoinColumn()
  id_color_team: number;

  @ManyToOne(() => RoomEntity, (room) => room.teams)
  @JoinColumn()
  id_room: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => RoomWordsEntity, (room_words) => room_words.id_team)
  roomWords: RoomWordsEntity[];

  @OneToMany(() => PlayerEntity, (players) => players.id_team)
  players: PlayerEntity[];
}
